import { DialogVehicleSelectionComponent } from "./dialog-vehicle-selection.component";

function setup() {
	const injectedData = {model:{selection:{externalId:"123-456-789"}}, data:[{}, {}]};

	const builder = {
		default() {
			return builder;
		},
		build() {
			const comp = new DialogVehicleSelectionComponent(injectedData);
			return comp;
		}
	};

	return builder;
}

describe("DialogVehicleSelectionComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.model).toEqual({selection:{externalId:"123-456-789"}});
		expect(component.vehicles.length).toEqual(2);
	});
});

