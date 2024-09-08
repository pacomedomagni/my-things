import { VehicleSelectionComponent } from "./vehicle-selection.component";

function setup() {
	const injectedData = { model:{}, vehicles:[{}, {}]};

	const builder = {
		default() {
			return builder;
		},
		build() {
			return new VehicleSelectionComponent(injectedData);
		}
	};

	return builder;
}

describe("VehicleSelectionComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.model).toEqual({});
		expect(component.vehicles.length).toEqual(2);
	});

});
