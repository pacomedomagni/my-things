import { Component, OnInit } from "@angular/core";

import { AuthService } from "../services/auth.service";

@Component({
	selector: "ubi-sso-login",
	template: `
	<ubi-auth-spinner></ubi-auth-spinner>
	`
})
export class SsoLoginComponent implements OnInit {

	constructor(private authService: AuthService) { }

	ngOnInit(): void {
		this.authService.login();
	}

}
