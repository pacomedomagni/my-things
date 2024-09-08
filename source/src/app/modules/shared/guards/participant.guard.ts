/* eslint-disable unused-imports/no-unused-vars */
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Injectable } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ApplicationGroupIds } from "../data/_index";
import { ApplicationRouteGuard } from "../data/application-groups.model";
import { PolicyQuery } from "../stores/_index";

@Injectable()
@UntilDestroy({ checkProperties: true })
export class ParticipantGuard implements CanActivate {

	private hasMobileParticipants: boolean;
	private hasPluginParticipants: boolean;
	private hasActivePolicy: boolean;

	constructor(private router: Router, private policyQuery: PolicyQuery) {
		this.policyQuery.hasMobileParticipants$.subscribe(x => this.hasMobileParticipants = x);
		this.policyQuery.hasPluginParticipants$.subscribe(x => this.hasPluginParticipants = x);
		this.policyQuery.workingPolicy$.subscribe(x => this.hasActivePolicy = x ? true : false);
	}

	canDisplayNavLink(appRouteGuard: ApplicationRouteGuard): boolean {

		if (this.hasActivePolicy && (
			appRouteGuard === undefined ||
			(appRouteGuard === ApplicationRouteGuard.Mobile && this.hasMobileParticipants) ||
			(appRouteGuard === ApplicationRouteGuard.Plugin && this.hasPluginParticipants)
		)) {
			return true;
		}
		else {
			return false;
		}

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
		const appRouteGuard = route.data.experience as ApplicationRouteGuard;
		if (this.canDisplayNavLink(appRouteGuard)) {
			return true;
		}
		else {
			return this.router.parseUrl("/" + ApplicationGroupIds.Portal);
		}
	}
}
