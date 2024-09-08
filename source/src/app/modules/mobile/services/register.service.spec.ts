import { Observable, of } from "rxjs";

import { ApiService } from "@modules/core/services/_index";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { PolicyService } from "@modules/shared/stores/_index";
import { ProgramType } from "@modules/shared/data/enums";
import { autoSpy } from "autoSpy";
import { fakeAsync } from "@angular/core/testing";
import { MobileRegisterService } from "./register.service";

function setup() {
	const api = autoSpy(ApiService);
	api.post.mockReturnValue(of({}));
	api.put.mockReturnValue(of({}));

	const policyQuery = autoSpy(PolicyQuery);
	policyQuery.getActiveId = jest.fn(() => "123");
	policyQuery.getSlot = jest.fn(() => "anaconda");

	const policyService = autoSpy(PolicyService);
	policyService.getPolicyByNumber.mockReturnValue(of([]));

	const controller = "/mobileRegistration/";
	const builder = {
		api,
		controller,
		policyQuery,
		policyService,
		default() {
			return builder;
		},
		build() {
			return new MobileRegisterService(api, policyQuery, policyService);
		}
	};

	return builder;
}

describe("MobileRegisterService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	test.each([
		"Register",
		"Reset",
		"ChangeMobileNumber",
		"Unlock",
		"UpdateMobilePause"
	])
		("should call %s", fakeAsync((action) => {
			const { build, api, controller, policyQuery, policyService } = setup().default();
			const policyNumber = policyQuery.getActiveId();
			const mobileRegistrationCode = "1234567890";
			const slot = policyQuery.getSlot();
			const component = build();
			const appName = "MNA";
			let result$: Observable<any>;

			switch (action) {
				case "Register":
					result$ = component.register(mobileRegistrationCode, ProgramType.PriceModel3, "123", appName);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { mobileRegistrationCode, programType: ProgramType.PriceModel3, vehicleId: "123", appName }
					});
					break;
				case "Reset":
					result$ = component.reset(mobileRegistrationCode, 123);
					expect(api.put).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { mobileRegistrationCode, registrationSequenceId: 123 }
					});
					break;
				case "ChangeMobileNumber":
					result$ = component.updateMobileNumber(policyNumber, 123, mobileRegistrationCode);
					expect(api.put).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { policyNumber, registrationSequenceId: 123, mobileRegistrationCode }
					});
					break;
				case "Unlock":
					result$ = component.unlockDevice(policyNumber, mobileRegistrationCode, 123);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { policyNumber, mobileRegistrationCode, registrationSequenceId: 123 }
					});
					break;
				case "UpdateMobilePause":
					result$ = component.updatePause(123, true);
					expect(api.put).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { homebaseSeqId: 123, isPaused: true }
					});
					break;
			}

			result$.subscribe(() => expect(policyService.getPolicyByNumber).toHaveBeenCalledWith("123"));
		}));

});
