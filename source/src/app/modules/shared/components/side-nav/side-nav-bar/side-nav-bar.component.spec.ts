import { AppDataService } from "@modules/shared/services/_index";
import { autoSpy } from "autoSpy";
import { SideNavBarComponent } from "./side-nav-bar.component";

function setup() {
	const appDataService = autoSpy(AppDataService);
	const builder = {
		appDataService,
		default() {
			return builder;
		},
		build() {
			return new SideNavBarComponent(appDataService);
		}
	};

	return builder;
}

describe("SideNavBarComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
