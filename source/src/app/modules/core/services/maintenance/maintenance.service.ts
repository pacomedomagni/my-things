import { MaintenanceConfiguration } from "@modules/shared/data/resources";

import { ApiService } from "@modules/core/services/_index";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class MaintenanceService {

	private CONTROLLER = "/Config";
	private _maintenancePageRequested: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
	maintenancePageObservable$ = this._maintenancePageRequested.asObservable();

	constructor(
		private api: ApiService) { }

	getMaintenanceConfiguration(): Observable<MaintenanceConfiguration[]> {
		return this.api.get<MaintenanceConfiguration[]>({ uri: `${this.CONTROLLER}/MaintenanceConfiguration` });
	}

	emit(data: string): void {
		this._maintenancePageRequested.next(data);
	}
}
