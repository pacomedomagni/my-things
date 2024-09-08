import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { AppState, AppStore } from "./app.store";

@Injectable({ providedIn: "root" })
export class AppQuery extends Query<AppState> {
	isLoading$ = this.selectLoading();
	error$ = this.selectError();

	get appName(): string {
		return this.getValue().appName;
	}

	constructor(protected store: AppStore) {
		super(store);
	}
}
