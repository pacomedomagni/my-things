import { DeviceExperience, MessageCode, ProgramType } from "@modules/shared/data/enums";
import { Participant, Policy } from "@modules/shared/data/resources";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QueryEntity } from "@datorama/akita";
import { map } from "rxjs/operators";
import { PolicyState, PolicyStore } from "./policy.store";

@Injectable({ providedIn: "root" })
export class PolicyQuery extends QueryEntity<PolicyState, Policy> {

	policies$ = this.selectAll();
	policyCount$ = this.selectCount();
	workingPolicy$ = this.selectActive() as Observable<Policy>;
	workingPolicyNumber$ = this.workingPolicy$.pipe(map(policy => policy?.policyNumber.toString()));

	mobileParticipants$ = this.workingPolicy$
		.pipe(map(policy => policy?.participants
			.filter(p => p.enrollmentExperience === DeviceExperience.Mobile)));
	pluginParticipants$ = this.workingPolicy$
		.pipe(map(policy => policy?.participants
			.filter(p => p.enrollmentExperience !== DeviceExperience.Mobile)));

	hasMobileParticipants$ = this.mobileParticipants$.pipe(map(participants => participants?.length > 0));
	hasPluginParticipants$ = this.pluginParticipants$.pipe(map(participants => participants?.length > 0));
	hasErrors$ = this.select(x => x.entities[-1]?.messages[MessageCode[MessageCode.Error]] !== undefined);

	selectPolicySearchTerm$ = this.select(state => state.ui.policyNumber);
	selectMobileRegistrationCodeSearchTerm$ = this.select(state => state.ui.mobileRegistrationCode);

	slot$ = this.select(x => x.slot);

	getParticipantName(participant: Participant): string {

		return participant.programType <= ProgramType.PriceModel3 || participant.mobileDetails === undefined
			|| participant.mobileDetails.alias === "" ?
			participant.vehicleDetails?.year + " " + participant.vehicleDetails?.make + " " + participant.vehicleDetails?.model :
			participant.mobileDetails.alias;
	}

	getSlot(): string {
		return this.getValue().slot;
	}

	getPrimaryError(): string {
		return this.getValue().entities[-1]?.messages[MessageCode[MessageCode.Error]];
	}

	constructor(protected store: PolicyStore) {
		super(store);
	}
}
