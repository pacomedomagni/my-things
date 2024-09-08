import { ApplicationGroupIds, applicationGroups } from "@modules/shared/data/_index";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter, takeUntil } from "rxjs/operators";

import { AuthService } from "@modules/auth/services/auth.service";
import { ConfigurationSettings } from "@modules/core/services/configuration/config-info";
import { NavRailLinkItem } from "@modules/shared/components/nav-rail/nav-rail-link-item";
import { Subject } from "rxjs";
import { UserInfoService } from "@modules/shared/services/_index";
import { MaintenanceService } from "@modules/core/services/maintenance/maintenance.service";

@UntilDestroy()
@Component({
	selector: "tmx-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit, OnDestroy {
	apps = applicationGroups.map(x => ({
		id: x.id,
		route: "./" + x.id,
		routeGuard: x.routeGuard,
		label: x.name,
		icon: x.icon,
		svgIcon: x.svgIcon,
		isProdReady: x.isProdReady,
		isStatic: x.isStaticDisplay ?? false
	} as NavRailLinkItem));

	private navigateToMaintenancePage = false;
	private additionalMaitenenacePageDetails = "";

	private destroy$ = new Subject<boolean>();

	constructor(
		private router: Router, private auth: AuthService, private userService: UserInfoService, private maintenanceService: MaintenanceService) {
		this.maintenanceService.getMaintenanceConfiguration().subscribe(x => {

			x.forEach(y => {
				if (y.configKey === "MaintenanceEnabled" && y.configValue.toLowerCase().trim() === "true") {
					this.navigateToMaintenancePage = true;
				}

				if (y.configKey === "MaintenanceAdditionalInfo") {
					this.additionalMaitenenacePageDetails = y.configValue;
				}
			}
			);

			if (this.navigateToMaintenancePage) {
				this.maintenanceService.emit(this.additionalMaitenenacePageDetails);
				this.router.navigateByUrl("/maintenance");
			}
		});

		this.apps = this.apps.sort((x, y) => x.id === ApplicationGroupIds.Home ? -1 : y.id === ApplicationGroupIds.Home ? 1 : 0);

		this.auth.configure(ConfigurationSettings.appSettings.auth);

		this.auth.isAuthenticated$.pipe(untilDestroyed(this)).subscribe(x => {
			if (x) {
				this.userService.getUserInfo().subscribe(y => console.log("🚀 ~ User Info ~ ", y));
			}
		});
	}

	ngOnInit(): void {
		this.router.events
			.pipe(
				filter(e => !(e instanceof NavigationEnd)),
				takeUntil(this.destroy$))
			.subscribe((() => {
				window.scrollTo(0, 0);
			}));
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
