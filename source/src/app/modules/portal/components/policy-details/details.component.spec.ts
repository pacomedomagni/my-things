import { ApplicationGroupIds } from "@modules/shared/data/_index";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";
import { Router } from "@angular/router";
import { autoSpy } from "autoSpy";
import { PolicyDetailsComponent } from "./details.component";

function setup() {
	const policyQuery = autoSpy(PolicyQuery);
	const policyService = autoSpy(PolicyService);
	const router = autoSpy(Router);
	const builder = {
		policyQuery,
		policyService,
		router,
		default() {
			return builder;
		},
		build() {
			return new PolicyDetailsComponent(policyQuery, policyService, router);
		}
	};

	return builder;
}

describe("PolicyDetailsComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("when setPolicy is called it should set working policy and navigate to home", () => {
		const { build, policyService, router } = setup().default();
		const component = build();

		component.setPolicy("123");

		expect(policyService.setWorkingPolicy).toHaveBeenCalledWith("123");
		expect(router.navigateByUrl).toHaveBeenCalledWith("/" + ApplicationGroupIds.Home);
	});

	it("when ngOnDestroy is called it should", () => {
		const { build, policyService } = setup().default();
		const component = build();

		component.ngOnDestroy();

		expect(policyService.setStoreToActiveOnly).toHaveBeenCalled();
	});

});
