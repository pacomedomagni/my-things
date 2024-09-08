import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { GlobalErrorState, GlobalErrorStore } from "./error.store";

@Injectable({ providedIn: "root" })
export class GlobalErrorQuery extends Query<GlobalErrorState> {
	error$ = this.selectError();

	constructor(protected store: GlobalErrorStore) {
		super(store);
	}
}
