import { PolicyQuery } from "@modules/shared/stores/_index";
import { MaintenanceService } from "@modules/core/services/maintenance/maintenance.service";
import { autoSpy } from "autoSpy";
import { AppHeaderComponent } from "./app-header.component";

function setup() {
	const policyQuery = autoSpy(PolicyQuery);
	const maintenanceService = autoSpy(MaintenanceService);
	const builder = {
		policyQuery,
		maintenanceService,
		default() {
			return builder;
		},
		build() {
			return new AppHeaderComponent(policyQuery, maintenanceService);
		}
	};

	return builder;
}

describe("AppHeaderComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
