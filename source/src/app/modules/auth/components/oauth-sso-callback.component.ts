import { AfterViewInit, Component } from "@angular/core";

import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
	selector: "ubi-oauth-sso-callback",
	template: `
	<ubi-auth-spinner></ubi-auth-spinner>
`
})
export class OAuthSsoCallbackComponent implements AfterViewInit {

	constructor(private router: Router, private authService: AuthService) { }

	ngAfterViewInit(): void {
		const queryParms = this.decodeURLParams(window.location.search.substring(1));

		if (queryParms.code === undefined) {
			this.redirectUnauth();
		}
		else {
			this.authService.login(() => this.redirectUnauth);
		}
	}

	private redirectUnauth(): void {
		this.router.navigateByUrl("/unauthorized");
	}

	decodeURLParams = search => {
		const hashes = search.slice(search.indexOf("?") + 1).split("&");
		return hashes.reduce((params, hash) => {
			const split = hash.indexOf("=");

			if (split < 0) {
				return Object.assign(params, {
					[hash]: null
				});
			}

			const key = hash.slice(0, split);
			const val = hash.slice(split + 1);

			return Object.assign(params, { [key]: decodeURIComponent(val) });
		}, {});
	};

}
