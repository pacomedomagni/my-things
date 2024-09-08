import { NotificationService } from "@pgr-cla/core-ui-components";
import { Component, OnDestroy, OnInit, Output } from "@angular/core";
import { BillingTransaction, Participant, PlugInDeviceAssignment } from "@modules/shared/data/resources";
import { BillingTransactionType, DeviceExperience, ParticipantReasonCode } from "@modules/shared/data/enums";
import { DialogService, HelperService } from "@modules/shared/services/_index";
import { Observable, Subject, of, forkJoin, concat } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ParticipantReasonCodeLabel } from "@modules/shared/data/enum-descriptions";
import { PlugInService } from "@modules/plug-in/services/plug-in.service";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { fadeAnimation } from "@modules/shared/animations";
import { takeUntil, toArray } from "rxjs/operators";
import { DialogUnsolicitedReturnComponent } from "../dialog-unsolicited-return/dialog-unsolicited-return.component";
import { DialogReturnPluginComponent } from "../dialog-return-plugin/dialog-return-plugin.component";

@UntilDestroy()
@Component({
	selector: "ubi-plug-in-home",
	templateUrl: "./plug-in-home.component.html",
	styleUrls: ["./plug-in-home.component.scss"],
	animations: [fadeAnimation]
})
export class PlugInHomeComponent implements OnInit, OnDestroy {

	constructor(
		public dialog: MatDialog,
		public policyQuery: PolicyQuery,
		public helper: HelperService,
		public plugInService: PlugInService,
		private dialogService: DialogService,
		private notificationService: NotificationService
	) { }

	private _selectedParticipant: Participant;
	private destroy$ = new Subject();
	@Output() selectedParticipantChanged: EventEmitter<Participant> = new EventEmitter();

	set selectedParticipant(val: Participant) {
		this._selectedParticipant = val;
		this.selectedParticipantChanged.emit(this._selectedParticipant);
	}

	get selectedParticipant(): Participant {
		return this._selectedParticipant;
	}

	participants: Participant[];
	deviceSerialNumberListMap: Map<number, string[]> = new Map<number, string[]>();

	state: string;
	participantReasonCodeLabel = ParticipantReasonCodeLabel;

	enableDeviceFeeButton: boolean;
	currentBillingTransaction: BillingTransaction;
	billingType = BillingTransactionType;

	private policyNumber: string;
	private policyPeriodSeqId: number;
	private policyInceptionDate: Date;
	public enableReturnButton$: Observable<boolean> = of(false);

	ngOnInit(): void {

		this.selectedParticipantChanged.pipe(takeUntil(this.destroy$)).subscribe(() => {
			if (this.deviceSerialNumberListMap.get(this.selectedParticipant.sequenceId) === undefined) {
				this.plugInService.getReturnedDevices(this.selectedParticipant.sequenceId)
					.subscribe(p => {
						this.deviceSerialNumberListMap.set(this.selectedParticipant.sequenceId, p);
						this.enableReturnButton$ = of(this.shouldEnableReturnButton(this.selectedParticipant,
							this.deviceSerialNumberListMap.get(this.selectedParticipant.sequenceId).length));
					});
			} else {
				this.enableReturnButton$ = of(this.shouldEnableReturnButton(this.selectedParticipant, this.deviceSerialNumberListMap
					.get(this.selectedParticipant.sequenceId).length));
			}

			this.fetchDeviceFeeEligibility().subscribe(x => {
				this.setDeviceFeeEligibility(x);
			});
		});

		this.policyQuery.workingPolicy$.pipe(untilDestroyed(this)).subscribe(x => {
			this.state = x.mailingAddress.state;
			this.policyNumber = x.policyNumber.toString();
			this.policyPeriodSeqId = x.policyPeriodSeqId;
			this.policyInceptionDate = x.inceptionDate;
			this.participants = x.participants.filter(y => y.enrollmentExperience !== DeviceExperience.Mobile);
			const index = this.selectedParticipant === undefined ? 0 :
				this.participants.findIndex(y => y.sequenceId === this.selectedParticipant.sequenceId);
			this.selectedParticipant = this.participants[index];
		});
	}

	private fetchDeviceFeeEligibility(): Observable<[boolean, BillingTransaction]> {
		return forkJoin([
			this.plugInService.isEligibleForFeeChange(this.selectedParticipant.deviceDetails?.sequenceId, this.selectedParticipant.reasonCode),
			this.plugInService.getCurrentBillingTransaction(this.selectedParticipant.sequenceId)
		]);
	}

	private setDeviceFeeEligibility(data: [boolean, BillingTransaction]): void {
		this.currentBillingTransaction = data[1];
		this.enableDeviceFeeButton = data[0] && this.currentBillingTransaction?.transactionType !== BillingTransactionType.Reversal;
	}

	shouldEnableReturnButton(participant: Participant, totalNumberOfDeviceSerialNumbers: number): boolean {
		return (participant.reasonCode === ParticipantReasonCode.ParticipantOptedOut
			|| participant.reasonCode === ParticipantReasonCode.PolicyCanceled
			|| participant.reasonCode === ParticipantReasonCode.CollectingData)
			&& totalNumberOfDeviceSerialNumbers > 0;
	}

	ngOnDestroy(): void {
		this.destroy$.next("");
		this.destroy$.complete();
	}

