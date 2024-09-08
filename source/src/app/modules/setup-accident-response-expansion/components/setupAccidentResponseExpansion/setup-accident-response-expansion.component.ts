import { NotificationService } from "@pgr-cla/core-ui-components";
import { Component, ViewChild } from "@angular/core";
import { ADDriver, Participant, Policy } from "@modules/shared/data/resources";
import { UntilDestroy } from "@ngneat/until-destroy";

import { DialogService } from "@modules/shared/services/_index";
import { fadeAnimation } from "@modules/shared/animations";
import { SetupAccidentResponseExpansionService } from "@modules/setup-accident-response-expansion/services/setup-accident-response-expansion.service";
import { FormControl, Validators } from "@angular/forms";
import { HelperService } from "@modules/shared/services/_index";
import { MessageCode, MobileRegistrationStatus } from "@modules/shared/data/enums";
import { MatButton } from "@angular/material/button";
import { Injectable } from "@angular/core";
import { MobileRegisterService } from "@modules/mobile/services/register.service";
import { ChangePhoneNumberComponent } from "@modules/mobile/components/_index";
import { UnenrollReasonLabel } from "@modules/shared/data/enum-descriptions";
import { DialogEnrollmentComponent } from "../dialog-enrollment/dialog-enrollment.component";

@UntilDestroy()
@Component({
	selector: "ubi-setup-accident-response-expansion",
	templateUrl: "./setup-accident-response-expansion.component.html",
	styleUrls: ["./setup-accident-response-expansion.component.scss"],
	animations: [fadeAnimation]
})

@Injectable({ providedIn: "root" })
export class SetupAccidentResponseExpansionComponent {
	@ViewChild("enrollButton") enrollButton: MatButton;
	@ViewChild("registerButton") registerButton: MatButton;

	unenrollReasonLabel = UnenrollReasonLabel;

	constructor(
		private setupAccidentResponseExpansionService: SetupAccidentResponseExpansionService,
		private notificationService: NotificationService,
		private helper: HelperService,
		private dialogService: DialogService,
		private mobileRegisterService: MobileRegisterService) { }

	public drivers: ADDriver[];
	public policies: Policy[] | undefined;
	public selectedDriver: ADDriver;
	public policyNumber: string;
	public phoneNumber: string;

	phoneNumberFormControl = new FormControl("", [
		Validators.required,
		Validators.minLength(10),
		Validators.maxLength(10)
	]);

	public policyParticipants: Participant[];

	getAREParticipantSummary(policyNumber: string): void {
		this.selectedDriver = undefined;
		this.policies = undefined;
		this.setupAccidentResponseExpansionService.getAREParticipantSummary(policyNumber).subscribe(summary => {
			this.policyNumber = policyNumber;
			this.drivers = summary.drivers;
			this.selectedDriver = this.drivers[0];
			});
	}

	isMobileRegistrationStatusComplete(statusCode: MobileRegistrationStatus): boolean {
		return statusCode === MobileRegistrationStatus.RegistrationComplete;
	}

	isMobileRegistrationStatusPendingResolution(statusCode: MobileRegistrationStatus): boolean {
		return statusCode === MobileRegistrationStatus.PendingResolution;
	}

	enrollParticipant(driverReferenceId: string): void {
		const dialogHeader = "Enroll Participant";

		const subtitle = "Driver Reference ID " + driverReferenceId;

		this.dialogService.openFormDialog({
			title: dialogHeader,
			subtitle,
			component: DialogEnrollmentComponent,
			componentData: undefined,
			formModel: { phoneNumber: this.selectedDriver.mobileRegistrationData === undefined ||
				 this.selectedDriver.mobileRegistrationData === null ? "" : this.selectedDriver.mobileRegistrationData.mobileRegistrationCode }
		});

		this.dialogService.confirmed<any>().subscribe(y => {
			if (y !== undefined) {
				this.setupAccidentResponseExpansionService.enrollParticipant(this.policyNumber, driverReferenceId, y.phoneNumber).subscribe(() => {

					this.setupAccidentResponseExpansionService.getAREParticipantSummary(this.policyNumber).subscribe(summary => {
						this.policyNumber = this.policyNumber;
						this.drivers = summary.drivers;
						this.selectedDriver = this.drivers.find((drv: ADDriver) => drv.driverReferenceId === this.selectedDriver.driverReferenceId);
						});

					this.notificationService.success(
						"Selected participant has been enrolled"
					);
				});
			}
		});
	}

