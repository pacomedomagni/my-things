import { DialogService } from "@modules/shared/services/_index";
import { TrialService } from "@modules/trial/services/trial.service";
import { NotificationService } from "@pgr-cla/core-ui-components";
import { autoSpy } from "autoSpy";
import { ContainerComponent } from "./container.component";

function setup() {
	const dialogService = autoSpy(DialogService);
	const notificationService = autoSpy(NotificationService);
	const trialService = autoSpy(TrialService);

	const builder = {
		default() {
			return builder;
		},
		build() {
			return new ContainerComponent(dialogService, notificationService, trialService);
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
