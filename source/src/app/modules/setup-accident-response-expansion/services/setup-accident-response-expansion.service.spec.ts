import { Observable, of } from "rxjs";

import { ApiService } from "@modules/core/services/_index";
import { autoSpy } from "autoSpy";
import { fakeAsync } from "@angular/core/testing";
import { SetupAccidentResponseExpansionService } from "./setup-accident-response-expansion.service";

function setup() {
	const api = autoSpy(ApiService);
	api.post.mockReturnValue(of({}));
	api.put.mockReturnValue(of({}));
	api.get.mockReturnValue(of({}));

	const controller = "/accidentDetection/";
	const builder = {
		api,
		controller,
		default() {
			return builder;
		},
		build() {
			return new SetupAccidentResponseExpansionService(api);
		}
	};

	return builder;
}

describe("Accident Detection Service", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	test.each([
		"GetEligibilityStatusOfParticipants",
		"EnrollParticipant",
		"GetAREParticipantSummary",
		"UserInitiatedOptout",
		"NonInstallerOptOut",
		"NonCommunicatorOptOut"
	])
		("should call %s", fakeAsync((action) => {
			const { build, api, controller } = setup().default();
			const policyNumber = "123456789";
			const phoneNumber = "4402321122";
			const driverReferenceId = "27";
			const telematicsId = "123456789";
			const component = build();
			let result$: Observable<any>;

			switch (action) {
				case "GetEligibilityStatusOfParticipants":
					result$ = component.getEligibilityStatusOfParticipants(policyNumber);
					expect(api.get).toHaveBeenCalledWith({
						uri: controller + action + `?policyNumber=${policyNumber}`
					});
					break;
				case "GetAREParticipantSummary":
					result$ = component.getAREParticipantSummary(policyNumber);
					expect(api.get).toHaveBeenCalledWith({
						uri: controller + action + `?policyNumber=${policyNumber}`
					});
					break;
				case "EnrollParticipant":
					result$ = component.enrollParticipant(policyNumber, driverReferenceId, phoneNumber);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action + `?policyNumber=${policyNumber}&driverReferenceId=${driverReferenceId}&phoneNumber=${phoneNumber}`
					});
					break;
				case "UserInitiatedOptout":
					result$ = component.unenrollParticipantUserInitiated(telematicsId);
					expect(api.patch).toHaveBeenCalledWith({
						uri: controller + action,
						payload: {
							telematicsId: telematicsId
						}
					});
					break;
				case "NonInstallerOptOut":
					result$ = component.unenrollParticipantNonInstaller(telematicsId, policyNumber, driverReferenceId);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: {
							telematicsId: telematicsId,
							policyNumber: policyNumber,
							driverReferenceId: driverReferenceId
						}
					});
					break;
				case "NonCommunicatorOptOut":
					result$ = component.unenrollParticipantNonCommunicator(telematicsId, policyNumber, driverReferenceId);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: {
							telematicsId: telematicsId,
							policyNumber: policyNumber,
							driverReferenceId: driverReferenceId
						}
					});
					break;
			}
		}));

});
