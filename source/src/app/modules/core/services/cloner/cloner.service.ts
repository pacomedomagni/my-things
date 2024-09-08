import clone from "clone";

import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ClonerService {

	deepClone(value) {
		return clone(value);
	}

}