	shouldEnrollButtonBeDisabled(): boolean {
		return this.selectedDriver.tmxParticipantSummary?.cadExperience
		|| this.selectedDriver.tmxParticipantSummary?.adEnrolled
		|| !this.selectedDriver.adEnrollmentEligible
		|| this.isMobileRegistrationStatusPendingResolution(this.selectedDriver.mobileRegistrationData?.mobileRegistrationStatusCode);
	}
	shouldRegisterButtonBeDisabled(): boolean {
		return (!this.selectedDriver.tmxParticipantSummary?.adEnrolled && !this.selectedDriver.tmxParticipantSummary?.ubiEnrolled)  || this.isMobileRegistrationStatusComplete(this.selectedDriver.mobileRegistrationData?.mobileRegistrationStatusCode)
		|| this.isMobileRegistrationStatusPendingResolution(this.selectedDriver.mobileRegistrationData?.mobileRegistrationStatusCode);
	}

	shouldActivateADFeatureButtonBeDisabled(): boolean {
		return !this.selectedDriver.tmxParticipantSummary?.adEnrolled
		|| this.selectedDriver.tmxParticipantSummary?.cadExperience
		|| this.selectedDriver.tmxParticipantSummary?.adActivated
		|| !this.isMobileRegistrationStatusComplete(this.selectedDriver.mobileRegistrationData?.mobileRegistrationStatusCode);
	}

	shouldUBIFeatureButtonBeDisabled(): boolean {
		return !this.selectedDriver.tmxParticipantSummary?.ubiEnrolled
		|| this.selectedDriver.tmxParticipantSummary?.ubiActivated
		|| !this.isMobileRegistrationStatusComplete(this.selectedDriver.mobileRegistrationData?.mobileRegistrationStatusCode);
	}

	shouldUnenrollReasonBeDisplayed(): boolean {
		return this.getARESummaryUnenrollReason() != null;
	}

	shouldUnenrollmentDateBeDisplayed(): boolean {
		return this.getARESummaryUnenrollmentDate() != null;
	}

	registerParticipant(): void {
		this.setupAccidentResponseExpansionService.registerParticipant(this.policyNumber, this.selectedDriver.driverReferenceId).subscribe(() => {
			this.setupAccidentResponseExpansionService.getAREParticipantSummary(this.policyNumber).subscribe(summary => {
				this.drivers = summary.drivers;
				this.selectedDriver = this.drivers.find((drv: ADDriver) => drv.driverReferenceId === this.selectedDriver.driverReferenceId);
				});
			this.notificationService.success(
				"Selected participant has been registered"
			);
		});
	}

	activateAccidentDetectionFeature(): void {

		this.setupAccidentResponseExpansionService.activateAccidentDetectionFeature(this.selectedDriver.tmxParticipantSummary.telematicsId).subscribe(() => {
			this.setupAccidentResponseExpansionService.getAREParticipantSummary(this.policyNumber).subscribe(summary => {
				this.drivers = summary.drivers;
				this.selectedDriver = this.drivers.find((drv: ADDriver) => drv.driverReferenceId === this.selectedDriver.driverReferenceId);

				this.notificationService.success(
					"Selected participant has been activated"
					);
			});
		});
	}

