import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

export interface GlobalErrorState {
	messages: string[];
}

export function createInitialState(): GlobalErrorState {
	return {
		messages: [] as string[]
	};
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "globalError" })
export class GlobalErrorStore extends Store<GlobalErrorState> {
	constructor() {
		super(createInitialState());
	}
}
