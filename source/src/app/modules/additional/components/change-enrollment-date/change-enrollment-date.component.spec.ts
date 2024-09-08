import { ChangeEnrollmentDateComponent } from "./change-enrollment-date.component";

function setup() {
	const injectedData = { model:{enrollmentDate: "2020-10-10"} };
	const builder = {
		default() {
			return builder;
		},
		build() {
			const comp = new ChangeEnrollmentDateComponent(injectedData);
			return comp;
		}
	};

	return builder;
}

describe("ChangeEnrollmentDateComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.model.enrollmentDate).toEqual("2020-10-10");
	});
});
