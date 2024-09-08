import { Component, Input, OnInit } from "@angular/core";
import { MaintenanceService } from "@modules/core/services/maintenance/maintenance.service";
import { PolicyQuery } from "@modules/shared/stores/_index";

@Component({
	selector: "ubi-app-header",
	templateUrl: "./app-header.component.html",
	styleUrls: ["./app-header.component.scss"]
})
export class AppHeaderComponent implements OnInit {

	@Input() title = "";

	outageInfo = "";
	get ongoingOutage(): boolean {
		return this.outageInfo.length > 0;
	}

	constructor(public policyQuery: PolicyQuery, private maintenanceService: MaintenanceService) { }

	ngOnInit(): void {
		this.maintenanceService.getMaintenanceConfiguration().subscribe(x => {
			this.outageInfo = x.filter(y => y.configKey === "CurrentOutageInfo")[0]?.configValue;
		});
	}
}
