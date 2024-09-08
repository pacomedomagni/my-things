import { Component, OnInit } from "@angular/core";
import { ApplicationGroupMetadata, ApplicationMetadata } from "@modules/shared/data/_index";
import { ApplicationTypeIds } from "@modules/shared/data/application-groups.model";
import { AppDataService } from "@modules/shared/services/_index";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "ubi-side-nav-bar",
	templateUrl: "./side-nav-bar.component.html",
	styleUrls: ["./side-nav-bar.component.scss"]
})
export class SideNavBarComponent implements OnInit {

	appGroup: ApplicationGroupMetadata;
	groupedApps: [{ appType: string; apps: ApplicationMetadata[] }];

	constructor(public appDataService: AppDataService) { }

	ngOnInit(): void {
		this.appDataService.currentAppGroup$.subscribe(x => {
			this.appGroup = x;
			this.groupedApps = undefined;
			Object.keys(ApplicationTypeIds).forEach(id => {
				const filteredApps = this.appGroup.applications.filter(y => y.typeId === id);
				if (filteredApps.length > 0) {
					const app = { appType: id, apps: filteredApps };
					if (this.groupedApps === undefined) {
						this.groupedApps = [app];
					}
					else {
						this.groupedApps.push(app);
					}
				}
			});
		});
	}
}
