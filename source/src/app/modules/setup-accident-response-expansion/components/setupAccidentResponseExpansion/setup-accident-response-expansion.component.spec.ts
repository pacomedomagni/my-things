/* eslint-disable unused-imports/no-unused-vars */
import { SetupAccidentResponseExpansionService } from "@modules/setup-accident-response-expansion/services/setup-accident-response-expansion.service";
import { AREParticipantSummaryResponse, ADDriver, Policy, MobileDeviceRegistration } from "@modules/shared/data/resources";
import { DialogService } from "@modules/shared/services/_index";
import { autoSpy } from "autoSpy";
import { NotificationService } from "@pgr-cla/core-ui-components";
import { of } from "rxjs";
import { MobileRegistrationStatus } from "@modules/shared/data/enums";
import { HelperService } from "@modules/shared/services/_index";
import { MobileRegisterService } from "@modules/mobile/services/register.service";
import { ChangePhoneNumberComponent } from "@modules/mobile/components/_index";
import { SetupAccidentResponseExpansionComponent } from "./setup-accident-response-expansion.component";

describe("AccidentDetectionComponent", () => {

	it("should construct", () => {
		const { build } = setup().default();
		const r = build();
	});
});

function setup(): any {
	const notificationService = autoSpy(NotificationService);
	const setupAccidentResponseExpansionService = autoSpy(SetupAccidentResponseExpansionService);
	setupAccidentResponseExpansionService.getAREParticipantSummary.mockReturnValue(of({ drivers: [{} as ADDriver] } as AREParticipantSummaryResponse));
	setupAccidentResponseExpansionService.getPolicyByMobileRegistrationCode.mockReturnValue(of({ policies: [{} as Policy[]] } as any));
	setupAccidentResponseExpansionService.enrollParticipant.mockReturnValue(of({}));
	setupAccidentResponseExpansionService.unenrollParticipantUserInitiated.mockReturnValue(of({}));
	setupAccidentResponseExpansionService.unenrollParticipantNonInstaller.mockReturnValue(of({}));
	setupAccidentResponseExpansionService.unenrollParticipantNonCommunicator.mockReturnValue(of({}));
	const mobileRegisterService = autoSpy(MobileRegisterService);
	mobileRegisterService.updateMobileNumber.mockReturnValue(of({} as MobileDeviceRegistration));
	const dialogService = autoSpy(DialogService);
	const helperService = autoSpy(HelperService);
	const builder = {
		setupAccidentResponseExpansionService,
		notificationService,
		helperService,
		dialogService,
		mobileRegisterService,
		default(): any {
			return builder;
		},
		build(): any {
			return new SetupAccidentResponseExpansionComponent(setupAccidentResponseExpansionService, notificationService, helperService, dialogService, mobileRegisterService);
		}
	};

	return builder;
}

