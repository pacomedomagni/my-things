import { ApplicationGroupIds, ApplicationGroupMetadata, applicationGroups } from "@modules/shared/data/_index";

import { Component } from "@angular/core";
import { ParticipantGuard } from "@modules/shared/guards/_index";

@Component({
	selector: "ubi-home-container",
	templateUrl: "./container.component.html",
	styleUrls: ["./container.component.scss"]
})
export class HomeContainerComponent {

	apps = applicationGroups;

	constructor(private routeGuard: ParticipantGuard) { }

	shouldDisplay(app: ApplicationGroupMetadata): boolean {
		return app.isProdReady &&
			!([ApplicationGroupIds.Home,
			ApplicationGroupIds.Fulfillment,
			ApplicationGroupIds.SetupAccidentResponseExpansion,
			ApplicationGroupIds.Trial,
			ApplicationGroupIds.CodeViewer,
			ApplicationGroupIds.TelematicsPortal
			].indexOf(app.id) > -1) &&
			this.routeGuard.canDisplayNavLink(app.routeGuard);
	}

}

