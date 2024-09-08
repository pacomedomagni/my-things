import { MobileDevice, MobileDeviceRegistration, Participant, Policy, Vehicle } from "@modules/shared/data/resources";
import { DeviceExperience, MobileRegistrationStatus, ParticipantReasonCode, ProgramType } from "@modules/shared/data/enums";
import { DialogService, HelperService } from "@modules/shared/services/_index";
import { MatDialog } from "@angular/material/dialog";
import { MobileRegisterService } from "@modules/mobile/services/register.service";
import { NotificationService } from "@pgr-cla/core-ui-components";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { PolicyService } from "@modules/shared/stores/_index";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { RegisterComponent } from "./register.component";
import { ChangePhoneNumberComponent, DialogVehicleSelectionComponent } from "../_index";

function setup() {
	const helper = autoSpy(HelperService);

	const policyQuery = autoSpy(PolicyQuery);
	policyQuery.mobileParticipants$ = of([
		mockParticipant({ externalId: "1", programType: ProgramType.PriceModel3 }),
		mockParticipant({ externalId: "2", programType: ProgramType.PriceModel4 })
	]);
	policyQuery.workingPolicy$ = of({ policyNumber: "123", appName: "MNA" } as Policy);

	const policyService = autoSpy(PolicyService);
	policyService.getMobileRegistrationData.mockReturnValue(of([
		mockMobileDeviceRegistration({ participantExternalId: "1", vehicleExternalId: "1" }),
		mockMobileDeviceRegistration({ participantExternalId: "2", vehicleExternalId: "2" })
	]));

	const registerService = autoSpy(MobileRegisterService);
	registerService.register.mockReturnValue(of({} as MobileDeviceRegistration));
	registerService.reset.mockReturnValue(of({} as MobileDeviceRegistration));
	registerService.unlockDevice.mockReturnValue(of({} as MobileDeviceRegistration));
	registerService.updateMobileNumber.mockReturnValue(of({} as MobileDeviceRegistration));
	registerService.updatePause.mockReturnValue(of({}));

	const dialogService = autoSpy(DialogService);
	const notificationService = autoSpy(NotificationService);
	const dialog = autoSpy(MatDialog);
	const builder = {
		policyQuery,
		helper,
		policyService,
		dialogService,
		registerService,
		notificationService,
		default() {
			return builder;
		},
		build() {
			return new RegisterComponent(policyQuery, helper, policyService, dialogService, registerService, notificationService);
		}
	};

	return builder;
}

let mockDriver = {
	firstName: "John",
	lastName: "Smith"
};

