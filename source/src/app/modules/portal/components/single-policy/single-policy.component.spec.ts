import { Policy } from "@modules/shared/data/resources";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { SinglePolicyDetailsComponent } from "./single-policy.component";

function setup() {
	const policyQuery = autoSpy(PolicyQuery);
	policyQuery.policies$ = of([{ policyNumber: "123" }] as Policy[]);
	const builder = {
		policyQuery,
		default() {
			return builder;
		},
		build() {
			return new SinglePolicyDetailsComponent(policyQuery);
		}
	};
	return builder;
}

describe("SinglePolicyDetailsComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should set default policy onInit", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.policy.policyNumber).toEqual("123");
	});

	it("when selectPolicy is called it should emit policy number", () => {
		const { build } = setup().default();
		const component = build();
		jest.spyOn(component.policySelection, "emit");

		component.selectPolicy("456");

		expect(component.policySelection.emit).toHaveBeenCalledWith("456");
	});

});
