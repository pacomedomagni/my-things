import { PolicyQuery } from "@modules/shared/stores/_index";

import { ApplicationGroupIds } from "@modules/shared/data/_index";
import { Component } from "@angular/core";

@Component({
	selector: "ubi-policy-header",
	templateUrl: "./policy-header.component.html",
	styleUrls: ["./policy-header.component.scss"]
})
export class PolicyHeaderComponent {

	portalLink = ApplicationGroupIds.Portal;

	constructor(public policyQuery: PolicyQuery) { }

}
