/* eslint-disable unused-imports/no-unused-vars */
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Injectable } from "@angular/core";
import { ApplicationGroupIds } from "../data/_index";
import { Policy } from "../data/resources";
import { PolicyQuery } from "../stores/_index";

@Injectable()
export class PolicyGuard implements CanActivate {

	constructor(private router: Router, private policyQuery: PolicyQuery) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
		const hasActivePolicy = this.policyQuery.getActive() as Policy !== undefined;

		if (!hasActivePolicy) {
			return this.router.parseUrl("/" + ApplicationGroupIds.Portal);
		}
		else {
			return true;
		}
	}
}
