import { MaintenanceService } from "@modules/core/services/maintenance/maintenance.service";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { MaintenanceComponent } from "./maintenance.component";

function setup() {
	const maintenanceService = autoSpy(MaintenanceService);
	const builder = {
		maintenanceService,
		default() {
			return builder;
		},
		build() {
			return new MaintenanceComponent(maintenanceService);
		}
	};
	return builder;
}

describe("MaintenanceComponent", () => {

	it("should create", () => {
		const { build, maintenanceService } = setup().default();
		const component = build();
		maintenanceService.maintenancePageObservable$ = of("information");
		component.ngOnInit();

		expect(component.additionalDetails).toEqual("information");

	});

});