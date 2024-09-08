import {
	MobileRegistrationStatusLabel,
	ParticipantReasonCodeLabel,
	ParticipantStatusLabel,
	ProgramTypeLabel
} from "@modules/shared/data/enum-descriptions";
import { NotificationService } from "@pgr-cla/core-ui-components";
import { Component, OnInit } from "@angular/core";
import {
	DeviceExperience,
	MobileRegistrationStatus,
	ParticipantReasonCode,
	ProgramType
} from "@modules/shared/data/enums";
import {
	InitialParticipationScoreInProcess,
	MobileDeviceRegistration,
	Participant,
	Policy,
	StoredTrip
} from "@modules/shared/data/resources";
import { DialogService, HelperService } from "@modules/shared/services/_index";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatDialog } from "@angular/material/dialog";
import { TripService } from "@modules/trip/services/trip.service";
import { fadeAnimation } from "@modules/shared/animations";
import { DatePipe } from "@angular/common";
import moment from "moment";
import { DialogStageGrades50Component } from "../dialog-stage-grades50/dialog-stage-grades50.component";
import { DialogStageGradesComponent } from "../dialog-stage-grades/dialog-stage-grades.component";
import { DialogProcessSingleTripComponent } from "../dialog-process-single-trip/dialog-process-single-trip.component";
import { DialogProcessMultipleTripsComponent } from "../dialog-process-multiple-trips/dialog-process-multiple-trips.component";

