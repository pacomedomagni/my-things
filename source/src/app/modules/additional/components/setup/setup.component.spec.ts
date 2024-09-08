import { MobileDevice, MobileDeviceRegistration, Participant, PhysicalDevice, Policy } from "@modules/shared/data/resources";
import { DeviceExperience, MobileRegistrationStatus, OptOutReasonCode, ParticipantReasonCode, ProgramType } from "@modules/shared/data/enums";
import { DialogService, HelperService } from "@modules/shared/services/_index";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";

import { AdditionalService } from "@modules/additional/services/additional.service";
import { MatDialog } from "@angular/material/dialog";
import { CUI_DIALOG_WIDTH, NotificationService } from "@pgr-cla/core-ui-components";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { LabelService } from "@modules/shared/services/label-service/label.service";
import { SetupComponent } from "./setup.component";
import { DialogStatusSetupComponent } from "../dialog-status-setup/dialog-status-setup.component";
import { ChangeEnrollmentDateComponent } from "../change-enrollment-date/change-enrollment-date.component";

class MockDate extends Date {
	constructor() {
		super("2020-10-20T00:00:00");
	}
}

function setup() {
	const matDialog = autoSpy(MatDialog);
	const policyQuery = autoSpy(PolicyQuery);
	const dialogService = autoSpy(DialogService);
	dialogService.confirmed.mockReturnValue(of({ isNonInstaller: true, isNonCommunicator: true, nonInstallerDays: 30, nonCommunicatorDays: 30 }));
	policyQuery.workingPolicy$ = of(mockPolicy({}));
	policyQuery.workingPolicyNumber$ = of("123");
	policyQuery.getParticipantName.mockReturnValue("1992 Toyota Camry");
	const notificationService = autoSpy(NotificationService);
	const helperService = autoSpy(HelperService);
	const additionalService = autoSpy(AdditionalService);
	const policyService = autoSpy(PolicyService);
	const labelService = autoSpy(LabelService);
	labelService.getDialogSubtitleForParticipant.mockReturnValue("1992 Toyota Camry<p>1</p>");
	labelService.getParticipantDisplayName.mockReturnValue("1992 Toyota Camry");
	additionalService.automatedOptInPlugin.mockReturnValue(of({}));
	additionalService.switchMobileToObd.mockReturnValue(of({}));
	additionalService.mobileNotFitOptOut.mockReturnValue(of({}));
	additionalService.nonCommunicatorOptOutPlugin.mockReturnValue(of({}));
	additionalService.nonInstallerOptOutPlugin.mockReturnValue(of({}));
	additionalService.nonInstallerOptOutMobile.mockReturnValue(of({}));
	additionalService.nonCommunicatorOptOutMobile.mockReturnValue(of({}));
	additionalService.changeNonInstallerDatesMobile.mockReturnValue(of({}));
	additionalService.changeNonInstallerDatesPlugin.mockReturnValue(of({}));
	additionalService.changeNonCommunicatorDatesMobile.mockReturnValue(of({}));
	additionalService.changeNonCommunicatorDatesPlugin.mockReturnValue(of({}));

	// necessary for mocking out the current date
	// @ts-ignore
	global.Date = MockDate;

	const builder = {
		matDialog,
		policyQuery,
		notificationService,
		helperService,
		additionalService,
		dialogService,
		policyService,
		default() {
			return builder;
		},
		build() {
			return new SetupComponent(matDialog, policyQuery, notificationService, helperService, additionalService, dialogService, policyService, labelService);
		}
	};

	return builder;
}

function mockPolicy(overrides: Partial<Policy> = {}): Policy {
	const base = {
		participants: [
			mockMobileParticipant({}),
			mockPluginParticipant({})
		]
	};
	return { ...base, ...overrides } as Policy;
}

function mockMobileParticipant(overrides: Partial<Participant> = {}): Participant {
	const base = {
		externalId: "1",
		programType: ProgramType.PriceModel3,
		mobileDetails: mockMobileDevice({}),
		sequenceId: 0,
		enrollmentExperience: DeviceExperience.Mobile,
		lastContactDate: new Date("2020-10-20T00:00:00"),
		lastUploadDate: new Date("2020-10-20T00:00:00"),
		policyStartDate: new Date("2020-10-20T00:00:00"),
		enrollmentDate: new Date("2020-10-20T00:00:00"),
		driver: mockDriver
	};
	return { ...base, ...overrides } as Participant;
}

