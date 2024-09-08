import { Injectable } from "@angular/core";
import { ApiService } from "@modules/core/services/api/api.service";
import { PolicyService } from "@modules/shared/stores/_index";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class CadService {

	private CONTROLLER = "/crashAccidentDetection";

	constructor(private api: ApiService, private policyService: PolicyService) { }

	resetEligibility(participantSeqId: number): Observable<any> {
		return this.api.post<any>({ uri: `${this.CONTROLLER}/ResetEligibility/${participantSeqId}` })
			.pipe(this.policyService.refresh());
	}
}
