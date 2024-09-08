import { fakeAsync } from "@angular/core/testing";
import { ApiService } from "@modules/core/services/_index";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { MaintenanceService } from "./maintenance.service";

function setup() {
	const api = autoSpy(ApiService);
	api.get.mockReturnValue(of([{}, {}]));

	const controller = "/Config/";
	const builder = {
		api,
		controller,
		MaintenanceService,
		default() {
			return builder;
		},
		build() {
			return new MaintenanceService(api);
		}
	};

	return builder;

}
describe("MaintenanceService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	test.each([
		"MaintenanceConfiguration"
	])

		("should call %s", fakeAsync((action) => {
			const { build, api, controller } = setup().default();

			const component = build();

			switch (action) {
				case "MaintenanceConfiguration":
					component.getMaintenanceConfiguration();
					expect(api.get).toHaveBeenCalledWith({ uri: controller + action });
					break;
			}
		}));

});