function mockMobileDevice(overrides: Partial<MobileDevice> = {}): MobileDevice {
	const base = {
		id: "1",
		sequenceId: 2,
		homebaseSequenceId: 3
	};
	return { ...base, ...overrides } as MobileDevice;
}

function mockPluginParticipant(overrides: Partial<Participant> = {}): Participant {
	const base = {
		firstContactDate: new Date("2020-10-20T00:00:00"),
		lastContactDate: new Date("2020-10-20T00:00:00"),
		lastUploadDate: new Date("2020-10-20T00:00:00"),
		driver: mockDriver,
		deviceDetails: mockPluginDevice({}),
		mobileDetails: undefined,
		vehicleDetails: { year: "1992", make: "Toyota", model: "Camry" }
	};
	return { ...base, ...overrides } as Participant;
}

function mockPluginDevice(overrides: Partial<PhysicalDevice> = {}): PhysicalDevice {
	const base = {
		serialNumber: "1",
		shipDate: new Date("2020-10-20T00:00:00")
	};
	return { ...base, ...overrides } as PhysicalDevice;
}

let mockDriver = {
	firstName: "John",
	lastName: "Smith"
};

describe("SetupComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("when onInit is called participants and policy number should be set", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.participants.length).toEqual(2);
		expect(component.selectedParticipant.sequenceId).toEqual(0);
		expect(component.selectedParticipant.mobileDetails.id).toEqual("1");
		expect(component.selectedParticipant.mobileDetails.sequenceId).toEqual(2);
		expect(component.selectedParticipant.mobileDetails.homebaseSequenceId).toEqual(3);
	});

	it("when openNonInstallerSetupDialog is called dialog service methods are invoked", () => {
		const { build, dialogService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[1];
		component.openNonInstallerSetupDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Non-Installer Status Setup",
			subtitle: "1992 Toyota Camry<p>1</p>",
			component: DialogStatusSetupComponent,
			formModel: { isNonInstaller: true, isNonCommunicator: false, nonInstallerDays: undefined, nonCommunicatorDays: undefined }
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
	});

	it("when openNonCommunicatorSetupDialog is called dialog service methods are invoked", () => {
		const { build, dialogService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[1];
		component.openNonCommunicatorSetupDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Non-Communicator Status Setup",
			subtitle: "1992 Toyota Camry<p>1</p>",
			component: DialogStatusSetupComponent,
			formModel: { isNonInstaller: false, isNonCommunicator: true, nonInstallerDays: undefined, nonCommunicatorDays: undefined }
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
	});

	it("when nonInstallerOptOut on a plug-in participant is called dialog service methods are invoked", () => {
		const { build, dialogService, additionalService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[1];
		dialogService.confirmed.mockReturnValue(of(true));

		component.nonInstallerOptOut();

		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Non-Installer Stage Opt-Out",
			message: `Are you sure you want to stage Non-Installer Opt-Out?
            IMPORTANT: this is not a real-time PolicyPro transaction,\nsee WIKI instructions for actual processing times.`,
			subtitle: "1992 Toyota Camry<p>1</p>"
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(additionalService.nonInstallerOptOutPlugin).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("when nonInstallerOptOut on a mobile participant is called dialog service methods are invoked", () => {
		const { build, dialogService, additionalService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[0];
		dialogService.confirmed.mockReturnValue(of(true));

		component.nonInstallerOptOut();

		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Non-Installer Stage Opt-Out",
			message: `Are you sure you want to stage Non-Installer Opt-Out?
            IMPORTANT: this is not a real-time PolicyPro transaction,\nsee WIKI instructions for actual processing times.`,
			subtitle: "1992 Toyota Camry<p>1</p>"
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(additionalService.nonInstallerOptOutMobile).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("when nonCommunicatorOptOut on a plug-in participant is called dialog service methods are invoked", () => {
		const { build, dialogService, additionalService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[1];
		dialogService.confirmed.mockReturnValue(of(true));

		component.nonCommunicatorOptOut();

		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Non-Communicator Stage Opt-Out",
			message: `Are you sure you want to stage Non-Communicator Opt-Out?
            IMPORTANT: this is not a real-time PolicyPro transaction,\nsee WIKI instructions for actual processing times.`,
			subtitle: "1992 Toyota Camry<p>1</p>"
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(additionalService.nonCommunicatorOptOutPlugin).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("when openChangeEnrollmentDialog is called dialog service methods are invoked", () => {
		const { build, dialogService, additionalService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[1];
		dialogService.confirmed.mockReturnValue(of(true));

		component.openChangeEnrollmentDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Change Enrollment Date",
			subtitle: "1992 Toyota Camry<p>1</p>",
			component: ChangeEnrollmentDateComponent,
			formModel: { enrollmentDate: undefined }
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
	});

	it("when nonCommunicatorOptOut on a mobile participant is called dialog service methods are invoked", () => {
		const { build, dialogService, additionalService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[0];
		dialogService.confirmed.mockReturnValue(of(true));

		component.nonCommunicatorOptOut();

		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Non-Communicator Stage Opt-Out",
			message: `Are you sure you want to stage Non-Communicator Opt-Out?
            IMPORTANT: this is not a real-time PolicyPro transaction,\nsee WIKI instructions for actual processing times.`,
			subtitle: "1992 Toyota Camry<p>1</p>"
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(additionalService.nonCommunicatorOptOutMobile).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("when openOptInPluginDialog is called dialog service methods are invoked", () => {
		const { build, dialogService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[1];
		dialogService.confirmed.mockReturnValue(of(true));

		component.openOptInPluginDialog();

		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Automated Opt-in",
			message: `Are you sure you want to stage this participant as\nAutomated Opt-in?`,
			subtitle: "1992 Toyota Camry<p>1</p>"
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	function mockPolicy(overrides: Partial<Policy> = {}): Policy {
		const base = {
			participants: [
				mockMobileParticipant({})
			]
		};
		return { ...base, ...overrides } as Policy;
	}
	it("when openOptInMobileDialog is called with only one eligible vehicle external ID dialog service methods are invoked", () => {
		const { build, dialogService, notificationService, policyService } = setup().default();
		const component = build();
		const selectedMockParticipant = mockMobileParticipant({
			mobileRegistrationDetails: {
				groupExternalId: "123"
			} as MobileDeviceRegistration,
			vehicleDetails: {
				externalId: "123",
				model: "Toyota",
				make: "Corolla",
				year: 2000,
				seqId: 123,
				vin: "123432ab",
				extenders: undefined,
				messages: undefined
			}
		});

		component.policyQuery.workingPolicy$ = of({
			participants: [selectedMockParticipant],
			appName: undefined,
			createDate: undefined,
			expirationDate: undefined,
			groupExternalId: undefined,
			inceptionDate: undefined,
			mailingAddress: undefined,
			policyNumber: undefined,
			policyPeriodSeqId: undefined,
			policySeqId: undefined,
			policySystem: undefined,
			primaryContact: undefined,
			extenders: undefined,
			messages: undefined,
			areDetails: undefined,
			channelIndicator: undefined,
			policyPeriodDetails: undefined,
			snapshotDetails: undefined
		});

		component.ngOnInit();

		component.selectedParticipant = selectedMockParticipant;
		dialogService.confirmed.mockReturnValue(of(true));
		policyService.getMobileData.mockReturnValue(of([selectedMockParticipant]));

		component.openOptInMobileDialog();

		expect(dialogService.openConfirmationDialog).toHaveBeenCalled();
		expect(dialogService.confirmed).toHaveBeenCalled();
	});

	it("when openOptInMobileDialog is called with more than one eligible vehicle external ID dialog service methods are invoked", () => {
		const { build, dialogService, notificationService, policyService } = setup().default();
		const component = build();
		const selectedMockParticipant = mockMobileParticipant({
			mobileRegistrationDetails: {
				groupExternalId: "111"
			} as MobileDeviceRegistration,
			vehicleDetails: {
				externalId: "123",
				model: "Toyota",
				make: "Corolla",
				year: 2000,
				seqId: 123,
				vin: "123432ab",
				extenders: undefined,
				messages: undefined
			}
		});

		component.policyQuery.workingPolicy$ = of({
			participants: [selectedMockParticipant, selectedMockParticipant],
			appName: undefined,
			createDate: undefined,
			expirationDate: undefined,
			groupExternalId: undefined,
			inceptionDate: undefined,
			mailingAddress: undefined,
			policyNumber: undefined,
			policyPeriodSeqId: undefined,
			policySeqId: undefined,
			policySystem: undefined,
			primaryContact: undefined,
			extenders: undefined,
			messages: undefined,
			areDetails: undefined,
			channelIndicator: undefined,
			policyPeriodDetails: undefined,
			snapshotDetails: undefined
		});
		component.ngOnInit();

		component.selectedParticipant = selectedMockParticipant;
		dialogService.confirmed.mockReturnValue(of(true));
		policyService.getMobileData.mockReturnValue(of([selectedMockParticipant, selectedMockParticipant]));

		component.openOptInMobileDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalled();
		expect(dialogService.confirmed).toHaveBeenCalled();
	});

	it("openMobileNotFitDialog invokes dialog service", () => {
		const { build, dialogService, additionalService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[0];
		dialogService.confirmed.mockReturnValue(of(true));

		component.openMobileNotFitDialog();

		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Mobile Not Fit Opt-out",
			message: "Are you sure you want to stage this participant as\nMobile Not Fit Opt-out?",
			subtitle: "1992 Toyota Camry<p>1</p>"
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(additionalService.mobileNotFitOptOut).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("openMobileSwitchDialog invokes dialog service", () => {
		const { build, dialogService, additionalService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[0];
		dialogService.confirmed.mockReturnValue(of(true));

		component.openMobileSwitchDialog();

		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Switch Mobile to Plug-in",
			message: "Are you sure you want to switch this participant from Mobile to Plug-in?\nIf you do,"
				+ " you will need to assign a device through an additional process.",
			subtitle: "1992 Toyota Camry<p>1</p>",
			width: CUI_DIALOG_WIDTH.MEDIUM
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(additionalService.switchMobileToObd).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("should call changeNonInstallerDatesMobile when participant is mobile participant", () => {
		const { build, additionalService } = setup().default();
		const component = build();

		component.ngOnInit();
		component.changeNonInstallerDates(5);

		expect(additionalService.changeNonInstallerDatesMobile).toHaveBeenCalledWith(0, "2020-10-15", "2020-10-15");
	});

	it("should call changeNonInstallerDatesPlugin when participant is plugin participant", () => {
		const { build, additionalService } = setup().default();
		const component = build();

		component.ngOnInit();
		component.selectedParticipant = component.participants[1];
		component.changeNonInstallerDates(5);

		expect(additionalService.changeNonInstallerDatesPlugin).toHaveBeenCalledWith(component.selectedParticipant.sequenceId, "1", "2020-10-15", "Active-ShippedToCustomer");
	});

	it("should call changeNonCommunicatorDatesMobile when participant is mobile participant", () => {
		const { build, additionalService } = setup().default();
		const component = build();

		component.ngOnInit();
		component.changeNonCommunicatorDates(5);

		expect(additionalService.changeNonCommunicatorDatesMobile).toHaveBeenCalledWith(3, "2020-10-15", "2020-10-15");
	});

	it("should call changeNonCommunicatorDatesPlugin when participant is plugin participant", () => {
		const { build, additionalService } = setup().default();
		const component = build();

		component.ngOnInit();
		component.selectedParticipant = component.participants[1];
		component.changeNonCommunicatorDates(5);

		expect(additionalService.changeNonCommunicatorDatesPlugin).toHaveBeenCalledWith(
			component.selectedParticipant.sequenceId,
			"1",
			"2020-10-15",
			"2020-10-15",
			"2020-10-15",
			"2020-10-15",
			"Active-InVehicle");
	});

	it("should update the enrollment date when changeEnrollmentDate is called", () => {
		const { build, additionalService } = setup().default();
		const component = build();

		component.ngOnInit();
		component.changeEnrollmentDate("2020-01-01");

		expect(additionalService.changeNonInstallerDatesMobile).toHaveBeenCalledWith(0, "2020-01-01", "2020-01-01");
	});

	describe("describe for mobile switch to OBD display", () => {
		test.each([
			{ experience: DeviceExperience.Device, expected: false },
			{ program: ProgramType.PriceModel4, expected: false },
			{ status: MobileRegistrationStatus.PendingResolution, expected: false },
			{ expected: true }
		])
			("should display mobile switch to OBD button appropriately when: %s", (data) => {
				const { build } = setup().default();
				const component = build();
				component.selectedParticipant = {
					enrollmentExperience: data.experience ?? DeviceExperience.Mobile,
					programType: data.program ?? ProgramType.PriceModel3,
					mobileRegistrationDetails: { status: data.status ?? MobileRegistrationStatus.RegistrationComplete }
				} as Participant;

				const shouldDisplay = component.shouldDisplayMobileSwitch();

				expect(shouldDisplay).toEqual(data.expected);
			});
	});

	describe("describe for mobile automated opt-in display", () => {
		test.each([
			{ experience: DeviceExperience.Device, expected: false },
			{ registration: undefined, optOut: undefined, expected: false },
			{ registration: { status: MobileRegistrationStatus.NotRegistered }, optOut: undefined, expected: false },
			{ registration: undefined, optOut: { reason: OptOutReasonCode.NonInstaller }, expected: false },
			{ registration: { status: MobileRegistrationStatus.ChallengeInProcess }, optOut: { reason: OptOutReasonCode.NonInstaller }, expected: false },
			{ registration: { status: MobileRegistrationStatus.NotRegistered }, optOut: { reason: OptOutReasonCode.NonCommunicator }, expected: false },
			{ registration: { status: MobileRegistrationStatus.Authenticated }, optOut: { reason: OptOutReasonCode.NonInstaller }, externalId: "", expected: true },
			{ registration: { status: MobileRegistrationStatus.NotRegistered }, optOut: { reason: OptOutReasonCode.NonInstaller }, expected: true }
		])
			("should display mobile automated opt-in button appropriately when: %s", (data) => {
				const { build } = setup().default();
				const component = build();
				component.selectedParticipant = {
					enrollmentExperience: data.experience ?? DeviceExperience.Mobile,
					externalId: data.externalId === "" ? undefined : "1234",
					mobileRegistrationDetails: data.registration,
					optOutDetails: data.optOut,
					reasonCode: ParticipantReasonCode.ParticipantOptedOut
				} as Participant;

				const shouldDisplay = component.shouldDisplayOptInMobile();
				expect(shouldDisplay).toEqual(data.expected);
			});
	});

	describe("describe for plugin automated opt-in display", () => {
		test.each([
			{ experience: DeviceExperience.Mobile, expected: false },
			{ optOutReason: OptOutReasonCode.DriverDelete, expected: false },
			{ optOutReason: OptOutReasonCode.NonInstaller, participant: ParticipantReasonCode.ParticipantOptedOut, expected: true }

		])
			("should display plugin automated opt-in button appropriately when: %s", (data) => {
				const { build } = setup().default();
				const component = build();
				component.selectedParticipant = {
					enrollmentExperience: data.experience ?? DeviceExperience.Device,
					optOutDetails: { reason: data.optOutReason },
					reasonCode: data.participant
				} as Participant;

				const shouldDisplay = component.shouldDisplayOptInPlugin();

				expect(shouldDisplay).toEqual(data.expected);
			});
	});

	describe("describe for mobile not fit opt-out display", () => {
		test.each([
			{ experience: DeviceExperience.Device, expected: false },
			{ reason: ParticipantReasonCode.CollectingData, enrollmentDate: "", expected: false },
			{ reason: ParticipantReasonCode.CollectingData, expected: true }
		])
			("should display mobile not fit opt-out button appropriately when: %s", (data) => {
				const { build } = setup().default();
				const component = build();
				component.selectedParticipant = {
					enrollmentDate: data.enrollmentDate === "" ? undefined : new Date(),
					enrollmentExperience: data.experience ?? DeviceExperience.Mobile,
					reasonCode: data.reason
				} as Participant;

				const shouldDisplay = component.shouldDisplayMobileNotFit();

				expect(shouldDisplay).toEqual(data.expected);
			});
	});
});
