import { MobileDeviceRegistration } from "@modules/shared/data/resources";
import { ProgramType } from "@modules/shared/data/enums";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";

import { ApiService } from "@modules/core/services/_index";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class MobileRegisterService {

	private CONTROLLER = "/mobileRegistration";

	constructor(
		private api: ApiService,
		private policyQuery: PolicyQuery,
		private policyService: PolicyService) { }

	register(mobileRegistrationCode: string, programType: ProgramType, vehicleId: string, appName: string): Observable<MobileDeviceRegistration> {
		return this.api.post<MobileDeviceRegistration>({
			uri: `${this.CONTROLLER}/Register`,
			payload: { mobileRegistrationCode, programType, vehicleId, appName }
		}).pipe(
			tap(_ => this.updateRegistration())
		);
	}

	reset(mobileRegistrationCode: string, registrationSequenceId: number): Observable<MobileDeviceRegistration> {
		return this.api.put<MobileDeviceRegistration>({
			uri: `${this.CONTROLLER}/Reset`,
			payload: { mobileRegistrationCode, registrationSequenceId }
		}).pipe(
			tap(_ => this.updateRegistration())
		);
	}

	updateMobileNumber(policyNumber: string, registrationSequenceId: number, mobileRegistrationCode: string): Observable<any> {
		return this.api.put<any>({
			uri: `${this.CONTROLLER}/ChangeMobileNumber`,
			payload: { policyNumber, registrationSequenceId, mobileRegistrationCode }
		}).pipe(
			tap(_ => this.updateRegistration())
		);
	}

	unlockDevice(policyNumber: string, mobileRegistrationCode: string, registrationSequenceId: number): Observable<MobileDeviceRegistration> {
		return this.api.post<MobileDeviceRegistration>({
			uri: `${this.CONTROLLER}/Unlock`,
			payload: { policyNumber, mobileRegistrationCode, registrationSequenceId }
		}).pipe(
			tap(_ => this.updateRegistration())
		);
	}

	generateMobileNumber(): Observable<string> {
		return this.api.get<string>({ uri: `${this.CONTROLLER}/GenerateMobileNumber` });
	}

	updatePause(homebaseSeqId: number, isPaused: boolean): Observable<any> {
		return this.api.put<any>({
			uri: `${this.CONTROLLER}/UpdateMobilePause`,
			payload: { homebaseSeqId, isPaused }
		}).pipe(
			tap(_ => this.updateRegistration())
		);
	}

	private updateRegistration(): void {
		const policyNumber = this.policyQuery.getActiveId() as string;
		this.policyService.getPolicyByNumber(policyNumber).subscribe();
	}
}