	openAssignPlugInDialog(): void {
		const dialogHeader = "Assign Plug-in Device";
		const participantHeader = this.policyQuery.getParticipantName(this.selectedParticipant);
		const subtitle = `${participantHeader}` +
			(this.selectedParticipant.enrollmentExperience !== DeviceExperience.Mobile ?
				`<p>${this.selectedParticipant.deviceDetails?.serialNumber}</p>` : ``);

		this.dialogService.openConfirmationDialog({
			title: dialogHeader,
			message: `Are you sure you want to assign a device to ${participantHeader}?`,
			subtitle
		});

		this.dialogService.confirmed().subscribe(x => {
			if (x) {
				this.assignPlugInDevice();
				this.plugInService.getReturnedDevices(this.selectedParticipant.sequenceId)
					.subscribe(y => { this.deviceSerialNumberListMap.set(this.selectedParticipant.sequenceId, y); });
			}
		});
	}

	assignPlugInDevice(): void {

		this.plugInService.assignPlugInDevice(
			this.policyNumber,
			this.selectedParticipant.sequenceId,
			this.state)
			.subscribe(x => {
				this.displayConfirmationMessageForDeviceAssignment(x);
			});
	}

	shouldDisableAssignPlugInDevice(participant: Participant): boolean {
		return participant.reasonCode !== ParticipantReasonCode.NeedsDeviceAssigned &&
			(participant.reasonCode !== ParticipantReasonCode.DeviceReplacementNeeded);
	}

	private displayConfirmationMessageForDeviceAssignment(response: PlugInDeviceAssignment): void {
		this.notificationService.success(
			`Device ` + response.deviceSerialNumber + ` has been assigned to ` + response.modelYear
			+ ` ` + response.make + ` ` + response.model + `.`);
	}

	private displayConfirmationMessageForDeviceReturn(returnedDeviceSerialNumber: string): void {
		this.notificationService.success(
			`Device ` + returnedDeviceSerialNumber + ` has been successfully returned for ` + this.policyQuery
				.getParticipantName(this.selectedParticipant));
	}

	openReturnPlugInDialog(): void {
		const dialogHeader = "Return Plug-in Device";
		const participantHeader = this.policyQuery.getParticipantName(this.selectedParticipant);
		const subtitle = `${participantHeader}` +
			(this.selectedParticipant.enrollmentExperience !== DeviceExperience.Mobile ?
				`<p>${this.selectedParticipant.deviceDetails?.serialNumber}</p>` : ``);

		this.dialogService.openFormDialog({
			title: dialogHeader,
			subtitle,
			component: DialogReturnPluginComponent,
			formModel: { selection: undefined },
			componentData: this.deviceSerialNumberListMap
				.get(this.selectedParticipant.sequenceId)
		});

		this.dialogService.confirmed<{ selection: string }>().subscribe(x => {
			if (x !== undefined) {

				this.plugInService.returnPlugInDevice(this.selectedParticipant.sequenceId, x.selection)
					.subscribe(y => {
						if (y === true) {
							this.deviceSerialNumberListMap.set(
								this.selectedParticipant.sequenceId,
								this.deviceSerialNumberListMap
									.get(this.selectedParticipant.sequenceId)
									.filter(z => z !== x.selection));
							this.displayConfirmationMessageForDeviceReturn(x.selection);
						}
					});
			}
		});
	}

	openUnsolicitedReturnDialog(): void {
		const dialogHeader = "Unsolicited Device Return";
		const participantHeader = this.policyQuery.getParticipantName(this.selectedParticipant);
		const subtitle = `${participantHeader}` +
			(this.selectedParticipant.enrollmentExperience !== DeviceExperience.Mobile ?
				`<p>${this.selectedParticipant.deviceDetails?.serialNumber}</p>` : ``);

		this.dialogService.openFormDialog({
			title: dialogHeader,
			subtitle,
			component: DialogUnsolicitedReturnComponent,
			formModel: { selection: undefined }
		});

		this.dialogService.confirmed<{ selection: string }>().subscribe(x => {
			if (x !== undefined) {
				const isSurcharge = x.selection === "surcharge" ? true : false;
				const message = "Unsolicited Return " + (isSurcharge ? "Outside Window (Surcharge)" : "Within Window (No Surcharge)");
				this.dialogService.openConfirmationDialog({
					title: dialogHeader,
					message: `Are you sure you want to stage this participant for <br/> ${message}?`,
					subtitle
				});

				this.dialogService.confirmed().subscribe(y => {
					if (y) {
						this.plugInService.unsolicitedDeviceReturn(
							this.policyNumber,
							this.policyPeriodSeqId,
							this.policyInceptionDate,
							!isSurcharge,
							this.selectedParticipant
						).subscribe(_ =>
							this.notificationService.success(`${message} successfully submitted for ${participantHeader}.\n\nSee WIKI instructions for processing times.`));
					}
				});
			}
		});
	}

	shouldDisableUnsolicitedReturn(participant: Participant): boolean {
		return participant.reasonCode !== ParticipantReasonCode.CollectingData;
	}

	openDeviceFeeDialog(): void {
		const subtitle = this.policyQuery.getParticipantName(this.selectedParticipant);
		const hasFee = this.currentBillingTransaction?.transactionType === BillingTransactionType.Fee;
		this.dialogService.openConfirmationDialog({
			title: "Device Fee Change",
			subtitle,
			message: `Are you sure you want to ${hasFee ? "reverse" : "add"} the Device Charge? \nClick "OK" to continue`
		});

		this.dialogService.confirmed().subscribe(x => {
			if (x) {
				concat(
					this.plugInService.addBillingTransaction(
						this.selectedParticipant.sequenceId,
						this.selectedParticipant.deviceDetails?.sequenceId,
						this.selectedParticipant.deviceDetails?.serialNumber,
						hasFee ? BillingTransactionType.Reversal : BillingTransactionType.Fee),
					this.fetchDeviceFeeEligibility()
				).pipe(toArray()).subscribe(data => {
					this.setDeviceFeeEligibility(data[1]);
					this.notificationService.success(`Device Charge has been ${hasFee ? "reversed" : "applied"}`);
				});
			}
		});
	}
}
