/* eslint-disable unused-imports/no-unused-vars */
import { InitialParticipationScoreInProcess, MobileDevice, Participant, ParticipantCalculatedValues, PhysicalDevice, Policy } from "@modules/shared/data/resources";
import {
	DeviceExperience,
	MobileRegistrationStatus,
	ParticipantReasonCode,
	ProgramType
} from "@modules/shared/data/enums";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";
import { DialogService, HelperService } from "@modules/shared/services/_index";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "@pgr-cla/core-ui-components";
import { TripService } from "@modules/trip/services/trip.service";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { DatePipe } from "@angular/common";
import { TripsHomeComponent } from "./trips-home.component";
import { DialogStageGradesComponent } from "../dialog-stage-grades/dialog-stage-grades.component";
import { DialogProcessSingleTripComponent } from "../dialog-process-single-trip/dialog-process-single-trip.component";

function setup() {
	const dialog = autoSpy(MatDialog);
	const policyQuery = autoSpy(PolicyQuery);
	policyQuery.getParticipantName.mockImplementation(x => "John Smith");
	policyQuery.workingPolicy$ = of({ participants: [mockParticipant({}), mockParticipant({})] } as Policy);

	const policyService = autoSpy(PolicyService);
	policyService.getPolicyByNumber.mockReturnValue(of());

	const tripService = autoSpy(TripService);
	tripService.getInitialParticipationScore.mockReturnValue(of({} as InitialParticipationScoreInProcess));
	tripService.updateMobileStageGrades.mockReturnValue(of({} as ParticipantCalculatedValues));
	tripService.updatePluginStageGrades.mockReturnValue(of({} as ParticipantCalculatedValues));
	tripService.runStoredTripMobile.mockReturnValue(of({} as ParticipantCalculatedValues));
	tripService.runStoredTripPlugIn.mockReturnValue(of({} as ParticipantCalculatedValues));
	tripService.runMultipleStoredTripsMobile.mockReturnValue(of({} as ParticipantCalculatedValues));
	tripService.runMultipleStoredTripsPlugIn.mockReturnValue(of({} as ParticipantCalculatedValues));
	tripService.getStageGradesValidRange.mockReturnValue(of({ minimum: 1.6, maximum: 6.25 }));
	const notificationService = autoSpy(NotificationService);
	const helperService = autoSpy(HelperService);
	const dialogService = autoSpy(DialogService);
	const datePipe = new DatePipe("en-US");

	const builder = {
		dialog,
		policyQuery,
		policyService,
		tripService,
		notificationService,
		dialogService,
		helperService,
		default() {
			return builder;
		},
		build() {
			return new TripsHomeComponent(dialog, policyQuery, policyService, tripService, notificationService, helperService, dialogService);
		}
	};

	return builder;
}

