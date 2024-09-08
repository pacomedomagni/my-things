import { ApiService } from "@modules/core/services/_index";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { AdditionalService } from "./additional.service";

function setup() {
	const api = autoSpy(ApiService);
	api.post.mockReturnValue(of({}));

	const policyQuery = autoSpy(PolicyQuery);
	const policyService = autoSpy(PolicyService);

	const mobile_controller = "/MobileRegistration";
	const plugin_controller = "/Device";
	const builder = {
		api,
		policyQuery,
		policyService,
		mobile_controller,
		plugin_controller,
		default() {
			return builder;
		},
		build() {
			return new AdditionalService(api, policyQuery, policyService);
		}
	};

	return builder;
}

describe("AdditionalService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should post the correct values to the api with changeNonInstallerDatesMobile", () => {
		const { build, api, mobile_controller } = setup().default();
		const participantSequenceId = 0;
		const policyStartDate = "2020-10-10";
		const enrollmentDate = "2020-10-10";
		const component = build();

		component.changeNonInstallerDatesMobile(participantSequenceId, policyStartDate, enrollmentDate);
		expect(api.post).toHaveBeenCalledWith({
			uri: mobile_controller + "/ChangeNonInstallerDates",
			payload: { participantSequenceId, policyStartDate, enrollmentDate }
		});
	});

	it("should post the correct values to the api with changeNonInstallerDatesPluginMobile", () => {
		const { build, api, plugin_controller } = setup().default();
		const participantSeqId = 0;
		const serialNumber = "1";
		const shipDate = "2020-10-10";
		const wirelessStatus = "Active-InVehicle";
		const component = build();

		component.changeNonInstallerDatesPlugin(participantSeqId, serialNumber, shipDate, wirelessStatus);
		expect(api.post).toHaveBeenCalledWith({
			uri: plugin_controller + "/ChangeNonInstallerDates",
			payload: { participantSeqId, serialNumber, shipDate, wirelessStatus }
		});
	});

	it("should post the correct values to the api with changeNonCommunicatorDatesMobile", () => {
		const { build, api, mobile_controller } = setup().default();
		const deviceSequenceId = 0;
		const lastContactDate = "2020-10-10";
		const lastUploadDate = "2020-10-10";
		const component = build();

		component.changeNonCommunicatorDatesMobile(deviceSequenceId, lastContactDate, lastUploadDate);
		expect(api.post).toHaveBeenCalledWith({
			uri: mobile_controller + "/ChangeNonCommunicatorDates",
			payload: { deviceSequenceId, lastContactDate, lastUploadDate }
		});
	});

	it("should post the correct value to the api with changeNonCommunicatorDatesPlugin", () => {
		const { build, api, plugin_controller } = setup().default();
		const participantSeqId = 0;
		const serialNumber = "1";
		const firstContactDate = "2020-10-10";
		const lastContactDate = "2020-10-10";
		const lastUploadDate = "2020-10-10";
		const shipDate = "2020-10-10";
		const wirelessStatus = "Active-ShippedToCustomer";
		const component = build();

		component.changeNonCommunicatorDatesPlugin(participantSeqId, serialNumber, firstContactDate, lastContactDate, lastUploadDate, shipDate, wirelessStatus);
		expect(api.post).toHaveBeenCalledWith({
			uri: plugin_controller + "/ChangeNonCommunicatorDates",
			payload: {
				participantSeqId,
				serialNumber,
				firstContactDate,
				lastContactDate,
				lastUploadDate,
				shipDate,
				wirelessStatus
			}
		});

	});

});
