import { ApiProgressService } from "@modules/core/services/api-progress/api-progress.service";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { PlugInDeviceAssignment } from "@modules/shared/data/resources";

@Injectable({ providedIn: "root" })
export class FulfillmentService {

	private CONTROLLER = "/Device";

	constructor(private api: ApiProgressService) { }

	assignDevices(date: Date): Observable<any[]> {
		return this.api.postAsync<any[]>({
			uri: `${this.CONTROLLER}/DevicesNeedingAssignment`,
			payload: date
		})
			.pipe(tap(event => {
			}));
	}

	assignPlugInDevice(
		policyNumber: string,
		participantSequenceId: number,
		state: string): Observable<PlugInDeviceAssignment> {
		return this.api.post<PlugInDeviceAssignment>({
			uri: `${this.CONTROLLER}/AssignPlugInDevice`,
			payload: { policyNumber, participantSequenceId, state }
		});
	}
}
