import { CadService } from "@modules/cad/services/cad.service";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { NotificationService } from "@pgr-cla/core-ui-components";
import { autoSpy } from "autoSpy";

import { HomeComponent } from "./home.component";

function setup() {
	const policyQuery = autoSpy(PolicyQuery);
	const cadService = autoSpy(CadService);
	const notificationService = autoSpy(NotificationService);
	const builder = {
		policyQuery,
		cadService,
		notificationService,
		default() {
			return builder;
		},
		build() {
			return new HomeComponent(policyQuery, cadService, notificationService);
		}
	};
	return builder;
}

describe("HomeComponent", () => {
	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});

