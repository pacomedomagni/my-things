import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";

import { Policy } from "@modules/shared/data/resources";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { PolicySearchComponent } from "./search.component";

function setup() {
	const policyService = autoSpy(PolicyService);
	policyService.getPolicyByNumber.mockReturnValue(of([] as Policy[]));
	policyService.getPolicyByMobileRegistrationCode.mockReturnValue(of([] as Policy[]));
	const policyQuery = autoSpy(PolicyQuery);
	const builder = {
		policyService,
		policyQuery,
		default() {
			return builder;
		},
		build() {
			return new PolicySearchComponent(policyService, policyQuery);
		}
	};
	return builder;
}

describe("PolicySearchComponent", () => {
	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should default slot onInit", () => {
		const { build, policyQuery } = setup().default();
		const component = build();
		policyQuery.slot$ = of("anaconda");

		component.ngOnInit();

		expect(component.selectedSlot).toEqual("anaconda");
	});

	it("should default slot to empty onInit", () => {
		const { build, policyQuery } = setup().default();
		const component = build();
		policyQuery.slot$ = of("");

		component.ngOnInit();

		expect(component.selectedSlot).toEqual("");
	});

	it("when searchByPolicyNumber is called with valid policy number it should call policy service", () => {
		const { build, policyService } = setup().default();
		const component = build();

		component.searchByPolicyNumber("123");

		expect(policyService.getPolicyByNumber).toHaveBeenCalledWith("123");
		expect(policyService.getPolicyByNumber).toHaveBeenCalledTimes(1);
	});

	it("when searchByPolicyNumber is called with invalid policy number it should not call policy service", () => {
		const { build, policyService } = setup().default();
		const component = build();

		component.searchByPolicyNumber("");

		expect(policyService.getPolicyByNumber).toHaveBeenCalledTimes(0);
	});

	it("when searchByPhoneNumber is called with valid phone number it should call policy service", () => {
		const { build, policyService } = setup().default();
		const component = build();

		component.searchByPhoneNumber("1234567890");

		expect(policyService.getPolicyByMobileRegistrationCode).toHaveBeenCalledWith("1234567890");
		expect(policyService.getPolicyByMobileRegistrationCode).toHaveBeenCalledTimes(1);
	});

	it("when searchByPhoneNumber is called with invalid phone number it should not call policy service", () => {
		const { build, policyService } = setup().default();
		const component = build();

		component.searchByPhoneNumber("1234");

		expect(policyService.getPolicyByMobileRegistrationCode).toHaveBeenCalledTimes(0);
	});

});

