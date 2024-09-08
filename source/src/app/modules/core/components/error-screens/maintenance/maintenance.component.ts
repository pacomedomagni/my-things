import { Component, OnInit } from "@angular/core";
import { MaintenanceService } from "@modules/core/services/maintenance/maintenance.service";

@Component({
	selector: "ubi-maintenance",
	templateUrl: "./maintenance.component.html",
	styleUrls: ["./maintenance.component.scss"]
})
export class MaintenanceComponent implements OnInit {

	public additionalDetails = "";

	constructor(
		private maintenanceService: MaintenanceService
	) { }

	ngOnInit(): void {
		this.maintenanceService.maintenancePageObservable$.subscribe(x => { this.additionalDetails = x; });
	}
}
