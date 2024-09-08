import { Policy } from "@modules/shared/data/resources";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { take } from "rxjs/operators";
import { MultiPolicyDetailsComponent } from "./multi-policy.component";

function setup() {
	const policyQuery = autoSpy(PolicyQuery);
	policyQuery.policies$ = of([{ policyNumber: "123" }] as Policy[]);
	const builder = {
		policyQuery,
		default() {
			return builder;
		},
		build() {
			return new MultiPolicyDetailsComponent(policyQuery);
		}
	};
	return builder;
}

describe("MultiPolicyDetailsComponent", () => {

	it("should create", () => {
		const { build, policyQuery } = setup().default();
		const component = build();
		let policies: Policy[];

		policyQuery.policies$.pipe(take(1)).subscribe(x => policies = x);

		expect(component).toBeTruthy();
		expect(component.dataSource.data).toEqual(policies);
	});

	it("when selectRow is called it should set index", () => {
		const { build } = setup().default();
		const component = build();

		component.selectRow(5);

		expect(component.selectedIndex).toEqual(5);
	});

	it("should have the correct displayed columns", () => {
		const { build } = setup().default();
		const component = build();

		expect(component.displayedColumns).toEqual(["policyNumber", "pni", "participantStatus", "mobileStatus", "select"]);
	});

	it("when selectPolicy is called it should emit policy number", () => {
		const { build } = setup().default();
		const component = build();
		jest.spyOn(component.policySelection, "emit");

		component.selectPolicy("456");

		expect(component.policySelection.emit).toHaveBeenCalledWith("456");
	});

});