	activateUBIFeature(): void {
		this.setupAccidentResponseExpansionService.activateUBIFeature(this.selectedDriver.tmxParticipantSummary.telematicsId).subscribe(() => {
			this.setupAccidentResponseExpansionService.getAREParticipantSummary(this.policyNumber).subscribe(summary => {
				this.drivers = summary.drivers;
				this.selectedDriver = this.drivers.find((drv: ADDriver) => drv.driverReferenceId === this.selectedDriver.driverReferenceId);

				this.notificationService.success(
					"Selected participant has been activated"
					);
			});
		});
	}

	getARESummaryActivatedValue(): string {
		if (this.selectedDriver.participantSummary == null) {
			return "Not Found";
		}
		return this.selectedDriver.participantSummary.isAccidentResponseActivated ? "Yes" : "No";

	}

	getARESummaryUnenrollReason(): string {
		if (this.selectedDriver.participantSummary == null) {
			return "Not Found";
		}
		return this.unenrollReasonLabel.get(this.selectedDriver.participantSummary.unenrollReason);
	}

	getARESummaryUnenrollmentDate(): Date {
		if (this.selectedDriver.participantSummary == null) {
			return null;
		}
		return this.selectedDriver.participantSummary.unenrollmentDateTime;
	}

	getARESummaryEnrollmentDate(): Date {
		if (this.selectedDriver.participantSummary == null) {
			return null;
		}
		return this.selectedDriver.participantSummary.enrollmentDateTime;
	}

	getPhoneNumberValue(): string {
		if (this.selectedDriver.mobileRegistrationData == null) {
			return "Not Found";
		}
		return this.selectedDriver.mobileRegistrationData.mobileRegistrationCode;
	}

	getUBIEnrolledValue(): string {
		if (this.selectedDriver.tmxParticipantSummary == null) {
			return "Not Found";
		}
		return this.selectedDriver.tmxParticipantSummary.ubiEnrolled ? "Yes" : "No";
	}

	getUBIActivatedValue(): string {
		if (this.selectedDriver.tmxParticipantSummary == null) {
			return "Not Found";
		}
		return this.selectedDriver.tmxParticipantSummary.ubiActivated ? "Yes" : "No";
	}

	getARESummaryEnrolledValue(): string {
		if (this.selectedDriver.participantSummary == null) {
			return "Not Found";
		}
		return this.selectedDriver.participantSummary.isAccidentResponseEnrolled ? "Yes" : "No";
	}

	isChallengeCodeExpired(): boolean {
		return this.selectedDriver.mobileRegistrationData?.challengeExpirationDateTime < new Date();
	}

	searchByPhoneNumber(phoneNumber: string): void {
		this.selectedDriver = undefined;

		if (phoneNumber?.length === 10) {
			this.policies = undefined;
			this.setupAccidentResponseExpansionService.getPolicyByMobileRegistrationCode(phoneNumber).subscribe(policies => {
				this.policies = policies;
				if (!this.policyListHasErrors()) {
					if (this.policies?.length === 1) {
						this.setPolicy(this.policies[0].policyNumber.toString());
						this.policies = undefined;
					}
				}
			});
		}
	}

	policyListHasErrors(): boolean {
		if (this.policies !== undefined && this.helper.getMessage(this.policies[0], MessageCode.Error)) {
			return true;
		}
		else {
			return false;
		}
	}

	getPrimaryError(): string | undefined {
		if (this.policies !== undefined) {
			return this.policies[0]?.messages[MessageCode[MessageCode.Error]];
		}
	}

	setPolicy(policyNumber: string): void {
		this.getAREParticipantSummary(policyNumber);
	}

	shouldUpdatePhoneNumberButtonBeDisabled(): boolean {
		return !this.selectedDriver.tmxParticipantSummary?.adEnrolled && !this.selectedDriver.tmxParticipantSummary?.ubiEnrolled;
	}

