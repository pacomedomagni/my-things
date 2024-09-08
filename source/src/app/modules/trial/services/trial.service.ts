import { ApiService } from "@modules/core/services/_index";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TrialCustomer } from "@modules/shared/data/resources";
import { EDAQTrialVendor, ExpressTrialVendor } from "@modules/shared/data/enums";

@Injectable({ providedIn: "root" })
export class TrialService {

	private CONTROLLER = "/automation";

	constructor(private api: ApiService) { }

	setupExpressTrialParticipant(state: string, vendor: ExpressTrialVendor | EDAQTrialVendor): Observable<TrialCustomer> {
		return this.api.post<TrialCustomer>({ uri: `${this.CONTROLLER}/trialSetup/${vendor}/${state}` });
	}
}
