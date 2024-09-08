import { ApiService } from "@modules/core/services/_index";
import { PolicyService } from "@modules/shared/stores/_index";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { CadService } from "./cad.service";

function setup() {
	const api = autoSpy(ApiService);
	const policyService = autoSpy(PolicyService);
	api.post.mockReturnValue(of({}));

	const builder = {
		api,
		policyService,
		default() {
			return builder;
		},
		build() {
			return new CadService(api, policyService);
		}
	};

	return builder;
}

describe("CadService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});