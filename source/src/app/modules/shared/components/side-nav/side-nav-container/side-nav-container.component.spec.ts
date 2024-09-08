import { AppDataService } from "@modules/shared/services/_index";
import { AppQuery } from "@modules/core/stores/_index";
import { PageTitleService } from "@modules/core/services/_index";
import { Router } from "@angular/router";
import { SideSheetService } from "@pgr-cla/core-ui-components";
import { autoSpy } from "autoSpy";
import { SideNavContainerComponent } from "./side-nav-container.component";

function setup() {
	const sideSheetService = autoSpy(SideSheetService);
	const router = autoSpy(Router);
	const appQuery = autoSpy(AppQuery);
	const appDataService = autoSpy(AppDataService);
	const pageTitleService = autoSpy(PageTitleService);
	const builder = {
		sideSheetService,
		router,
		appQuery,
		appDataService,
		pageTitleService,
		default() {
			return builder;
		},
		build() {
			return new SideNavContainerComponent(sideSheetService, router, appQuery, appDataService, pageTitleService);
		}
	};

	return builder;
}

describe("SideNavContainerComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