function mockParticipant(overrides: Partial<Participant> = {}): Participant {
	const base = {
		externalId: "1",
		programType: ProgramType.PriceModel3,
		mobileDetails: mockMobileDevice({}),
		enrollmentExperience: DeviceExperience.Mobile,
		sequenceId: 0,
		driver: mockDriver
	};
	return { ...base, ...overrides } as Participant;
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

describe("TripsHomeComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("when onInit is called participants should be set", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.participants.length).toEqual(2);
		expect(component.selectedParticipant.sequenceId).toEqual(0);
		expect(component.selectedParticipant.mobileDetails.id).toEqual("1");
		expect(component.selectedParticipant.mobileDetails.sequenceId).toEqual(2);
		expect(component.selectedParticipant.mobileDetails.homebaseSequenceId).toEqual(3);
	});

	it("when openStageGradesDialog for mobile participant is called dialog service methods are invoked", () => {
		const { build, dialogService, tripService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = mockParticipant();
		component.selectedParticipant.enrollmentExperience = DeviceExperience.Mobile;
		dialogService.confirmed.mockReturnValue(of({ connectedDays: 5, ubiValue: "1" }));
		component.openStageGradesDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Stage Grades",
			subtitle: "John Smith",
			component: DialogStageGradesComponent,
			componentData: { enrollmentDate: undefined, expirationDate: undefined, minimumValue: 1.6, maximumValue: 6.25 },
			formModel: { connectedDays: undefined, ubiValue: undefined }
		});

		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(tripService.updateMobileStageGrades).toHaveBeenCalled();
	});

	it("when openStageGradesDialog for plug-in participant is called dialog service methods are invoked", () => {
		const { build, dialogService, tripService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = mockParticipant({ deviceDetails: { serialNumber: "1" } as PhysicalDevice });
		component.selectedParticipant.enrollmentExperience = DeviceExperience.Device;
		dialogService.confirmed.mockReturnValue(of({ connectedDays: 5, ubiValue: "1" }));
		component.openStageGradesDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Stage Grades",
			subtitle: "John Smith<p>1</p>",
			component: DialogStageGradesComponent,
			componentData: { enrollmentDate: undefined, expirationDate: undefined, minimumValue: 1.6, maximumValue: 6.25 },
			formModel: { connectedDays: undefined, ubiValue: undefined }
		});

		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(tripService.updatePluginStageGrades).toHaveBeenCalled();
	});

	it("when updateStageGrades function is called for mobile updateMobileStageGrades should be called", () => {
		const { build, tripService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.updateStageGrades(120, 1);

		expect(tripService.updateMobileStageGrades).toHaveBeenCalledWith("1", 2, 3, 0, 120, 1.0);
	});

	it("when updateStageGrades function is called for device updatePluginStageGrades should be called", () => {
		const { build, tripService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = { sequenceId: 999, deviceDetails: { sequenceId: 1234, serialNumber: "ABC", homebaseSequenceId: 5678 } } as Participant;

		component.updateStageGrades(120, 1);

		expect(tripService.updatePluginStageGrades).toHaveBeenCalledWith("ABC", 1234, 5678, 999, 120, 1.0);
	});

	it("when updateStageGrades function is called notification service should be called with 120 connected days and 1 ubi value", () => {
		const { build, tripService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.updateStageGrades(120, 1);

		expect(notificationService.success).toHaveBeenCalledWith("Participant John Smith was staged successfully for monitoring complete w/ discount.");
	});

	it("when updateStageGrades function is called notification service should be called with 120 connected days and 7 ubi value", () => {
		const { build, tripService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.updateStageGrades(120, 7);

		expect(notificationService.success).toHaveBeenCalledWith("Participant John Smith was staged successfully for monitoring complete w/ surcharge.");
	});

	it("when updateStageGrades function is called notification service should be called with 45 connected days and 1 ubi value", () => {
		const { build, tripService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		component.updateStageGrades(45, 1);

		expect(notificationService.success).toHaveBeenCalledWith("Participant John Smith was staged successfully for continue to monitor at renewal.");
	});

	it("when updateStoredTripMobile function is called notification service should be called for single mobile trip", () => {
		const { build, tripService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		const tripDate = new Date();
		const datePipe = new DatePipe("en-US");
		component.updateStoredTripMobile(123, tripDate);

		expect(notificationService.success).toHaveBeenCalledWith("Trip successfully processed for John Smith at " + (datePipe.transform(tripDate, "MM/dd/yyyy hh:mm:ss a")));
	});

	it("when updateMultipleStoredTripsMobile function is called notification service should be called for multiple mobile trip", () => {
		const { build, tripService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		const tripDate = new Date();
		const datePipe = new DatePipe("en-US");
		component.updateMultipleStoredTripsMobile(123, tripDate);

		expect(notificationService.success).toHaveBeenCalledWith(
			`You request to have seven days of trips added for John Smith beginning at `
			+ (datePipe.transform(tripDate, "hh:mm:ss a")) + " has been submitted and should be completed in a few minutes.");
	});

	it("when openASingleTripDialog dialog for mobile participant is called dialog service methods are invoked", () => {
		const { build, dialogService, tripService, policyQuery, notificationService } = setup().default();
		policyQuery.getParticipantName.mockReturnValue("1992 Toyota Camry");
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = mockParticipant({ deviceDetails: { serialNumber: "1" } as PhysicalDevice });
		component.selectedParticipant.enrollmentExperience = DeviceExperience.Mobile;
		dialogService.confirmed.mockReturnValue(of({ tripSeqId: 1, date: new Date() }));
		tripService.runStoredTripMobile.mockReturnValue(of(true));

		component.openASingleTripDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Process a Single Trip",
			subtitle: "1992 Toyota Camry",
			component: DialogProcessSingleTripComponent,
			formModel: { tripSeqId: undefined, date: undefined, type: "mobile" }
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Process a Single Trip",
			message: `Are you sure you want to add trip for 1992 Toyota Camry? Click OK to continue.`,
			subtitle: "1992 Toyota Camry"
		});
		expect(tripService.runStoredTripMobile).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("when openASingleTripDialog dialog for non-mobile participant is called dialog service methods are invoked", () => {
		const { build, dialogService, tripService, policyQuery, notificationService } = setup().default();
		policyQuery.getParticipantName.mockReturnValue("1992 Toyota Camry");
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = mockParticipant({ deviceDetails: { serialNumber: "1" } as PhysicalDevice });
		component.selectedParticipant.mobileDetails = undefined;
		component.selectedParticipant.enrollmentExperience = DeviceExperience.Device;
		dialogService.confirmed.mockReturnValue(of({ tripSeqId: 1, date: new Date() }));
		tripService.runStoredTripPlugIn.mockReturnValue(of(true));

		component.openASingleTripDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Process a Single Trip",
			subtitle: "1992 Toyota Camry",
			component: DialogProcessSingleTripComponent,
			formModel: { tripSeqId: undefined, date: undefined, type: "plugin" }
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Process a Single Trip",
			message: `Are you sure you want to add trip for 1992 Toyota Camry? Click OK to continue.`,
			subtitle: "1992 Toyota Camry"
		});
		expect(tripService.runStoredTripPlugIn).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});

	it("when updateStoredTripPlugIn function is called notification service should be called for single plugIn trip", () => {
		const { build, tripService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		const tripDate = new Date();
		const datePipe = new DatePipe("en-US");
		component.selectedParticipant = { deviceDetails: { sim: "ABC" } } as Participant;
		component.updateStoredTripPlugIn(123, tripDate);

		expect(notificationService.success).toHaveBeenCalledWith("Trip successfully processed for John Smith at " + (datePipe.transform(tripDate, "MM/dd/yyyy hh:mm:ss a")));
	});

	it("when updateMultipleStoredTripPlugIn function is called notification service should be called for single mobile trip", () => {
		const { build, tripService, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();
		const tripDate = new Date();
		const datePipe = new DatePipe("en-US");
		component.selectedParticipant = { deviceDetails: { sim: "ABC" } } as Participant;
		component.updateMultipleStoredTripPlugIn(123, tripDate);

		expect(notificationService.success).toHaveBeenCalledWith(`You request to have seven days of trips added for John Smith beginning at `
			+ (datePipe.transform(tripDate, "hh:mm:ss a")) + " has been submitted and should be completed in a few minutes.");
	});

	describe("stage grades button eligibility", () => {

		test.each([
			{
				participant: {
					reasonCode: ParticipantReasonCode.CollectingData,
					enrollmentExperience: DeviceExperience.Mobile,
					mobileRegistrationDetails: { status: MobileRegistrationStatus.RegistrationComplete }
				} as Participant,
				shouldDisable: false
			},
			{
				participant: {
					reasonCode: ParticipantReasonCode.DeviceReplacementNeeded,
					enrollmentExperience: DeviceExperience.Mobile,
					mobileRegistrationDetails: { status: MobileRegistrationStatus.RegistrationComplete }
				} as Participant,
				shouldDisable: true
			},
			{
				participant: {
					reasonCode: ParticipantReasonCode.CollectingData,
					enrollmentExperience: DeviceExperience.Mobile,
					mobileRegistrationDetails: { status: MobileRegistrationStatus.RegistrationCompleteInProcess }
				} as Participant,
				shouldDisable: true
			},
			{
				participant: {
					reasonCode: ParticipantReasonCode.CollectingData,
					enrollmentExperience: DeviceExperience.Device,
					deviceDetails: { wirelessStatus: "Active-InVehicle" }
				} as Participant,
				shouldDisable: false
			},
			{
				participant: {
					reasonCode: ParticipantReasonCode.DeviceReplacementNeeded,
					enrollmentExperience: DeviceExperience.Device,
					deviceDetails: { wirelessStatus: "Active-InVehicle" }
				} as Participant,
				shouldDisable: true
			},
			{
				participant: {
					reasonCode: ParticipantReasonCode.CollectingData,
					enrollmentExperience: DeviceExperience.Device,
					deviceDetails: { wirelessStatus: "Invalid" }
				} as Participant,
				shouldDisable: true
			}
		])
			("check eligibility %s", (obj) => {
				const { build, tripService, notificationService } = setup().default();
				const component = build();
				component.ngOnInit();

				const disabled = component.shouldDisableStageGrades(obj.participant);

				expect(disabled).toEqual(obj.shouldDisable);
			});

	});

	describe("selected participant program 5.0+ verification check", () => {

		test.each([
			{ programType: ProgramType.PriceModel5, expected: true },
			{ programType: ProgramType.PriceModel4, expected: false },
			{ programType: ProgramType.PriceModel3, expected: false },
			{ programType: ProgramType.PriceModel2, expected: false }
		])
			("check verification %s", (data) => {
				const { build } = setup().default();
				const component = build();
				component.selectedParticipant = { programType: data.programType } as Participant;
				const result = component.is50(component.selectedParticipant);

				expect(data.expected).toEqual(result);
			});

	});

});
