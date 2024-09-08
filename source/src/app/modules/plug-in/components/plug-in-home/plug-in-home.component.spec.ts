/* eslint-disable unused-imports/no-unused-vars */
import { ComponentFixture } from "@angular/core/testing";
import { DialogService, HelperService } from "@modules/shared/services/_index";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "@pgr-cla/core-ui-components";
import { PlugInService } from "@modules/plug-in/services/plug-in.service";
import { Participant, PhysicalDevice, PlugInDeviceAssignment, Policy } from "@modules/shared/data/resources";
import { ParticipantReasonCode } from "@modules/shared/data/enums";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { PlugInHomeComponent } from "./plug-in-home.component";
import { DialogReturnPluginComponent } from "../dialog-return-plugin/dialog-return-plugin.component";
import { DialogUnsolicitedReturnComponent } from "../dialog-unsolicited-return/dialog-unsolicited-return.component";

function setup() {
	const dialog = autoSpy(MatDialog);
	const policyQuery = autoSpy(PolicyQuery);
	policyQuery.getParticipantName.mockImplementation(x => "John Smith");
	policyQuery.workingPolicy$ = of({
		policyNumber: "123",
		mailingAddress: { state: "OH" },
		participants: [mockParticipant({}), mockParticipant({})]
	} as Policy);

	const plugInService = autoSpy(PlugInService);
	plugInService.getReturnedDevices.mockReturnValue(of(["1234", "3234"]));
	plugInService.assignPlugInDevice.mockReturnValue(of({ deviceSerialNumber: "123", modelYear: "2012", make: "Honda", model: "Accord" } as PlugInDeviceAssignment));
	const notificationService = autoSpy(NotificationService);
	const helperService = autoSpy(HelperService);
	const dialogService = autoSpy(DialogService);
	const builder = {
		policyQuery,
		plugInService,
		notificationService,
		dialogService,
		helperService,
		default() {
			return builder;
		},
		build() {
			return new PlugInHomeComponent(dialog, policyQuery, helperService, plugInService, dialogService, notificationService);
		}
	};

	return builder;
}

function mockParticipant(overrides: Partial<Participant> = {}): Participant {
	const base = {

		sequenceId: 0,
		deviceDetails: {}
	};
	return { ...base, ...overrides } as Participant;
}

