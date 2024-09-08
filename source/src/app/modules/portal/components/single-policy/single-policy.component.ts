import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { ID } from "@datorama/akita";
import { Policy } from "@modules/shared/data/resources";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy({ checkProperties: true })
@Component({
	selector: "ubi-single-policy-details",
	templateUrl: "./single-policy.component.html",
	styleUrls: ["./single-policy.component.scss"]
})
export class SinglePolicyDetailsComponent implements OnInit {

	policy: Policy;

	@Output() policySelection: EventEmitter<ID> = new EventEmitter();

	constructor(private policyQuery: PolicyQuery) { }

	ngOnInit(): void {
		this.policyQuery.policies$.subscribe(x => this.policy = x[0]);
	}

	selectPolicy(policyNumber: ID): void {
		this.policySelection.emit(policyNumber);
	}
}
