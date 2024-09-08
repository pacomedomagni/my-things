import { Component, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";

@Component({
	selector: "ubi-policy-search",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.scss"]
})
export class PolicySearchComponent implements OnInit {

	phoneNumber: string;
	selectedSlot = "";

	slots: string[] = [
		"Anaconda",
		"Beast",
		"Clipper",
		"Dragon",
		"Gemini",
		"Magnum",
		"Raptor",
		"Volcano"
	];

	constructor(private policyService: PolicyService, private policyQuery: PolicyQuery) { }

	ngOnInit(): void {
		this.policyQuery.slot$.subscribe(x => this.selectedSlot = x);
	}

	searchByPolicyNumber(policyNumber: string): void {
		if (policyNumber?.length > 0) {
			this.policyService.getPolicyByNumber(policyNumber).subscribe();
		}
	}

	searchByPhoneNumber(phoneNumber: string): void {
		if (phoneNumber?.length === 10) {
			this.policyService.getPolicyByMobileRegistrationCode(phoneNumber).subscribe();
		}
	}

	onSlotValueChanged(changeEvent: MatSelectChange): void {
		this.policyService.setSlot(changeEvent.value === undefined ? "" : changeEvent.value);
	}
}