function mockMobileDevice(overrides: Partial<MobileDevice> = {}): MobileDevice {
	const base = {
		id: "1",
		sequenceId: 2,
		homebaseSequenceId: 3
	};
	return { ...base, ...overrides } as MobileDevice;
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

function mockParticipant(overrides: Partial<Participant> = {}): Participant {
	const base = {
		externalId: "1",
		programType: ProgramType.PriceModel3,
		mobileRegistrationDetails: mockMobileDeviceRegistration({ participantExternalId: overrides.externalId ?? "1" })
	};
	return { ...base, ...overrides } as Participant;
}

function mockMobileDeviceRegistration(overrides: Partial<MobileDeviceRegistration> = {}): MobileDeviceRegistration {
	const base = {
		groupExternalId: "1",
		participantExternalId: "1",
		vehicleExternalId: "1",
		mobileRegistrationCode: "123456789",
		registrationSequenceId: 1234
	};
	return { ...base, ...overrides } as MobileDeviceRegistration;
}

describe("RegisterComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("when onInit is called mobile participants and policy number should be set", () => {
		const { build, policyService } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(policyService.getMobileRegistrationData).toHaveBeenCalledWith("123");
		expect(component.participants.length).toEqual(2);
		expect(component.selectedParticipant.mobileRegistrationCode).toEqual("123456789");
	});

	it("when openChangePhoneNumberDialog is called dialog service methods are invoked", () => {
		const { build, dialogService, notificationService, registerService, helper } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = component.participants[1];
		dialogService.confirmed.mockReturnValue(of(true));
		helper.getExtender.mockReturnValue("name");
		component.openChangePhoneNumberDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Update Mobile Number",
			subtitle: "name name",
			component: ChangePhoneNumberComponent,
			formModel: { phoneNumber: undefined }
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(registerService.updateMobileNumber).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalledWith(`Mobile number updated successfully.`);
	});

	it("when registerDevice is called with only one eligible vehicle external ID dialog service methods are invoked", () => {
		const { build, dialogService, notificationService, policyService, registerService } = setup().default();
		const component = build();
		const selectedMockParticipant = mockMobileParticipant({
			mobileRegistrationDetails: { groupExternalId: "123" } as MobileDeviceRegistration,
			vehicleDetails: {
				externalId: "123",
				model: "Toyota",
				make: "Corolla",
				year: 2000,
				seqId: 123,
				vin: "123432ab"
			} as Vehicle
		});

		component.policyQuery.workingPolicy$ = of({
			participants: [selectedMockParticipant]
		} as Policy);

		component.ngOnInit();

		component.participants = [mockMobileDeviceRegistration({ vehicleExternalId: undefined }), mockMobileDeviceRegistration({ vehicleExternalId: "1" })];
		component.selectedParticipant = mockMobileDeviceRegistration();
		dialogService.confirmed.mockReturnValue(of(true));
		policyService.getMobileData.mockReturnValue(of([selectedMockParticipant]));

		component.registerDevice(mockMobileDeviceRegistration({ vehicleExternalId: undefined }));

		expect(registerService.register).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalledWith("Registration successful.");
	});

	it("when registerDevice is called with more than one eligible vehicle external ID dialog service methods are invoked", () => {
		const { build, dialogService, notificationService, helper, policyService, registerService } = setup().default();
		const component = build();

		helper.getExtender.mockReturnValue("name");
		const selectedMockParticipant = mockMobileParticipant({
			mobileRegistrationDetails: { groupExternalId: "123" } as MobileDeviceRegistration,
			vehicleDetails: {
				externalId: "1",
				model: "Toyota",
				make: "Corolla",
				year: 2000,
				seqId: 123,
				vin: "123432ab"
			} as Vehicle
		});

		component.policyQuery.workingPolicy$ = of({ participants: [selectedMockParticipant] } as Policy);

		component.ngOnInit();
		component.participants = [mockMobileDeviceRegistration({ vehicleExternalId: undefined }), mockMobileDeviceRegistration({ vehicleExternalId: undefined })];
		component.selectedParticipant = mockMobileDeviceRegistration();
		policyService.getMobileData.mockReturnValue(of([selectedMockParticipant, selectedMockParticipant]));

		dialogService.confirmed.mockReturnValue(of({ selection: { externalId: "1" } }));
		component.registerDevice(mockMobileDeviceRegistration({ vehicleExternalId: undefined }));

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Vehicle Selection",
			subtitle: "name name",
			component: DialogVehicleSelectionComponent,
			formModel: { selection: undefined },
			componentData: [
				{
					extenders: undefined,
					externalId: "1",
					make: "Corolla",
					messages: undefined,
					model: "Toyota",
					seqId: 123,
					vin: "123432ab",
					year: 2000
				},
				{
					extenders: undefined,
					externalId: "1",
					make: "Corolla",
					messages: undefined,
					model: "Toyota",
					seqId: 123,
					vin: "123432ab",
					year: 2000
				}
			]
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(registerService.register).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalledWith("Registration successful.");
	});

	it("when unlockRegistration is called unlockDevice should be called", () => {
		const { build, registerService } = setup().default();
		const component = build();
		const registrationDetails = mockMobileDeviceRegistration();

		component.ngOnInit();
		component.unlockRegistration(registrationDetails);

		expect(registerService.unlockDevice)
			.toHaveBeenCalledWith("123", registrationDetails.mobileRegistrationCode, registrationDetails.registrationSequenceId);
	});

	it("when resetRegistration is called reset should be called", () => {
		const { build, registerService } = setup().default();
		const component = build();
		const registrationDetails = mockMobileDeviceRegistration();

		component.ngOnInit();
		component.resetRegistration(registrationDetails);

		expect(registerService.reset)
			.toHaveBeenCalledWith(registrationDetails.mobileRegistrationCode, registrationDetails.registrationSequenceId);
	});

	describe("when registerDevice is called", () => {

		test.each([ProgramType.PriceModel2, ProgramType.PriceModel4, ProgramType.PriceModel5])
			("should call register immediately when program type is %s", (programType) => {
				const { build, policyQuery, policyService, registerService } = setup().default();
				const registrationDetails = mockMobileDeviceRegistration({ participantExternalId: "1" });
				policyQuery.mobileParticipants$ = of([mockParticipant({ externalId: "1", programType })]);
				const component = build();

				component.ngOnInit();
				component.registerDevice(registrationDetails);

				expect(policyService.getMobileData).toHaveBeenCalledTimes(0);
				expect(registerService.register)
					.toHaveBeenCalledWith(registrationDetails.mobileRegistrationCode, programType, registrationDetails.vehicleExternalId, "MNA");
			});

		it("should call register immediately when program type 2 and vehicle assigned", () => {
			const { build, policyService, registerService } = setup().default();
			const component = build();
			const registrationDetails = mockMobileDeviceRegistration({ vehicleExternalId: "123" });

			component.ngOnInit();
			component.registerDevice(registrationDetails);

			expect(policyService.getMobileData).toHaveBeenCalledTimes(0);
			expect(registerService.register)
				.toHaveBeenCalledWith(registrationDetails.mobileRegistrationCode, ProgramType.PriceModel3, registrationDetails.vehicleExternalId, "MNA");
		});

		it("should register when program type 2 and only 1 unassigned vehicle available", () => {
			const { build, policyService, registerService } = setup().default();
			policyService.getMobileData.mockReturnValueOnce(of([
				{ vehicleDetails: { externalId: "2" } },
				{ vehicleDetails: { externalId: "3" } }
			] as Participant[]));
			const registrationDetails = mockMobileDeviceRegistration();
			registrationDetails.vehicleExternalId = undefined;
			const component = build();

			component.ngOnInit();
			component.registerDevice(registrationDetails);

			expect(policyService.getMobileData).toHaveBeenCalledWith("1");
			expect(registerService.register)
				.toHaveBeenCalledWith(registrationDetails.mobileRegistrationCode, ProgramType.PriceModel3, registrationDetails.vehicleExternalId, "MNA");
		});

		it("should not register when program type 2 and > 1 unassigned vehicle available", () => {
			const { build, policyService, registerService } = setup().default();
			policyService.getMobileData.mockReturnValueOnce(of([
				{ vehicleDetails: { externalId: "3" } },
				{ vehicleDetails: { externalId: "4" } }
			] as Participant[]));
			const registrationDetails = mockMobileDeviceRegistration();
			registrationDetails.vehicleExternalId = undefined;
			const component = build();

			component.ngOnInit();
			component.registerDevice(registrationDetails);

			expect(policyService.getMobileData).toHaveBeenCalledWith("1");
			expect(registerService.register).toHaveBeenCalledTimes(0);
		});
	});

	describe("describe for mobile pause", () => {
		test.each([
			{ reasonCode: ParticipantReasonCode.CollectingData, regStatus: MobileRegistrationStatus.Locked, expected: false },
			{ reasonCode: ParticipantReasonCode.CollectingData, regStatus: MobileRegistrationStatus.RegistrationComplete, expected: true }
		])
			("should display mobile pause appropriately when: %s", (data) => {
				const { build, helper } = setup().default();
				const component = build();
				component.selectedParticipant = mockMobileDeviceRegistration();
				component.selectedParticipant.status = data.regStatus;
				component["policyParticipants"] = [{ externalId: component.selectedParticipant.participantExternalId, reasonCode: data.reasonCode }] as Participant[];

				const shouldDisplay = component.shouldDisplayMobilePause(component.selectedParticipant);

				expect(shouldDisplay).toEqual(data.expected);
			});

		test.each([
			{ isPaused: false, expected: "Pause Mobile Device" },
			{ isPaused: true, expected: "Disable Mobile Device Pause" }
		])
			("should display mobile pause button label appropriately when: %s", (data) => {
				const { build, helper } = setup().default();
				const component = build();
				component.selectedParticipant = mockMobileDeviceRegistration();
				const extenders = new Map<string, any>([["IsPaused", data.isPaused]]);
				component["policyParticipants"] = [{ externalId: component.selectedParticipant.participantExternalId }] as Participant[];
				helper.getExtender.mockReturnValueOnce(data.isPaused);

				const display = component.getMobilePauseDisplay();

				expect(display).toEqual(data.expected);
			});

		test.each([
			{ isPaused: false, expected: "Your Mobile device is now paused." },
			{ isPaused: true, expected: "Pause is now removed for your Mobile device." }
		])
			("should update mobile pause appropriately when: %s", (data) => {
				const { build, helper, registerService, notificationService } = setup().default();
				const component = build();
				component.selectedParticipant = mockMobileDeviceRegistration();
				const extenders = new Map<string, any>([["IsPaused", data.isPaused]]);
				component["policyParticipants"] = [{ externalId: component.selectedParticipant.participantExternalId, mobileDetails: { homebaseSequenceId: 123 } }] as Participant[];
				helper.getExtender.mockReturnValueOnce(data.isPaused);

				component.updatePause(component.selectedParticipant);

				expect(registerService.updatePause).toHaveBeenCalledWith(123, !data.isPaused);
				expect(notificationService.success).toHaveBeenCalledWith(data.expected);
			});
	});
});
