import { Router } from "@angular/router";
import { autoSpy } from "autoSpy";
import { WebguardSsoCallbackComponent } from "./webguard-sso-callback.component";

function setup() {
	const router = autoSpy(Router);
	const builder = {
		router,
		default() {
			return builder;
		},
		build() {
			return new WebguardSsoCallbackComponent(router);
		}
	};
	return builder;
}

describe("WebguardSsoCallbackComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
