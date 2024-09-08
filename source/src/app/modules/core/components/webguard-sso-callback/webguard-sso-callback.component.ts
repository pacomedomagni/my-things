import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "ubi-webguard-sso-callback",
	templateUrl: "./webguard-sso-callback.component.html",
	styleUrls: ["./webguard-sso-callback.component.scss"]
})
export class WebguardSsoCallbackComponent implements AfterViewInit {

	constructor(router: Router) { }

	ngAfterViewInit(): void {
		if (!window.location.hash || window.location.hash.length === 0) {
			const queryString = window.location.search.substring(1);
			const path = [window.location.pathname, queryString].join("#");
			window.location.assign(new URL(path, window.location.href).toString());
		}
		else if (new URLSearchParams(window.location.hash).has("code")) {
		}
		else {
		}

	}

}
