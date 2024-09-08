import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

export interface AppState {
	appName: string;
}

export function createInitialState(): AppState {
	return {
		appName: "SmartHub"
	};
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "appConfig" })
export class AppStore extends Store<AppState> {
	constructor() {
		super(createInitialState());
		this.setLoading(false);
	}
}
