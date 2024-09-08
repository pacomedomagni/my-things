import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

import { Injectable } from "@angular/core";
import { Policy } from "@modules/shared/data/resources";

export interface PolicyState extends EntityState<Policy> {
	slot: string;
	ui: {
		policyNumber: string;
		mobileRegistrationCode: string;
	};
}

const initialState = {
	slot: "",
	ui: {
		policyNumber: "",
		mobileRegistrationCode: ""
	}
};

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "policy", idKey: "policyNumber" })
export class PolicyStore extends EntityStore<PolicyState, Policy> {
	constructor() {
		super(initialState);
	}
}