	openChangePhoneNumberDialog(): void {
		const dialogHeader = "Update Mobile Number";
		const participantHeader = "Driver Reference ID " + this.selectedDriver.driverReferenceId;
		const subtitle = `${participantHeader}`;

		this.dialogService.openFormDialog({
			title: dialogHeader,
			subtitle,
			component: ChangePhoneNumberComponent,
			formModel: { phoneNumber: undefined }
		});
		this.dialogService.confirmed<{ phoneNumber: string }>().subscribe(x => {
			if (x !== undefined) {
				this.mobileRegisterService.updateMobileNumber(
					this.policyNumber,
					this.selectedDriver.mobileRegistrationData.mobileRegistrationSeqId,
					x.phoneNumber).subscribe(y => {
						this.setupAccidentResponseExpansionService.getAREParticipantSummary(this.policyNumber).subscribe(summary => {
							this.drivers = summary.drivers;
							this.selectedDriver = this.drivers.find((drv: ADDriver) => drv.driverReferenceId === this.selectedDriver.driverReferenceId);
							});
						this.notificationService.success(`Mobile number updated successfully.`);
					});

			}
		});
	}

	unenrollParticipantUserInitiated(): void {
		this.setupAccidentResponseExpansionService.unenrollParticipantUserInitiated(this.selectedDriver.tmxParticipantSummary.telematicsId).subscribe(() => {
			this.setupAccidentResponseExpansionService.getAREParticipantSummary(this.policyNumber).subscribe(summary => {
				this.policyNumber = this.policyNumber;
				this.drivers = summary.drivers;
				this.selectedDriver = this.drivers.find((drv: ADDriver) => drv.driverReferenceId === this.selectedDriver.driverReferenceId);
				});

			this.notificationService.success(
				"Selected participant has been user initiated unenrolled"
			);
		});
	}

	shouldUnenrollUserInitiatedButtonBeDisabled(): boolean {
		return !this.selectedDriver.tmxParticipantSummary?.adEnrolled ?? false;
	}

	unenrollParticipantNonInstaller(): void {
		this.setupAccidentResponseExpansionService.unenrollParticipantNonInstaller(this.selectedDriver.tmxParticipantSummary.telematicsId,
			this.policyNumber,
			this.selectedDriver.driverReferenceId).subscribe(() => {
				this.setupAccidentResponseExpansionService.getAREParticipantSummary(this.policyNumber).subscribe(summary => {
					this.policyNumber = this.policyNumber;
					this.drivers = summary.drivers;
					this.selectedDriver = this.drivers.find((drv: ADDriver) => drv.driverReferenceId === this.selectedDriver.driverReferenceId);
					});

				this.notificationService.success(
					"Selected participant has been non installer unenrolled"
				);
		});
	}

	shouldUnenrollNonInstallerButtonBeDisabled(): boolean {
		return !this.selectedDriver.participantSummary?.isAccidentResponseEnrolled
			|| this.selectedDriver.participantSummary?.isAccidentResponseActivated;
	}

	unenrollParticipantNonCommunicator(): void {
		this.setupAccidentResponseExpansionService.unenrollParticipantNonCommunicator(this.selectedDriver.tmxParticipantSummary.telematicsId,
			this.policyNumber,
			this.selectedDriver.driverReferenceId).subscribe(() => {
				this.setupAccidentResponseExpansionService.getAREParticipantSummary(this.policyNumber).subscribe(summary => {
					this.policyNumber = this.policyNumber;
					this.drivers = summary.drivers;
					this.selectedDriver = this.drivers.find((drv: ADDriver) => drv.driverReferenceId === this.selectedDriver.driverReferenceId);
					});

				this.notificationService.success(
					"Selected participant has been non communicator unenrolled"
				);
		});
	}

	shouldUnenrollNonCommunicatorButtonBeDisabled(): boolean {
		return !this.selectedDriver.tmxParticipantSummary?.adActivated;
	}
}