@UntilDestroy()
@Component({
	selector: "ubi-trips-home",
	templateUrl: "./trips-home.component.html",
	styleUrls: ["./trips-home.component.scss"],
	animations: [fadeAnimation]
})
export class TripsHomeComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		public policyQuery: PolicyQuery,
		public policyService: PolicyService,
		public tripService: TripService,
		public notificationService: NotificationService,
		public helper: HelperService,
		private dialogService: DialogService
	) { }

	private _participantStageGradeRange = new Map();

	selectedStoredTrip: StoredTrip;
	storedTrips: StoredTrip[];
	mobileDeviceRegistration: MobileDeviceRegistration;

	private _selectedParticipant: Participant;
	get selectedParticipant(): Participant { return this._selectedParticipant; }
	set selectedParticipant(val: Participant) {
		this._selectedParticipant = val;
		if (this._selectedParticipant.programType === ProgramType.PriceModel2) {
			this.tripService.getInitialParticipationScore(this.selectedParticipant.sequenceId).subscribe(x => {
				this.initialParticipantionScoreData = x;
			});
		}
	}

	public get programType(): typeof ProgramType {
		return ProgramType;
	}

	participants: Participant[];
	policy: Policy;
	initialParticipantionScoreData: InitialParticipationScoreInProcess;

	mobileRegistrationStatusLabel = MobileRegistrationStatusLabel;
	participantStatusLabel = ParticipantStatusLabel;
	participantReasonCodeLabel = ParticipantReasonCodeLabel;
	programTypeLabel = ProgramTypeLabel;
	datePipe = new DatePipe("en-US");

	public get deviceExperience(): typeof DeviceExperience {
		return DeviceExperience;
	}
	// for making sure the right success message is displayed
	isStageGrades: boolean;

	ngOnInit(): void {
		this.policyQuery.workingPolicy$.pipe(untilDestroyed(this)).subscribe(x => {
			this.policy = x;
			this.participants = x.participants;
			const index = this.selectedParticipant === undefined ? 0 : this.participants.findIndex(y => y.sequenceId === this.selectedParticipant.sequenceId);
			this.selectedParticipant = this.participants[index];

			this.participants.forEach(y => {
				this.tripService.getStageGradesValidRange(y.sequenceId).subscribe(z => {
					this._participantStageGradeRange.set(y.sequenceId, z);
				});
			});

		});
	}

	openStageGradesDialog(): void {
		const dialogHeader = "Stage Grades";
		const participantHeader = this.policyQuery.getParticipantName(this.selectedParticipant);
		const subtitle = `${participantHeader}` +
			(this.selectedParticipant.enrollmentExperience !== DeviceExperience.Mobile ?
				`<p>${this.selectedParticipant.deviceDetails?.serialNumber}</p>` : ``);

		const is50 = this.is50(this.selectedParticipant);
		const minDate = this.selectedParticipant.enrollmentDate === undefined ||
			this.selectedParticipant.enrollmentDate < this.policy.inceptionDate ? this.policy.inceptionDate : this.selectedParticipant.enrollmentDate;

		const stageGradesData = this._participantStageGradeRange.get(this.selectedParticipant.sequenceId);

		this.dialogService.openFormDialog({
			title: dialogHeader,
			subtitle,
			component: is50 ? DialogStageGrades50Component : DialogStageGradesComponent,
			componentData: { enrollmentDate: minDate, expirationDate: this.policy.expirationDate, minimumValue: stageGradesData.minimum, maximumValue: stageGradesData.maximum },
			formModel: is50 ? { startDate: undefined, endDate: undefined, ubiValue: undefined } : { connectedDays: undefined, ubiValue: undefined }
		});

		this.dialogService.confirmed<any>().subscribe(x => {
			if (x !== undefined) {
				this.isStageGrades = true;
				//is50 ? this.updateStageGrades50(x.startDate, x.endDate, x.ubiValue) : this.updateStageGrades(x.connectedDays, x.ubiValue);
				if (is50) {
					this.updateStageGrades50(x.startDate, x.endDate, x.ubiValue);
				} else {
					this.updateStageGrades(x.connectedDays, x.ubiValue);
				}
			}
		});
	}

	openASingleTripDialog(): void {
		const title = "Process a Single Trip";
		const subtitle = this.policyQuery.getParticipantName(this.selectedParticipant);
		let type: string;
		if (this.selectedParticipant.mobileDetails) {
			type = "mobile";
		}
		else {
			type = "plugin";
		}
		this.dialogService.openFormDialog({
			title,
			subtitle,
			component: DialogProcessSingleTripComponent,
			formModel: { tripSeqId: undefined, date: undefined, type }
		});

		this.dialogService.confirmed<{ tripSeqId: number; date: Date }>().subscribe(x => {
			if (x) {
				this.dialogService.openConfirmationDialog({
					title,
					subtitle,
					message: "Are you sure you want to add trip for " + this.policyQuery.getParticipantName(this.selectedParticipant) + "? Click OK to continue."
				});

				this.dialogService.confirmed().subscribe(y => {
					if (y) {
						const date = new Date(x.date);
						date.setMilliseconds(0);

						if (this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile) {
							this.updateStoredTripMobile(x.tripSeqId, date);
						}
						else {
							this.updateStoredTripPlugIn(x.tripSeqId, date);
						}

					}
				});
			}
		});
	}

	openMultipleTripsDialog(): void {
		const title = "Process Trips Over Seven Days";
		const subtitle = this.policyQuery.getParticipantName(this.selectedParticipant);
		let type: string;
		if (this.selectedParticipant.mobileDetails) {
			type = "mobile";
		}
		else {
			type = "plugin";
		}
		this.dialogService.openFormDialog({
			title,
			subtitle,
			component: DialogProcessMultipleTripsComponent,
			formModel: { tripSeqId: undefined, date: undefined, type, enrollmentDate: this.selectedParticipant.enrollmentDate }
		});

		this.dialogService.confirmed<{ tripSeqId: number; date: Date }>().subscribe(x => {
			if (x) {
				this.dialogService.openConfirmationDialog({
					title,
					subtitle,
					message: "Are you sure you want to add seven days of trips for " + this.policyQuery.getParticipantName(this.selectedParticipant) + "? Click OK to continue."
				});

				this.dialogService.confirmed().subscribe(y => {
					if (y) {
						const date = new Date(x.date);
						date.setMilliseconds(this.selectedParticipant.enrollmentDate.getMilliseconds());
						date.setHours(this.selectedParticipant.enrollmentDate.getHours());

						if (this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile) {
							this.updateMultipleStoredTripsMobile(x.tripSeqId, date);
						}
						else {
							this.updateMultipleStoredTripPlugIn(x.tripSeqId, date);
						}

					}
				});
			}
		});
	}

	updateStageGrades(connectedDays: number, ubiValue: number): void {
		if (this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile) {
			this.tripService.updateMobileStageGrades(
				this.selectedParticipant.mobileDetails.id,
				this.selectedParticipant.mobileDetails.sequenceId,
				this.selectedParticipant.mobileDetails.homebaseSequenceId,
				this.selectedParticipant.sequenceId,
				connectedDays,
				ubiValue)
				.subscribe(x => {
					this.displayConfirmationMessage(connectedDays, ubiValue, x.ubiValue, this.selectedParticipant);
				});
		}
		else {
			this.tripService.updatePluginStageGrades(
				this.selectedParticipant.deviceDetails.serialNumber,
				this.selectedParticipant.deviceDetails.sequenceId,
				this.selectedParticipant.deviceDetails.homebaseSequenceId,
				this.selectedParticipant.sequenceId,
				connectedDays,
				ubiValue)
				.subscribe(x => {
					this.displayConfirmationMessage(connectedDays, ubiValue, x.ubiValue, this.selectedParticipant);
				});
		}
	}

	private updateStageGrades50(startDate: Date, endDate: Date, ubiValue: number): void {
		const connectedDays = moment(endDate).diff(moment(startDate), "days");
		if (this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile) {
			this.tripService.updateMobileStageGrades50(
				this.selectedParticipant.mobileDetails.id,
				this.selectedParticipant.mobileDetails.sequenceId,
				this.selectedParticipant.mobileDetails.homebaseSequenceId,
				this.selectedParticipant.sequenceId,
				this.policy.policyPeriodSeqId,
				startDate,
				endDate,
				ubiValue)
				.subscribe(x => {
					this.displayConfirmationMessage(connectedDays, ubiValue, x.ubiValue, this.selectedParticipant);
				});
		}
		else {
			this.tripService.updatePluginStageGrades50(
				this.selectedParticipant.deviceDetails.serialNumber,
				this.selectedParticipant.deviceDetails.sequenceId,
				this.selectedParticipant.deviceDetails.homebaseSequenceId,
				this.selectedParticipant.sequenceId,
				this.policy.policyPeriodSeqId,
				startDate,
				endDate,
				ubiValue)
				.subscribe(x => {
					this.displayConfirmationMessage(connectedDays, ubiValue, x.ubiValue, this.selectedParticipant);
				});
		}
	}

	openInitialDiscountDialog(): void {
		const dialogHeader = "Stage 2.0 Initial Discount";
		const participantHeader = this.policyQuery.getParticipantName(this.selectedParticipant);
		this.dialogService.openConfirmationDialog({
			title: dialogHeader,
			message: "Are you sure you want to stage this participant for stage 2.0 initial discount?",
			subtitle: participantHeader
		});

		this.dialogService.confirmed().subscribe(x => {
			if (x) {
				this.tripService.stageInitialDiscount(
					this.policy.policyNumber.toString(),
					this.selectedParticipant.sequenceId,
					this.selectedParticipant.id,
					this.policy.policyPeriodSeqId,
					this.policy.inceptionDate
				).subscribe(() => {
					this.notificationService.success(
						`Stage 2.0 Initial Discount successfully submitted for ` + this.policyQuery.getParticipantName(this.selectedParticipant) +
						`\nSee WIKI instructions for processing times.`
					);
				});
			}
		});
	}

	updateStoredTripMobile(storedTripSequenceId: number, tripDate: Date): void {
		this.tripService.runStoredTripMobile(
			storedTripSequenceId,
			this.selectedParticipant.externalId,
			this.selectedParticipant.mobileDetails.id,
			this.selectedParticipant.sequenceId,
			this.selectedParticipant.mobileDetails.sequenceId,
			tripDate,
			this.selectedParticipant.firstContactDate,
			this.selectedParticipant.enrollmentDate,
			this.selectedParticipant.policyStartDate)
			.subscribe(() => {
				this.ConfirmationMessageForSingleStoredTrip(this.selectedParticipant, tripDate);
			});
	}

	updateMultipleStoredTripsMobile(storedTripSequenceId: number, tripDate: Date): void {
		this.tripService.runMultipleStoredTripsMobile(
			storedTripSequenceId,
			this.selectedParticipant.externalId,
			this.selectedParticipant.mobileDetails.id,
			this.selectedParticipant.sequenceId,
			this.selectedParticipant.mobileDetails.sequenceId,
			tripDate,
			this.selectedParticipant.firstContactDate,
			this.selectedParticipant.enrollmentDate,
			this.selectedParticipant.policyStartDate)
			.subscribe(() => {
				this.ConfirmationMessageForMultipleStoredTrips(this.selectedParticipant, tripDate);
			});
	}

	updateStoredTripPlugIn(storedTripSequenceId: number, tripDate: Date): void {
		this.tripService.runStoredTripPlugIn(
			storedTripSequenceId,
			this.selectedParticipant.deviceDetails.sim,
			this.selectedParticipant.sequenceId,
			this.selectedParticipant.deviceDetails.serialNumber,
			tripDate,
			this.selectedParticipant.enrollmentDate,
			this.selectedParticipant.policyStartDate,
			this.selectedParticipant.deviceDetails.shipDate,
			this.selectedParticipant.firstContactDate)
			.subscribe(() => {

				this.ConfirmationMessageForSingleStoredTrip(this.selectedParticipant, tripDate);

			});
	}

	updateMultipleStoredTripPlugIn(storedTripSequenceId: number, tripDate: Date): void {
		this.tripService.runMultipleStoredTripsPlugIn(
			storedTripSequenceId,
			this.selectedParticipant.deviceDetails.sim,
			this.selectedParticipant.sequenceId,
			this.selectedParticipant.deviceDetails.serialNumber,
			tripDate,
			this.selectedParticipant.enrollmentDate,
			this.selectedParticipant.policyStartDate,
			this.selectedParticipant.deviceDetails.shipDate,
			this.selectedParticipant.firstContactDate)
			.subscribe(() => {
				this.ConfirmationMessageForMultipleStoredTrips(this.selectedParticipant, tripDate);
			});
	}

	is50(participant: Participant): boolean {
		return participant.programType === ProgramType.PriceModel5;
	}

	shouldDisableStageGrades(participant: Participant): boolean {
		return participant.reasonCode !== ParticipantReasonCode.CollectingData ||
			(participant.mobileRegistrationDetails ?
				participant.mobileRegistrationDetails.status !== MobileRegistrationStatus.RegistrationComplete :
				participant.deviceDetails.wirelessStatus !== "Active-InVehicle");
	}

	shouldDisableInitialDiscount(participant: Participant): boolean {
		if (participant.programType === ProgramType.PriceModel2) {
			return participant.reasonCode !== ParticipantReasonCode.CollectingData ||
				participant.deviceDetails === null ||
				this.initialParticipantionScoreData?.isEndorsementDiscountZero ||
				this.initialParticipantionScoreData?.isScoreCalculated ||
				this.initialParticipantionScoreData?.isEmailSent ||
				this.initialParticipantionScoreData?.endorsementAppliedDateTime !== undefined;
		}
	}

	private displayConfirmationMessage(connectedDays: number, ubiValue: number, computedUbiValue: number, participant: Participant): void {
		let stageType = ``;

		if (this.isStageGrades) {
			this.isStageGrades = false;
			this.dialogService.openConfirmationDialog({
				title: "Stage Grades Information",
				subtitle: this.policyQuery.getParticipantName(this.selectedParticipant),
				confirmText: "Ok",
				hideCancelButton: true,
				message: `The stage grades transaction was successful.\nPlease note the information below:\n\n` +
					`<b>Connected Days:</b> ${connectedDays}\n` +
					`<b>Proposed Score:</b> ${ubiValue}\n` +
					`<b>Actual Score:</b> ${computedUbiValue}`
			});
		}
		else {
			if (connectedDays === 120 && ubiValue === 7.0) {
				stageType = `for monitoring complete w/ surcharge`;
			}
			else if (connectedDays === 120 && ubiValue === 1.0) {
				stageType = `for monitoring complete w/ discount`;
			}
			else if (connectedDays === 45 && ubiValue === 1.0) {
				stageType = `for continue to monitor at renewal`;
			}

			this.notificationService.success(
				`Participant ` + this.policyQuery.getParticipantName(participant) + ` was staged successfully ` + stageType + `.`);
		}
	}

	private ConfirmationMessageForSingleStoredTrip(participant: Participant, tripDate: Date): void {
		this.notificationService.success(
			`Trip successfully processed for ` + this.policyQuery.getParticipantName(participant) + ` at ` + (this.datePipe.transform(tripDate, "MM/dd/yyyy hh:mm:ss a")));
	}

	private ConfirmationMessageForMultipleStoredTrips(participant: Participant, tripDate: Date): void {
		this.notificationService.success(
			`You request to have seven days of trips added for ` + this.policyQuery.getParticipantName(participant) + ` beginning at `
			+ (this.datePipe.transform(tripDate, "hh:mm:ss a")) + " has been submitted and should be completed in a few minutes.");

	}
}
