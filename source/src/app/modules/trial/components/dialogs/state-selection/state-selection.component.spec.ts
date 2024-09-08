import { StateSelectionComponent } from "./state-selection.component";

function setup() {
	const injectedData = {} as any;

	const builder = {
		default() {
			return builder;
		},
		build() {
			return new StateSelectionComponent(injectedData);
		}
	};

	return builder;
}

describe("StateSelectionComponentComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
