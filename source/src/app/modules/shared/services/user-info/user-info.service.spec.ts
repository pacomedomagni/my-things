import { ApiService } from "@modules/core/services/_index";
import { autoSpy } from "autoSpy";
import { UserInfoService } from "./user-info.service";

function setup() {
	const api = autoSpy(ApiService);
	const builder = {
		api,
		default() {
			return builder;
		},
		build() {
			return new UserInfoService(api);
		}
	};

	return builder;
}

describe("UserInfoService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
