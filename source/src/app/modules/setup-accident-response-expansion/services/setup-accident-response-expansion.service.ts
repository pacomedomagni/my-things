import { Policy, ADEEligibilityResponse, AREParticipantSummaryResponse } from "@modules/shared/data/resources";
import { ApiService } from "@modules/core/services/_index";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SetupAccidentResponseExpansionService {

	private CONTROLLER = "/accidentDetection";

	constructor(
		private api: ApiService) { }

	getEligibilityStatusOfParticipants(policyNumber: string): Observable<ADEEligibilityResponse> {
		return this.api.get<ADEEligibilityResponse>({ uri: `${this.CONTROLLER}/GetEligibilityStatusOfParticipants?policyNumber=${policyNumber}` });
	}

	getAREParticipantSummary(policyNumber: string): Observable<AREParticipantSummaryResponse> {
		return this.api.get<AREParticipantSummaryResponse>({ uri: `${this.CONTROLLER}/GetAREParticipantSummary?policyNumber=${policyNumber}` });
	}

	enrollParticipant(policyNumber: string, driverReferenceId: string, phoneNumber: string): any {
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/EnrollParticipant?policyNumber=${policyNumber}&driverReferenceId=${driverReferenceId}&phoneNumber=${phoneNumber}`
		});
	}

	registerParticipant(policyNumber: string, driverReferenceId: string): any {
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/RegisterParticipant`,
			payload: { policyNumber, driverReferenceId }
		});
	}

	activateAccidentDetectionFeature(telematicsId: string): any {
		return this.api.post({
			uri: `${this.CONTROLLER}/ActivateAccidentDetectionFeature?telematicsId=${telematicsId}`
		});
	}

	activateUBIFeature(telematicsId: string): any {
		return this.api.post({
			uri: `/policy/ActivateUBIFeature?telematicsId=${telematicsId}`
		});
	}

	getPolicyByMobileRegistrationCode(mobileRegistrationCode: string): Observable<Policy[]> {
		return this.api.get<Policy[]>({ uri: `/policy/ByAreMobileRegistrationCode/${mobileRegistrationCode}` });
	}

	unenrollParticipantUserInitiated(telematicsId: string): any {
		let requestPayload = {
			telematicsId: telematicsId
		};
		return this.api.patch<any>({
			uri: `${this.CONTROLLER}/UserInitiatedOptout`,
			payload: requestPayload
		});
	}

	unenrollParticipantNonInstaller(telematicsId: string, policyNumber: string, driverReferenceId: string): any {
		let requestPayload = {
			telematicsId: telematicsId,
			policyNumber: policyNumber,
			driverReferenceId: driverReferenceId
		};
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/NonInstallerOptOut`,
			payload: requestPayload
		});
	}

	unenrollParticipantNonCommunicator(telematicsId: string, policyNumber: string, driverReferenceId: string): any {
		let requestPayload = {
			telematicsId: telematicsId,
			policyNumber: policyNumber,
			driverReferenceId: driverReferenceId
		};
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/NonCommunicatorOptOut`,
			payload: requestPayload
		});
	}
}
