import { Component, OnDestroy } from "@angular/core";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";
import { Router } from "@angular/router";
import { ApplicationGroupIds } from "@modules/shared/data/_index";
import { ID } from "@datorama/akita";
import { fadeAnimation } from "@modules/shared/animations";

@Component({
	selector: "ubi-policy-details",
	templateUrl: "./details.component.html",
	styleUrls: ["./details.component.scss"],
	animations: [fadeAnimation]
})
export class PolicyDetailsComponent implements OnDestroy {

	constructor(public policyQuery: PolicyQuery, private policyService: PolicyService, private router: Router) { }

	setPolicy(policyNumber: ID): void {
		this.policyService.setWorkingPolicy(policyNumber);
		this.router.navigateByUrl("/" + ApplicationGroupIds.Home);
	}

	ngOnDestroy(): void {
		this.policyService.setStoreToActiveOnly();
	}
}
