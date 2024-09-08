import { CUI_DIALOG_WIDTH, NotificationService } from "@pgr-cla/core-ui-components";
import { Component, OnInit } from "@angular/core";
import { Participant, Vehicle } from "@modules/shared/data/resources";
import {
	DeviceExperience,
	MobileRegistrationStatus,
	OptOutReasonCode,
	ParticipantReasonCode,
	ProgramType
} from "@modules/shared/data/enums";
import { DialogService, HelperService } from "@modules/shared/services/_index";
import { ParticipantReasonCodeLabel, ParticipantStatusLabel } from "@modules/shared/data/enum-descriptions";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { AdditionalService } from "@modules/additional/services/additional.service";
import { DatePipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { fadeAnimation } from "@modules/shared/animations";
import { LabelService } from "@modules/shared/services/label-service/label.service";
import { VehicleSelectionComponent } from "../vehicle-selection/vehicle-selection.component";
import { DeviceDateUpdateComponent } from "../device-date-update/device-date-update.component";
import { DialogStatusSetupComponent } from "../dialog-status-setup/dialog-status-setup.component";
import { ChangeEnrollmentDateComponent } from "../change-enrollment-date/change-enrollment-date.component";

@UntilDestroy()
@Component({
	selector: "ubi-setup",
	templateUrl: "./setup.component.html",
	styleUrls: ["./setup.component.scss"],
	animations: [fadeAnimation]
})
export class SetupComponent implements OnInit {

	datePipe = new DatePipe("en-US");

	constructor(
		public dialog: MatDialog,
		public policyQuery: PolicyQuery,
		public notificationService: NotificationService,
		public helper: HelperService,
		public additionalService: AdditionalService,
		private dialogService: DialogService,
		private policyService: PolicyService,
		private labelService: LabelService
	) { }

	participants: Participant[];
	selectedParticipant: Participant;

	policyNumber: string;
	policyPeriodSeqId: number;
	policyInceptionDate: Date;
	appName: string;

	participantStatusLabel = ParticipantStatusLabel;
	participantReasonCodeLabel = ParticipantReasonCodeLabel;
	isMobileParticipant: boolean;

	nonInstallerDays: number;
	nonCommunicatorDays: number;

	public get deviceExperience(): typeof DeviceExperience {
		return DeviceExperience;
	}

	private get subtitle(): string {
		return this.labelService.getDialogSubtitleForParticipant(this.selectedParticipant);
	}

	private get participantName(): string {
		return this.labelService.getParticipantDisplayName(this.selectedParticipant);
	}

	ngOnInit(): void {
		this.policyQuery.workingPolicy$.pipe(untilDestroyed(this)).subscribe(x => {
			this.appName = x.appName;
			this.participants = x.participants;
			const index = this.selectedParticipant === undefined ? 0 :
				this.participants.findIndex(y => y.sequenceId === this.selectedParticipant.sequenceId);
			this.selectedParticipant = this.participants[index];
			this.isMobileParticipant = this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile;
			this.policyNumber = x.policyNumber.toString();
			this.policyPeriodSeqId = x.policyPeriodSeqId;
			this.policyInceptionDate = x.inceptionDate;
		});
	}

	openNonInstallerSetupDialog(): void {
		const dialogHeader = "Non-Installer Status Setup";
		const subtitle = this.subtitle;

		this.dialogService.openFormDialog({
			title: dialogHeader,
			subtitle,
			component: DialogStatusSetupComponent,
			formModel: { isNonInstaller: true, isNonCommunicator: false, nonInstallerDays: undefined, nonCommunicatorDays: undefined }
		});

		this.dialogService
			.confirmed<{ isNonInstaller: boolean; isNonCommunicator: boolean; nonInstallerDays: number; nonCommunicatorDays: number }>()
			.subscribe(x => {
				if (x !== undefined) {
					this.changeNonInstallerDates(x.nonInstallerDays);
					this.changePolicyInceptionDates(x.nonInstallerDays);
				}
			});
	}

	changePolicyInceptionDates(nonInstallerDays: number): void {
		const policyPeriodSeqId = this.policyPeriodSeqId;
		const inceptionDate = this.getPreviousDate(nonInstallerDays);
		this.additionalService.changeInceptionDates(policyPeriodSeqId, inceptionDate).subscribe(() => {
			this.notificationService.success(
				"Non-Installer Inception days set to " + nonInstallerDays + " for " +
				this.policyPeriodSeqId
			);
		});
	}

	changeNonInstallerDates(nonInstallerDays: number): void {
		if (this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile) {
			const participantSequenceId = this.selectedParticipant.sequenceId;
			const policyStartDate = this.getPreviousDate(nonInstallerDays);
			const enrollmentDate = this.getPreviousDate(nonInstallerDays);
			this.additionalService.changeNonInstallerDatesMobile(participantSequenceId, policyStartDate, enrollmentDate).subscribe(() => {
				this.notificationService.success(
					"Non-Installer days set to " + nonInstallerDays + " for " +
					this.participantName
				);
			});
		}
		else {
			const participantSeqId = this.selectedParticipant.sequenceId;
			const serialNumber = this.selectedParticipant.deviceDetails.serialNumber;
			const shipDate = this.getPreviousDate(nonInstallerDays);
			const wirelessStatus = "Active-ShippedToCustomer";

			this.additionalService.changeNonInstallerDatesPlugin(participantSeqId, serialNumber, shipDate, wirelessStatus).subscribe(() => {
				this.notificationService.success(
					"Non-Installer days set to " + nonInstallerDays + " for " +
					this.participantName
				);
			});
		}
	}

	nonInstallerOptOut(): void {
		const dialogHeader = "Non-Installer Stage Opt-Out";
		const subtitle = this.subtitle;

		this.dialogService.openConfirmationDialog({
			title: dialogHeader,
			message: `Are you sure you want to stage Non-Installer Opt-Out?
            IMPORTANT: this is not a real-time PolicyPro transaction,\nsee WIKI instructions for actual processing times.`,
			subtitle
		});

		this.dialogService.confirmed().subscribe(x => {
			if (x) {
				if (this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile) {

					this.additionalService.nonInstallerOptOutMobile(
						this.policyNumber,
						this.policyPeriodSeqId,
						this.policyInceptionDate,
						this.selectedParticipant.sequenceId,
						this.selectedParticipant.id,
						this.selectedParticipant.mobileDetails.homebaseSequenceId,
						this.selectedParticipant.programType).subscribe(() => {
							this.notificationService.success(
								`Non-Installer Stage Opt-Out successfully submitted for ` +
								this.participantName +
								`.\n See WIKI instructions for processing times.`
							);
						});
				}
				else {
					this.additionalService.nonInstallerOptOutPlugin(
						this.policyNumber,
						this.policyPeriodSeqId,
						this.selectedParticipant.qualifyingPeriodSeqId,
						this.policyInceptionDate,
						this.selectedParticipant.deviceDetails.sequenceId,
						this.selectedParticipant.sequenceId,
						this.selectedParticipant.id,
						this.selectedParticipant.deviceDetails.serialNumber,
						this.selectedParticipant.vehicleDetails?.seqId).subscribe(() => {
							this.notificationService.success(
								`Non-Installer Stage Opt-Out successfully submitted for ` +
								this.participantName +
								`.\n See WIKI instructions for processing times.`
							);
						});
				}
			}
		});
	}

	openNonCommunicatorSetupDialog(): void {
		const dialogHeader = "Non-Communicator Status Setup";
		const subtitle = this.subtitle;

		this.dialogService.openFormDialog({
			title: dialogHeader,
			subtitle,
			component: DialogStatusSetupComponent,
			formModel: { isNonInstaller: false, isNonCommunicator: true, nonInstallerDays: undefined, nonCommunicatorDays: undefined }
		});

		this.dialogService
			.confirmed<{ isNonInstaller: boolean; isNonCommunicator: boolean; nonInstallerDays: number; nonCommunicatorDays: number }>()
			.subscribe(x => {
				if (x !== undefined) {
					this.changeNonCommunicatorDates(x.nonCommunicatorDays);
				}
			});
	}

	changeNonCommunicatorDates(nonCommunicatorDays: number): void {
		if (this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile) {

			const deviceSequenceId = this.selectedParticipant.mobileDetails.homebaseSequenceId;
			const lastContactDate = this.getPreviousDate(nonCommunicatorDays);
			const lastUploadDate = this.getPreviousDate(nonCommunicatorDays);
			this.additionalService.changeNonCommunicatorDatesMobile(deviceSequenceId, lastContactDate, lastUploadDate).subscribe(() => {

				// This will update enrollment and policy dates without overhualling the stored procedures
				this.additionalService.changeNonInstallerDatesMobile(this.selectedParticipant.sequenceId, lastContactDate, lastContactDate).subscribe(() => {
					this.notificationService.success(
						"Non-Communicator days set to " + nonCommunicatorDays + " for " +
						this.participantName
					);
				});
			});
		}
		else {
			const participantSeqId = this.selectedParticipant.sequenceId;
			const serialNumber = this.selectedParticipant.deviceDetails.serialNumber;
			const firstContactDate = this.getPreviousDate(nonCommunicatorDays);
			const lastContactDate = this.getPreviousDate(nonCommunicatorDays);
			const lastUploadDate = this.getPreviousDate(nonCommunicatorDays);
			const shipDate = this.getPreviousDate(nonCommunicatorDays);
			const wirelessStatus = "Active-InVehicle";

			this.additionalService.changeNonCommunicatorDatesPlugin(
				participantSeqId,
				serialNumber,
				firstContactDate,
				lastContactDate,
				lastUploadDate,
				shipDate,
				wirelessStatus).subscribe(() => {
					this.notificationService.success(
						"Non-Communicator days set to " + nonCommunicatorDays + " for " +
						this.participantName
					);
				});
		}
	}

	nonCommunicatorOptOut(): void {
		const dialogHeader = "Non-Communicator Stage Opt-Out";
		const subtitle = this.subtitle;

		this.dialogService.openConfirmationDialog({
			title: dialogHeader,
			message: `Are you sure you want to stage Non-Communicator Opt-Out?
            IMPORTANT: this is not a real-time PolicyPro transaction,\nsee WIKI instructions for actual processing times.`,
			subtitle
		});

		this.dialogService.confirmed().subscribe(x => {
			if (x) {
				if (this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile) {

					this.additionalService.nonCommunicatorOptOutMobile(
						this.policyNumber,
						this.policyPeriodSeqId,
						this.policyInceptionDate,
						this.selectedParticipant.sequenceId,
						this.selectedParticipant.id,
						this.selectedParticipant.mobileDetails.homebaseSequenceId,
						this.selectedParticipant.programType).subscribe(() => {
							this.notificationService.success(
								`Non-Communicator Stage Opt-Out successfully submitted for ` +
								this.participantName +
								`.\n See WIKI instructions for processing times.`
							);
						});
				}
				else {
					this.additionalService.nonCommunicatorOptOutPlugin(
						this.policyNumber,
						this.policyPeriodSeqId,
						this.selectedParticipant.qualifyingPeriodSeqId,
						this.policyInceptionDate,
						this.selectedParticipant.deviceDetails.sequenceId,
						this.selectedParticipant.sequenceId,
						this.selectedParticipant.id,
						this.selectedParticipant.deviceDetails.serialNumber,
						this.selectedParticipant.vehicleDetails?.seqId,
						this.selectedParticipant.programType).subscribe(() => {
							this.notificationService.success(
								`Non-Communicator Stage Opt-Out successfully submitted for ` +
								this.participantName +
								`.\n See WIKI instructions for processing times.`
							);
						});
				}
			}
		});
	}

	openChangeEnrollmentDialog(): void {
		const dialogHeader = "Change Enrollment Date";
		const subtitle = this.subtitle;

		this.dialogService.openFormDialog({
			title: dialogHeader,
			subtitle,
			component: ChangeEnrollmentDateComponent,
			formModel: { enrollmentDate: undefined }
		});

		this.dialogService.confirmed<{ enrollmentDate: string }>().subscribe(x => {
			if (x !== undefined) {
				const datePipe = new DatePipe("en-US");
				const formatedDate = datePipe.transform(x.enrollmentDate, "yyyy-MM-dd");
				this.changeEnrollmentDate(formatedDate);
			}
		});
	}

	changeEnrollmentDate(enrollmentDate: string): void {
		const participantSequenceId = this.selectedParticipant.sequenceId;

		this.additionalService.changeNonInstallerDatesMobile(participantSequenceId, enrollmentDate, enrollmentDate).subscribe(() => {
			this.notificationService.success("Successfully updated enrollment date for participant " + this.participantName);
		});
	}

	private getPreviousDate(days: number): string {
		const newDate = new Date();
		newDate.setDate(newDate.getDate() - days);
		return this.datePipe.transform(newDate, "yyyy-MM-dd");
	}

	isNonInstaller(participant: Participant): boolean {
		if (participant.enrollmentExperience === DeviceExperience.Mobile) {
			if (
				[ParticipantReasonCode.MobilePendingRegistration
				]
					.includes(participant.reasonCode)) {
				if (participant.enrollmentDate !== undefined && participant.policyStartDate !== undefined) {
					return !(participant.mobileRegistrationDetails?.registered === true);
				}
			}
		}
		else {
			if (participant.reasonCode === ParticipantReasonCode.CollectingData) {
				if (
					participant.deviceDetails.wirelessStatus === "Active-ShippedToCustomer" ||
					participant.deviceDetails.wirelessStatus === "Active-InVehicle"
				) {
					if (participant.enrollmentDate !== undefined && participant.policyStartDate !== undefined) {
						return true;
					}
				}
			}
		}

		return false;
	}
	// used to disable 'Non-installer Stage Opt-OUT
	canNonInstallerOptOut(participant: Participant): boolean {
		if (participant.enrollmentExperience === DeviceExperience.Mobile) {
			if (participant.enrollmentDate !== undefined &&
				participant.policyStartDate !== undefined &&
				(participant.mobileRegistrationDetails === undefined
					||
					(participant.mobileRegistrationDetails.status === MobileRegistrationStatus.NotRegistered &&
						[ParticipantReasonCode.MobilePendingRegistration
						]
							.includes(participant.reasonCode)
					))
			) {
				return true;
			}
		}
		else {
			if (participant.enrollmentDate !== undefined &&
				participant.policyStartDate !== undefined &&
				["Active-ShippedToCustomer", "Active-InVehicle"].includes(participant.deviceDetails.wirelessStatus) &&
				participant.deviceDetails.shipDate !== undefined

			) {
				return true;
			}
		}
		return false;
	}

	isNonCommunicator(participant: Participant): boolean {
		if (participant.enrollmentExperience === DeviceExperience.Mobile) {
			if (participant.reasonCode === ParticipantReasonCode.CollectingData) {
				if (participant.enrollmentDate !== undefined && participant.policyStartDate !== undefined) {
					return true;
				}
			}
		}

		else {
			if (participant.reasonCode === ParticipantReasonCode.CollectingData) {
				if (
					participant.deviceDetails.wirelessStatus === "Active-ShippedToCustomer" ||
					participant.deviceDetails.wirelessStatus === "Active-InVehicle"
				) {
					if (participant.enrollmentDate !== undefined && participant.policyStartDate !== undefined) {
						return true;
					}
				}
			}
		}

		return false;
	}

	shouldDisplayMobileSwitch(): boolean {
		return this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile &&
			this.selectedParticipant.programType === ProgramType.PriceModel3 &&
			this.selectedParticipant.mobileRegistrationDetails?.status === MobileRegistrationStatus.RegistrationComplete;
	}

	shouldDisplayOptInMobile(): boolean {
		return this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile &&
			this.selectedParticipant.reasonCode === ParticipantReasonCode.ParticipantOptedOut &&
			(this.selectedParticipant.externalId === undefined ||
				this.selectedParticipant.mobileRegistrationDetails?.status === MobileRegistrationStatus.NotRegistered) &&
			this.selectedParticipant.optOutDetails?.reason === OptOutReasonCode.NonInstaller;
	}

	shouldDisplayOptInPlugin(): boolean {
		return this.selectedParticipant.enrollmentExperience !== DeviceExperience.Mobile &&
			this.selectedParticipant.optOutDetails?.reason === OptOutReasonCode.NonInstaller &&
			this.selectedParticipant.reasonCode === ParticipantReasonCode.ParticipantOptedOut;
	}

	openOptInPluginDialog(): void {
		this.openOptInDialog(this.selectedParticipant,
			this.additionalService.automatedOptInPlugin(
				this.policyNumber,
				this.policyPeriodSeqId,
				this.policyInceptionDate,
				this.selectedParticipant
			));
	}

	openOptInMobileDialog(): void {
		const serviceCall$ = (vehicleExternalId: string = undefined) => this.additionalService.automatedOptInMobile(
			this.policyNumber,
			this.policyPeriodSeqId,
			this.policyInceptionDate,
			this.selectedParticipant,
			vehicleExternalId,
			this.appName);

		if (this.selectedParticipant.programType === ProgramType.PriceModel3 &&
			this.selectedParticipant.mobileRegistrationDetails !== undefined &&
			this.selectedParticipant.mobileRegistrationDetails.vehicleExternalId === undefined) {

			this.policyService.getMobileData(this.selectedParticipant.mobileRegistrationDetails.groupExternalId).subscribe(x => {

				const partVehIds = this.participants.map(y => y.mobileRegistrationDetails.vehicleExternalId).filter(y => y !== undefined);
				const unassigned = x.map(y => y.vehicleDetails).filter(y => !partVehIds.includes(y.externalId));

				if (unassigned.length > 1) {
					this.dialogService.openFormDialog({
						title: "Vehicle Selection",
						component: VehicleSelectionComponent,
						subtitle: this.subtitle,
						formModel: {} as Vehicle,
						componentData: { vehicles: unassigned }
					});

					this.dialogService.confirmed<Vehicle>().subscribe(v => {
						if (v) {
							this.openOptInDialog(this.selectedParticipant, serviceCall$(v.externalId));
						}
					});
				}
				else {
					this.openOptInDialog(this.selectedParticipant, serviceCall$(unassigned[0].externalId));
				}
			});
		}
		else {
			this.openOptInDialog(this.selectedParticipant, serviceCall$());
		}
	}

	private openOptInDialog(participant: Participant, serviceCallback: Observable<any>): void {
		this.dialogService.openConfirmationDialog({
			title: "Automated Opt-in",
			subtitle: this.subtitle,
			message: "Are you sure you want to stage this participant as\nAutomated Opt-in?"
		});

		this.dialogService.confirmed().subscribe(x => {
			if (x) {
				serviceCallback.subscribe(_ => {
					this.notificationService.success(`Automated Opt-in successfully submitted for ${this.participantName}.
					\nSee WIKI instructions for processing times.`);
				});
			}
		});
	}

	openMobileSwitchDialog(): void {
		this.dialogService.openConfirmationDialog({
			title: "Switch Mobile to Plug-in",
			subtitle: this.subtitle,
			message: "Are you sure you want to switch this participant from Mobile to Plug-in?\n\
If you do, you will need to assign a device through an additional process.",
			width: CUI_DIALOG_WIDTH.MEDIUM
		});

		this.dialogService.confirmed().subscribe(x => {
			if (x) {
				this.additionalService.switchMobileToObd(this.policyNumber, this.selectedParticipant.sequenceId).subscribe(_ => {
					this.notificationService.success(
						`${this.participantName} has successfully been switched from Mobile to Plug-in. Please assign a device if needed.`);
				});
			}
		});
	}

	shouldDisplayMobileNotFit(): boolean {
		return this.selectedParticipant.enrollmentExperience === DeviceExperience.Mobile &&
			this.selectedParticipant.reasonCode === ParticipantReasonCode.CollectingData &&
			this.selectedParticipant.enrollmentDate !== undefined;
	}

	openMobileNotFitDialog(): void {
		this.dialogService.openConfirmationDialog({
			title: "Mobile Not Fit Opt-out",
			subtitle: this.subtitle,
			message: "Are you sure you want to stage this participant as\nMobile Not Fit Opt-out?"
		});

		this.dialogService.confirmed().subscribe(x => {
			if (x) {
				this.additionalService.mobileNotFitOptOut(
					this.policyNumber,
					this.policyPeriodSeqId,
					this.policyInceptionDate,
					this.selectedParticipant
				).subscribe(_ => this.notificationService.success(`Mobile Not Fit Opt-out successfully submitted for ${this.participantName}.
				\nSee WIKI instructions for processing times.`));
			}
		});
	}

	openDeviceDateUpdateDialog(): void {
		const title = "Manual Device Date Update";
		const subtitle = this.subtitle;
		this.dialogService.openFormDialog({
			title,
			subtitle,
			component: DeviceDateUpdateComponent,
			formModel: { contactDate: Date }
		});

		this.dialogService.confirmed<{ contactDate: Date }>().subscribe(x => {
			if (x) {
				this.dialogService.openConfirmationDialog({
					title,
					subtitle,
					message: "Are you sure you want to update the device dates? \nClick OK to continue."
				});

				this.dialogService.confirmed().subscribe(y => {
					if (y) {
						this.additionalService.updateDeviceContactDates(this.selectedParticipant, x.contactDate).subscribe(_ => {
							const formatedDate = this.datePipe.transform(x.contactDate, "MM/dd/yyyy");
							this.notificationService.success(
								`${this.participantName} updated with contact dates using ${formatedDate}. The driving score will not be calculated.`);
						});
					}
				});
			}
		});
	}

	shouldDisplayDateUpdate(): boolean {
		return this.selectedParticipant.reasonCode === ParticipantReasonCode.CollectingData;
	}
}