describe("Accident detection component", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should getAREParticipantSummary", () => {
		const { build, setupAccidentResponseExpansionService } = setup().default();
		const component = build();
		component.getAREParticipantSummary("123");
		expect(setupAccidentResponseExpansionService.getAREParticipantSummary).toHaveBeenCalled();
	});

	it("should getPolicyByMobileRegistrationCode", () => {
		const { build, setupAccidentResponseExpansionService } = setup().default();
		const component = build();
		component.searchByPhoneNumber("1234567890");
		expect(setupAccidentResponseExpansionService.getPolicyByMobileRegistrationCode).toHaveBeenCalled();
	});

	it("should enroll participant", () => {
		const { build, setupAccidentResponseExpansionService, notificationService, dialogService } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", mobileRegistrationData: { mobileRegistrationCode: "4403423333" } };
		const driverReferenceId = "27";
		dialogService.confirmed.mockReturnValue(of(true));
		component.enrollParticipant(driverReferenceId);
		expect(setupAccidentResponseExpansionService.getAREParticipantSummary).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("should register participant", () => {
		const { build, setupAccidentResponseExpansionService, notificationService, dialogService } = setup().default();
		const component = build();
		const policyNumber = "12345678";
		const driverReferenceId = "12345678";
		setupAccidentResponseExpansionService.registerParticipant.mockReturnValue(of({}));
		component.selectedDriver = { driverReferenceId: "1", tmxParticipantSummary: { telematicsId: "12345" } };
		component.registerParticipant();
		expect(setupAccidentResponseExpansionService.registerParticipant).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("is MobileRegistrationStatusComplete returns true", () => {
		const { build } = setup().default();
		const component = build();
		const statusCode = MobileRegistrationStatus.RegistrationComplete;

		component.isMobileRegistrationStatusComplete(statusCode);
		expect(component.isMobileRegistrationStatusComplete(statusCode)).toBeTruthy();
	});

	it("is MobileRegistrationStatusComplete returns false", () => {
		const { build } = setup().default();
		const component = build();
		const statusCode = MobileRegistrationStatus.NotRegistered;

		component.isMobileRegistrationStatusComplete(statusCode);
		expect(component.isMobileRegistrationStatusComplete(statusCode)).toBeFalsy();
	});

	it("should activate ad feature for participant", () => {
		const { build, setupAccidentResponseExpansionService, notificationService } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", tmxParticipantSummary: { telematicsId: "12345" } };
		setupAccidentResponseExpansionService.activateAccidentDetectionFeature.mockReturnValue(of({}));
		component.activateAccidentDetectionFeature();
		expect(setupAccidentResponseExpansionService.activateAccidentDetectionFeature).toHaveBeenCalled();
		expect(setupAccidentResponseExpansionService.getAREParticipantSummary).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("should activate UBI feature for participant", () => {
		const { build, setupAccidentResponseExpansionService, notificationService } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", tmxParticipantSummary: { telematicsId: "12345" } };
		setupAccidentResponseExpansionService.activateUBIFeature.mockReturnValue(of({}));
		component.activateUBIFeature();
		expect(setupAccidentResponseExpansionService.activateUBIFeature).toHaveBeenCalled();
		expect(setupAccidentResponseExpansionService.getAREParticipantSummary).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("should getARESummaryActivatedValue returns Not Found", () => {
		const { build } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1" };
		expect(component.getARESummaryActivatedValue()).toEqual("Not Found");
	});

	it("should getARESummaryActivatedValue returns Yes", () => {
		const { build } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", participantSummary: { isAccidentResponseActivated: true } };
		expect(component.getARESummaryActivatedValue()).toEqual("Yes");
	});

	it("should getARESummaryActivatedValue returns No", () => {
		const { build } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", participantSummary: { isAccidentResponseActivated: false } };
		expect(component.getARESummaryActivatedValue()).toEqual("No");
	});

	it("should getUBIActivatedValue returns Not Found", () => {
		const { build } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1" };
		expect(component.getUBIActivatedValue()).toEqual("Not Found");
	});

	it("should getUBIActivatedValue returns Yes", () => {
		const { build } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", tmxParticipantSummary: { ubiActivated: true } };
		expect(component.getUBIActivatedValue()).toEqual("Yes");
	});

	it("should getUBIActivatedValue returns No", () => {
		const { build } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", tmxParticipantSummary: { ubiActivated: false } };
		expect(component.getUBIActivatedValue()).toEqual("No");
	});

	it("should getARESummaryEnrolledValue returns Not Found", () => {
		const { build } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1" };
		expect(component.getARESummaryEnrolledValue()).toEqual("Not Found");
	});

	it("should getARESummaryEnrolledValue returns Yes", () => {
		const { build } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", participantSummary: { isAccidentResponseEnrolled: true } };
		expect(component.getARESummaryEnrolledValue()).toEqual("Yes");
	});

	it("should getARESummaryEnrolledValue returns No", () => {
		const { build } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", participantSummary: { isAccidentResponseEnrolled: false } };
		expect(component.getARESummaryEnrolledValue()).toEqual("No");
	});

	it("is isChallengeCodeExpired returns true", () => {
		const { build } = setup().default();
		const component = build();
		const date = new Date();
		date.setDate(date.getDate() - 2);
		component.selectedDriver = { driverReferenceId: "1", mobileRegistrationData: { challengeExpirationDateTime: date } };
		expect(component.isChallengeCodeExpired()).toBeTruthy();
	});

	it("is isChallengeCodeExpired returns false", () => {
		const { build } = setup().default();
		const component = build();
		const date = new Date();
		date.setDate(date.getDate() + 1);
		component.selectedDriver = { driverReferenceId: "1", mobileRegistrationData: { challengeExpirationDateTime: date } };
		expect(component.isChallengeCodeExpired()).toBeFalsy();
	});

	it("is policyListHasErrors returns true", () => {
		const { build, helperService } = setup().default();
		const component = build();
		helperService.getMessage.mockReturnValue(of("Some error"));
		component.policies = [{ policyNumber: "-1", messages: { Error: "Policy Not Found" } }];
		expect(component.policyListHasErrors()).toBeTruthy();
	});

	it("is policyListHasErrors returns false", () => {
		const { build, helperService } = setup().default();
		const component = build();
		helperService.getMessage.mockReturnValue(undefined);
		component.policies = [{ policyNumber: "-1" }];
		expect(component.policyListHasErrors()).toBeFalsy();
	});

	it("is getPrimaryError returns message", () => {
		const { build, helperService } = setup().default();
		const component = build();
		component.policies = [{ policyNumber: "-1", messages: { Error: "Policy Not Found" } }];
		expect(component.getPrimaryError()).toEqual("Policy Not Found");
	});

	it("is getPrimaryError with no message returns undefined", () => {
		const { build, helperService } = setup().default();
		const component = build();
		component.policies = [{ policyNumber: "-1", messages: {} }];
		expect(component.getPrimaryError()).toEqual(undefined);
	});

	it("is getPrimaryError with no policies returns undefined", () => {
		const { build, helperService } = setup().default();
		const component = build();
		expect(component.getPrimaryError()).toEqual(undefined);
	});

	it("when openChangePhoneNumberDialog is called dialog service methods are invoked", () => {
		const { build, dialogService, notificationService, mobileRegisterService, setupAccidentResponseExpansionService } = setup().default();
		const component = build();

		component.selectedDriver = { driverReferenceId: "1", mobileRegistrationData: { mobileRegistrationSeqId: 123 } };
		dialogService.confirmed.mockReturnValue(of(true));
		component.openChangePhoneNumberDialog();
		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Update Mobile Number",
			subtitle: "Driver Reference ID 1",
			component: ChangePhoneNumberComponent,
			formModel: { phoneNumber: undefined }
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(mobileRegisterService.updateMobileNumber).toHaveBeenCalled();
		expect(setupAccidentResponseExpansionService.getAREParticipantSummary).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalledWith(`Mobile number updated successfully.`);
	});

	it("should unenroll participant with reason user initiated", () => {
		const { build, setupAccidentResponseExpansionService, notificationService } = setup().default();
		const component = build();
		component.selectedDriver = { tmxParticipantSummary: { telematicsId: "12345"} };
		component.unenrollParticipantUserInitiated();
		expect(setupAccidentResponseExpansionService.getAREParticipantSummary).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("should unenroll participant with reason non installer", () => {
		const { build, setupAccidentResponseExpansionService, notificationService } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", tmxParticipantSummary: { policyNumber: "12345678", telematicsId: "12345"} };
		component.unenrollParticipantNonInstaller();
		expect(setupAccidentResponseExpansionService.getAREParticipantSummary).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("should unenroll participant with reason non communicator", () => {
		const { build, setupAccidentResponseExpansionService, notificationService } = setup().default();
		const component = build();
		component.selectedDriver = { driverReferenceId: "1", tmxParticipantSummary: { policyNumber: "12345678", telematicsId: "12345"} };
		component.unenrollParticipantNonCommunicator();
		expect(setupAccidentResponseExpansionService.getAREParticipantSummary).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

});
