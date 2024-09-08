import { NotificationService } from "@pgr-cla/core-ui-components";
import { Component, OnInit } from "@angular/core";
import { MobileDeviceRegistration, Participant, Vehicle } from "@modules/shared/data/resources";
import { MobileRegistrationStatus, ParticipantReasonCode, ProgramType } from "@modules/shared/data/enums";
import { MobileRegistrationStatusLabel, ParticipantStatusLabel } from "@modules/shared/data/enum-descriptions";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { DialogService, HelperService } from "@modules/shared/services/_index";
import { MobileRegisterService } from "@modules/mobile/services/register.service";
import { fadeAnimation } from "@modules/shared/animations";
import { take } from "rxjs/operators";
import { DialogVehicleSelectionComponent } from "../dialog-vehicle-selection/dialog-vehicle-selection.component";
import { ChangePhoneNumberComponent } from "../change-phone-number/change-phone-number.component";

@UntilDestroy()
@Component({
	selector: "ubi-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
	animations: [fadeAnimation]
})
export class RegisterComponent implements OnInit {

	constructor(
		public policyQuery: PolicyQuery,
		public helper: HelperService,
		private policyService: PolicyService,
		private dialogService: DialogService,
		private registerService: MobileRegisterService,
		private notificationService: NotificationService) { }

	private get participant(): Participant {
		return this.policyParticipants.find(x => x.externalId === this.selectedParticipant.participantExternalId);
	}

	selectedParticipant: MobileDeviceRegistration;
	participants: MobileDeviceRegistration[];

	MobileRegistrationStatus = MobileRegistrationStatus;
	mobileRegistrationStatusLabel = MobileRegistrationStatusLabel;
	participantStatusLabel = ParticipantStatusLabel;
	disallowedRegistrationStatuses = [
		MobileRegistrationStatus.Disabled,
		MobileRegistrationStatus.Inactive,
		MobileRegistrationStatus.PendingResolution,
		MobileRegistrationStatus.Locked,
		MobileRegistrationStatus.RegistrationComplete
	];

	private policyNumber: string;
	private appName: string;
	private policyParticipants: Participant[];

	ngOnInit(): void {
		this.policyQuery.mobileParticipants$.pipe(untilDestroyed(this)).subscribe(x => this.policyParticipants = x);
		this.policyQuery.workingPolicy$.pipe(take(1)).subscribe(x => {
			this.policyNumber = x.policyNumber.toString();
			this.appName = x.appName;
			this.policyService.getMobileRegistrationData(this.policyNumber).subscribe(y => {
				this.participants = y;
				this.selectedParticipant = this.participants[0];
			});
		});
	}

	openChangePhoneNumberDialog(): void {
		const dialogHeader = "Update Mobile Number";
		const participantHeader = this.helper
			.getExtender(this.selectedParticipant, "DriverFirstName") + " " + this.helper
				.getExtender(this.selectedParticipant, "DriverLastName");
		const subtitle = `${participantHeader}`;

		this.dialogService.openFormDialog({
			title: dialogHeader,
			subtitle,
			component: ChangePhoneNumberComponent,
			formModel: { phoneNumber: undefined }
		});

		this.dialogService.confirmed<{ phoneNumber: string }>().subscribe(x => {
			if (x !== undefined) {
				this.registerService.updateMobileNumber(
					this.policyNumber,
					this.selectedParticipant.registrationSequenceId,
					x.phoneNumber).subscribe(y => {
						this.updateParticipant(y);
						this.notificationService.success(`Mobile number updated successfully.`);
					});

			}
		});
	}

	updateMobileNumber(phoneNumber: string): void {
		this.registerService.updateMobileNumber(
			this.policyNumber,
			this.selectedParticipant.registrationSequenceId,
			phoneNumber);
	}

	registerDevice(registrationDetails: MobileDeviceRegistration): void {
		const programType = this.participant?.programType ?? ProgramType.PriceModel3;

		if (programType === ProgramType.PriceModel3 && registrationDetails.vehicleExternalId === undefined) {

			// could be very chatty depending on user interactions.. maybe figure a cache if same working policy?
			this.policyService.getMobileData(registrationDetails.groupExternalId).subscribe(x => {

				const partVehIds = this.participants.map(y => y.vehicleExternalId).filter(y => y !== undefined);
				const unassigned = x.map(y => y.vehicleDetails).filter(y => !partVehIds.includes(y.externalId));

				if (unassigned.length > 1) {
					const dialogHeader = "Vehicle Selection";
					const participantHeader = this.helper
						.getExtender(this.selectedParticipant, "DriverFirstName") + " " + this.helper
							.getExtender(this.selectedParticipant, "DriverLastName");
					const subtitle = `${participantHeader}`;

					this.dialogService.openFormDialog({
						title: dialogHeader,
						subtitle,
						component: DialogVehicleSelectionComponent,
						formModel: { selection: undefined },
						componentData: unassigned
					});

					this.dialogService.confirmed<{ selection: Vehicle }>().subscribe(z => {
						if (z !== undefined) {
							registrationDetails.vehicleExternalId = z.selection.externalId;
							this.register(registrationDetails, programType);
						}
					});

				} else {
					registrationDetails.vehicleExternalId = unassigned[0].externalId;
					this.register(registrationDetails, programType);
				}
			});

			return;
		}

		this.register(registrationDetails, programType);
	}

	unlockRegistration(registrationDetails: MobileDeviceRegistration): void {
		this.registerService.unlockDevice(this.policyNumber, registrationDetails.mobileRegistrationCode, registrationDetails.registrationSequenceId)
			.subscribe(x => {
				this.updateParticipant(x);
				this.notificationService.success(`Unlock successful`);
			});
	}

	resetRegistration(registrationDetails: MobileDeviceRegistration): void {
		this.registerService.reset(registrationDetails.mobileRegistrationCode, registrationDetails.registrationSequenceId).subscribe(x => {
			this.updateParticipant(x);
			this.notificationService.success(`Registration successfully reset.`);
		});
	}

	shouldDisplayMobilePause(registrationDetails: MobileDeviceRegistration): boolean {
		return this.participant?.reasonCode === ParticipantReasonCode.CollectingData &&
			registrationDetails?.status === MobileRegistrationStatus.RegistrationComplete;
	}

	getMobilePauseDisplay(): string {
		return this.helper.getExtender(this.participant.mobileDetails, "IsPaused") ? "Disable Mobile Device Pause" : "Pause Mobile Device";
	}

	updatePause(registrationDetails: MobileDeviceRegistration): void {
		const isPaused = this.helper.getExtender(this.participant.mobileDetails, "IsPaused");
		this.registerService.updatePause(this.participant.mobileDetails.homebaseSequenceId, !isPaused).subscribe(_ => {
			const message = isPaused ? "Pause is now removed for your Mobile device." : "Your Mobile device is now paused.";
			this.notificationService.success(message);
		});
	}

	private register(registrationDetails: MobileDeviceRegistration, programType: ProgramType): void {
		this.registerService.register(registrationDetails.mobileRegistrationCode, programType, registrationDetails.vehicleExternalId, this.appName)
			.subscribe(x => {
				this.updateParticipant(x);
				this.notificationService.success(`Registration successful.`);
			});
	}

	private updateParticipant(newData: MobileDeviceRegistration): void {
		const index = this.participants.findIndex(y => y.participantExternalId === newData.participantExternalId);
		newData.extenders = this.participants[index]?.extenders;
		this.selectedParticipant = this.participants[index] = newData;
	}
}
