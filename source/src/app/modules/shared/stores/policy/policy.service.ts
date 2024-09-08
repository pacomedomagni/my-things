import { MobileDeviceRegistration, Participant, Policy, PolicyPeriod } from "@modules/shared/data/resources";
import { MessageCode } from "@modules/shared/data/enums";
import { concatMap, map, tap } from "rxjs/operators";
import { ApiOptions } from "@modules/core/services/api/api.service";
import { ApiService } from "@modules/core/services/_index";
import { HelperService } from "@modules/shared/services/_index";
import { ID } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { Observable, OperatorFunction } from "rxjs";
import { ConfigurationSettings } from "@modules/core/services/configuration/config-info";
import { PolicyQuery } from "./policy-query";
import { PolicyStore } from "./policy.store";

@Injectable({ providedIn: "root" })
export class PolicyService {

	constructor(
		private api: ApiService,
		private store: PolicyStore,
		private query: PolicyQuery,
		private helper: HelperService) { }

	getPolicyByNumber(policyNumber: string, options?: ApiOptions): Observable<Policy[]> {
		this.store.update({ ui: { policyNumber, mobileRegistrationCode: "" } });
		return this.api.get<Policy>({ uri: `/policy/bypolicynumber/${policyNumber}`, options }).pipe(
			map(policy => [policy]),
			tap(data => this.updatePolicyStore(data))
		);
	}

	getPolicyByMobileRegistrationCode(mobileRegistrationCode: string): Observable<Policy[]> {
		this.store.update({ ui: { policyNumber: "", mobileRegistrationCode } });
		return this.api.get<Policy[]>({ uri: `/policy/bymobileRegistrationCode/${mobileRegistrationCode}` }).pipe(
			tap(data => this.updatePolicyStore(data))
		);
	}

	getMobileRegistrationData(policyNumber: string): Observable<MobileDeviceRegistration[]> {
		return this.api.get<MobileDeviceRegistration[]>({ uri: `/policy/mobileRegistrations/${policyNumber}` });
	}

	getPolicyPeriods(policyNumber: string): Observable<PolicyPeriod[]> {
		return this.api.get<PolicyPeriod[]>({ uri: `/policy/policyPeriods/${policyNumber}` });
	}

	getMobileData(groupExternalId: string): Observable<Participant[]> {
		return this.api.get<Participant[]>({ uri: `/policy/mobileData/${groupExternalId}` });
	}

	updatePolicyStore(data: Policy[]): void {
		if (this.helper.getMessage(data[0], MessageCode.Error)) {
			const activePolicy = this.query.getActive() as Policy;
			if (activePolicy !== undefined) {
				data.push(activePolicy);
			}
			this.store.set(data);
			if (activePolicy !== undefined) {
				this.store.setActive(data[1].policyNumber);
			}
		}
		else {
			this.store.set(data);
		}
	}

	setWorkingPolicy(policyNumber: ID): void {
		this.store.setActive(policyNumber);
		const policy = this.query.getActive() as Policy;
		if (policy.mailingAddress == null) {
			this.getPolicyByNumber(policyNumber.toString()).subscribe();
			this.store.setActive(policyNumber);
		}
		else {
			this.store.set([policy]);
		}
	}

	setSlot(slot: string): void {
		this.store.update({ slot });
		ConfigurationSettings.appSettings.connections.slot = slot;
	}

	setStoreToActiveOnly(): void {
		const policy = this.query.getActive() as Policy;
		if (policy) {
			this.store.set([policy]);
			this.store.setActive(policy.policyNumber);
		}
	}

	updateMobileNumber(participantId: string, mobileNumber: string): void {
		const policy = structuredClone(this.query.getActive()) as Policy;
		policy.participants.find(x => x.id === participantId).mobileDetails.phoneNumber = mobileNumber;
		this.store.update(policy.policyNumber, policy);
	}

	refresh(): OperatorFunction<any, any> {
		const policyNumber = this.query.getActiveId() as string;
		return concatMap(x => this.getPolicyByNumber(policyNumber).pipe(map(_ => x)));
	}
}
