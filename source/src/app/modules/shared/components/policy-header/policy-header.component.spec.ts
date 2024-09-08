import { PolicyQuery } from "@modules/shared/stores/_index";
import { autoSpy } from "autoSpy";
import { PolicyHeaderComponent } from "./policy-header.component";

function setup() {
	const policyQuery = autoSpy(PolicyQuery);
	const builder = {
		policyQuery,
		default() {
			return builder;
		},
		build() {
			return new PolicyHeaderComponent(policyQuery);
		}
	};

	return builder;
}

describe("PolicyHeaderComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
