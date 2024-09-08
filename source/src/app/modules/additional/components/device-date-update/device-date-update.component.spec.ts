import { DeviceDateUpdateComponent } from "./device-date-update.component";

function setup() {
	const injectedData = {};
	const builder = {
		default() {
			return builder;
		},
		build() {
			const comp = new DeviceDateUpdateComponent(injectedData);
			return comp;
		}
	};

	return builder;
}

describe("DeviceDateUpdateComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component).toBeTruthy();
	});
});
