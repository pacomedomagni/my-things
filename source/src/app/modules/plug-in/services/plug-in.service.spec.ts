/* eslint-disable unused-imports/no-unused-vars */
import { fakeAsync } from "@angular/core/testing";
import { ApiService } from "@modules/core/services/_index";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { PlugInService } from "./plug-in.service";

function setup() {
	const api = autoSpy(ApiService);
	api.post.mockReturnValue(of({}));
	api.put.mockReturnValue(of({}));

	const policyQuery = autoSpy(PolicyQuery);
	policyQuery.getActiveId = jest.fn(() => "123");
	policyQuery.getSlot = jest.fn(() => "");

	const policyService = autoSpy(PolicyService);
	policyService.getPolicyByNumber.mockReturnValue(of([]));
	const controller = "/Device/";
	const builder = {
		api,
		controller,
		policyQuery,
		default() {
			return builder;
		},
		build() {
			return new PlugInService(api, policyQuery, policyService);
		}
	};

	return builder;

}
describe("PlugInService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	test.each([
		"AssignPlugInDevice",
		"ReturnDevice",
		"GetReturnedDevicesEligibleForReturn"
	])

		("should call %s", fakeAsync((action) => {
			const { build, api, policyQuery, controller } = setup().default();

			const policyNumber = "123";
			const deviceSerialNumber = "54321";
			const participantSequenceId = 0;
			const state = "OH";
			const slot = policyQuery.getSlot();
			const component = build();

			switch (action) {
				case "AssignPlugInDevice":
					component.assignPlugInDevice(policyNumber, participantSequenceId, state);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { policyNumber, participantSequenceId, state }
					});
					break;
				case "ReturnDevice":
					component.returnPlugInDevice(participantSequenceId, deviceSerialNumber);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action + `?participantSeqId=${participantSequenceId}&deviceSerialNumber=${deviceSerialNumber}`
					});
					break;
				case "GetReturnedDevicesEligibleForReturn":
					component.getReturnedDevices(participantSequenceId);
					expect(api.get).toHaveBeenCalledWith({
						uri: controller + action + `?participantSeqId=${participantSequenceId}`
					});
					break;
			}
		}));

});
