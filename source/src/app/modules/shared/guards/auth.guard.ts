/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return false;
	}
}
