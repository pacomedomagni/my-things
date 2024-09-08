import { Component, Input, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { AuthService } from "@modules/auth/services/auth.service";
import { ParticipantGuard } from "@modules/shared/guards/_index";
import { SideSheetService } from "@pgr-cla/core-ui-components";
import { NavRailLinkItem } from "./nav-rail-link-item";

@UntilDestroy()
@Component({
	selector: "ubi-nav-rail",
	templateUrl: "./nav-rail.component.html",
	styleUrls: ["./nav-rail.component.scss"]
})
export class NavRailComponent implements OnInit {

	@Input() navLinks: NavRailLinkItem[];
	@Input() sideNavId = "sideNav";

	private isUserAuthenticated = false;

	constructor(private sideSheetService: SideSheetService, private authService: AuthService, private routeGuard: ParticipantGuard) { }

	ngOnInit(): void {
		this.authService.isAuthenticated$.pipe(untilDestroyed(this)).subscribe(x => this.isUserAuthenticated = x);
	}

	toggleSideNav(): void {
		const sideNav = this.sideSheetService.get(this.sideNavId);
		if (sideNav) {
			sideNav.toggle();
		}
	}

	shouldDisplay(link: NavRailLinkItem): boolean {
		return link.isProdReady && ((link.isStatic && this.isUserAuthenticated) ||
			this.routeGuard.canDisplayNavLink(link.routeGuard));
	}
}
