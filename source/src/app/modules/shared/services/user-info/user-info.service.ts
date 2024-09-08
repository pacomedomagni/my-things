import { BehaviorSubject, Observable } from "rxjs";
import { UntilDestroy } from "@ngneat/until-destroy";

import { ApiService } from "@modules/core/services/_index";
import { Injectable } from "@angular/core";
import { UserInfo } from "@modules/shared/data/resources";

@UntilDestroy()
@Injectable({ providedIn: "root" })
export class UserInfoService {
	private readonly controller = "/roles";

	private userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(undefined);
	userInfo$: Observable<UserInfo> = this.userInfo.asObservable();

	constructor(private api: ApiService) {

	}

	getUserInfo(): Observable<UserInfo> {
		return this.api.get<UserInfo>({ uri: `${this.controller}` });
	}

}
