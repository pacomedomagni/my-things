import { NotificationService } from "@pgr-cla/core-ui-components";
import { autoSpy } from "autoSpy";
import { FulfillmentService } from "@modules/fulfillment/services/fulfillment.service";
import { PlugInService } from "@modules/plug-in/services/plug-in.service";
import { DialogService } from "@modules/shared/services/_index";
import { ContainerComponent } from "./container.component";

function setup() {
	const fulfillmentService = autoSpy(FulfillmentService);
	const notificationService = autoSpy(NotificationService);
	const plugInService = autoSpy(PlugInService);
	const dialogService = autoSpy(DialogService);

	const builder = {
		default() {
			return builder;
		},
		build() {
			return new ContainerComponent(notificationService,
				fulfillmentService,
				plugInService,
				dialogService
			);
		}
	};

	return builder;
}

describe("ContainerComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