describe("PlugInHomeComponent", () => {
	let component: PlugInHomeComponent;
	let fixture: ComponentFixture<PlugInHomeComponent>;

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("when onInit is called participants should be set", () => {
		const { build } = setup().default();
		const component = build();

		component.selectedParticipant = mockParticipant();
		jest.spyOn(component, "shouldEnableReturnButton");
		component.ngOnInit();
		expect(component.participants.length).toEqual(2);
		expect(component.selectedParticipant.sequenceId).toEqual(0);
		expect(component.state).toEqual("OH");
		expect(component.deviceSerialNumberListMap.get(component.selectedParticipant.sequenceId)).toEqual(["1234", "3234"]);
		expect(component.shouldEnableReturnButton).toHaveBeenCalled();
	});

	it("call a device assignment", () => {
		const { build, notificationService } = setup().default();
		const component = build();
		component.ngOnInit();

		component.assignPlugInDevice();
		expect(notificationService.success).toHaveBeenCalledWith("Device 123 has been assigned to 2012 Honda Accord.");
	});

	it("should disable assign plug in device button", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldDisableAssignPlugInDevice({ reasonCode: ParticipantReasonCode.ParticipantOptedOut } as Participant);
		expect(result).toBeTruthy();
	});

	it("should enable assign plug in device button for reason code 14 ", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldDisableAssignPlugInDevice({ reasonCode: ParticipantReasonCode.NeedsDeviceAssigned } as Participant);
		expect(result).toBeFalsy();
	});

	it("should enable assign plug in device button for reason code 16 ", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldDisableAssignPlugInDevice({ reasonCode: ParticipantReasonCode.DeviceReplacementNeeded } as Participant);
		expect(result).toBeFalsy();
	});

	it("when open assign plug-in dialog is called dialog service methods are invoked", () => {
		const { build, dialogService, plugInService, policyQuery } = setup().default();
		policyQuery.getParticipantName.mockReturnValue("1992 Toyota Camry");
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = mockParticipant({ deviceDetails: { serialNumber: "1" } as PhysicalDevice });
		dialogService.confirmed.mockReturnValue(of(true));
		plugInService.assignPlugInDevice.mockReturnValue(of({} as PlugInDeviceAssignment));
		plugInService.getReturnedDevices.mockReturnValue(of(["345", "1234"]));

		component.openAssignPlugInDialog();

		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Assign Plug-in Device",
			subtitle: "1992 Toyota Camry<p>1</p>",
			message: "Are you sure you want to assign a device to 1992 Toyota Camry?"
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(plugInService.assignPlugInDevice).toHaveBeenCalled();
		expect(plugInService.getReturnedDevices).toHaveBeenCalled();
		expect(component.deviceSerialNumberListMap.get(component.selectedParticipant.sequenceId)).toEqual(["345", "1234"]);
	});

	it("should enable return plug in device button with participant reason code needs device assigned and device serial number list more than 0", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldEnableReturnButton({ reasonCode: ParticipantReasonCode.NeedsDeviceAssigned } as Participant, 2);
		expect(result).toBeFalsy();
	});

	it("should enable return plug in device button with participant reason code opt out and device serial number list more than 0", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldEnableReturnButton({ reasonCode: ParticipantReasonCode.ParticipantOptedOut } as Participant, 2);
		expect(result).toBeTruthy();
	});

	it("should enable return plug in device button with participant reason code policy canceled and device serial number list more than 0 ", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldEnableReturnButton({ reasonCode: ParticipantReasonCode.PolicyCanceled } as Participant, 2);
		expect(result).toBeTruthy();
	});

	it("should enable return plug in device button with participant reason code collecting data and device serial number list more than 0", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldEnableReturnButton({ reasonCode: ParticipantReasonCode.CollectingData } as Participant, 2);
		expect(result).toBeTruthy();
	});

	it("should enable return plug in device button with participant reason code opt out and device serial number list NOT more than 0", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldEnableReturnButton({ reasonCode: ParticipantReasonCode.ParticipantOptedOut } as Participant, 0);
		expect(result).toBeFalsy();
	});

	it("should enable return plug in device button with participant reason code policy canceled and device serial number list NOT more than 0 ", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldEnableReturnButton({ reasonCode: ParticipantReasonCode.PolicyCanceled } as Participant, 0);
		expect(result).toBeFalsy();
	});

	it("should enable return plug in device button with participant reason code collecting data and device serial number list NOT more than 0", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldEnableReturnButton({ reasonCode: ParticipantReasonCode.CollectingData } as Participant, 0);
		expect(result).toBeFalsy();
	});

	it("when open return plug-in dialog is called dialog service methods are invoked", () => {
		const { build, dialogService, plugInService, policyQuery } = setup().default();
		policyQuery.getParticipantName.mockReturnValue("1992 Toyota Camry");
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = mockParticipant({ deviceDetails: { serialNumber: "1" } as PhysicalDevice });
		component.deviceSerialNumberListMap
			.set(component.selectedParticipant.sequenceId, ["345", "1234"]);
		dialogService.confirmed.mockReturnValue(of({ selection: "1234" }));
		plugInService.returnPlugInDevice.mockReturnValue(of(true));

		component.openReturnPlugInDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Return Plug-in Device",
			subtitle: "1992 Toyota Camry<p>1</p>",
			component: DialogReturnPluginComponent,
			formModel: { selection: undefined },
			componentData: [
				"345",
				"1234"
			]
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(plugInService.returnPlugInDevice).toHaveBeenCalled();
		expect(plugInService.getReturnedDevices).toHaveBeenCalled();
		expect(component.deviceSerialNumberListMap.get(component.selectedParticipant.sequenceId)).toEqual(["345"]);
	});

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should enable unsolicited device return button for reason code 11", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldDisableUnsolicitedReturn({ reasonCode: ParticipantReasonCode.CollectingData } as Participant);
		expect(result).toBeFalsy();
	});

	it("should enable unsolicited device return button for reason code != 11", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();

		const result = component.shouldDisableUnsolicitedReturn({ reasonCode: ParticipantReasonCode.ParticipantOptedOut } as Participant);
		expect(result).toBeTruthy();
	});

	it("when open unsolicited return plug-in dialog is called dialog service methods are invoked", () => {
		const { build, dialogService, plugInService, policyQuery, notificationService } = setup().default();
		policyQuery.getParticipantName.mockReturnValue("1992 Toyota Camry");
		const component = build();
		component.ngOnInit();
		component.selectedParticipant = mockParticipant({ deviceDetails: { serialNumber: "1" } as PhysicalDevice });
		component.deviceSerialNumberListMap
			.set(component.selectedParticipant.sequenceId, ["345", "1234"]);
		dialogService.confirmed.mockImplementation(({ }) => (of({ selection: "surcharge" })));
		dialogService.confirmed.mockImplementation(() => (of(true)));
		plugInService.unsolicitedDeviceReturn.mockReturnValue(of(true));

		component.openUnsolicitedReturnDialog();

		expect(dialogService.openFormDialog).toHaveBeenCalledWith({
			title: "Unsolicited Device Return",
			subtitle: "1992 Toyota Camry<p>1</p>",
			component: DialogUnsolicitedReturnComponent,
			formModel: { selection: undefined }
		});
		expect(dialogService.confirmed).toHaveBeenCalled();
		expect(dialogService.openConfirmationDialog).toHaveBeenCalledWith({
			title: "Unsolicited Device Return",
			message: `Are you sure you want to stage this participant for <br/> Unsolicited Return Within Window (No Surcharge)?`,
			subtitle: "1992 Toyota Camry<p>1</p>"
		});
		expect(plugInService.unsolicitedDeviceReturn).toHaveBeenCalled();
		expect(notificationService.success).toHaveBeenCalled();
	});
});

