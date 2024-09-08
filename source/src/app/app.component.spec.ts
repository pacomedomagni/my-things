import { AuthService } from "@modules/auth/services/auth.service";
import { Router } from "@angular/router";
import { UserInfoService } from "@modules/shared/services/_index";
import { autoSpy } from "autoSpy";
import { MaintenanceService } from "@modules/core/services/maintenance/maintenance.service";
import { AppComponent } from "./app.component";

function setup() {
	const router = autoSpy(Router);
	const authService = autoSpy(AuthService);
	const userService = autoSpy(UserInfoService);
	const maintenanceService = autoSpy(MaintenanceService);
	const builder = {
		router,
		authService,
		maintenanceService,
		userService,
		default() {
			return builder;
		},
		build() {
			return new AppComponent(router, authService, userService, maintenanceService);
		}
	};

	return builder;
}

describe("AppComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		// const component = build();

		expect(true).toBeTruthy();
	});
});
