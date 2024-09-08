import { AreMultiPolicyDetailsComponent } from "./multi-policy.component";

function setup() {
	const builder = {
		default() {
			return builder;
		},
		build() {
			return new AreMultiPolicyDetailsComponent();
		}
	};
	return builder;
}

describe("AreMultiPolicyDetailsComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();
		expect(component).toBeTruthy();
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

		expect(component.displayedColumns).toEqual(["policyNumber", "mobileStatus"]);
	});

	it("when selectPolicy is called it should emit policy number", () => {
		const { build } = setup().default();
		const component = build();
		jest.spyOn(component.policySelection, "emit");

		component.selectPolicy("456");

		expect(component.policySelection.emit).toHaveBeenCalledWith("456");
	});

});
