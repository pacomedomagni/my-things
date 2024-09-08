import { HelperService } from "./helper.service";

function setup() {
	const builder = {
		default() {
			return builder;
		},
		build() {
			return new HelperService();
		}
	};

	return builder;
}

describe("HelperService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
