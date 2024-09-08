import { CustomerInfoComponent } from "./customer-info.component";

function setup() {
	const injectedData = {} as any;

	const builder = {
		default() {
			return builder;
		},
		build() {
			return new CustomerInfoComponent(injectedData);
		}
	};

	return builder;
}

describe("CustomerInfoComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
