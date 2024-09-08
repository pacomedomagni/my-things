import { Event, Router } from "@angular/router";

import { PageTitleService } from "@modules/core/services/_index";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { AppDataService } from "./app-data.service";

function setup() {
	const document = autoSpy(Document);
	const router = autoSpy(Router);
	Object.defineProperty(router, "events", { value: of([] as Event[]) });
	const pageTitleService = autoSpy(PageTitleService);
	const builder = {
		document,
		router,
		pageTitleService,
		default() {
			return builder;
		},
		build() {
			return new AppDataService(document, router, pageTitleService);
		}
	};

	return builder;
}

describe("AppDataService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});

