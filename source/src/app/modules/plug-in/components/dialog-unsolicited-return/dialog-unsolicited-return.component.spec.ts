import { DialogUnsolicitedReturnComponent } from "./dialog-unsolicited-return.component";

function setup() {
	const injectedData = {model:{selection:"123456789"}};

	const builder = {
		default() {
			return builder;
		},
		build() {
			return new DialogUnsolicitedReturnComponent(injectedData);
		}
	};

	return builder;
}

describe("DialogUnsolicitedReturnComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.model).toEqual({selection:"123456789"});
	});
});
