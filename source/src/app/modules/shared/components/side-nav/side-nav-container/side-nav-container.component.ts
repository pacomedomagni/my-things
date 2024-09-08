import { Component, OnInit, Type, ViewChild } from "@angular/core";
import { PageTitleService } from "@modules/core/services/_index";
import { MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { SideSheetService } from "@pgr-cla/core-ui-components";
import { Router, NavigationEnd } from "@angular/router";
import { Observable, of } from "rxjs";
import { filter } from "rxjs/operators";
import { AppQuery } from "@modules/core/stores/_index";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AppDataService } from "@modules/shared/services/_index";

@UntilDestroy()
@Component({
	selector: "ubi-side-nav-container",
	templateUrl: "./side-nav-container.component.html",
	styleUrls: ["./side-nav-container.component.scss"]
})

export class SideNavContainerComponent implements OnInit {
	@ViewChild("sidenav", { static: true }) sidenavRef: MatSidenav;
	@ViewChild("sidesheet", { static: true }) sideSheetRef: MatSidenav;
	@ViewChild("content", { static: true }) contentRef: MatSidenavContent;

	selectedSideSheet$: Observable<Type<any>>;

	constructor(
		private sideSheetService: SideSheetService,
		private router: Router,
		public appQuery: AppQuery,
		public appDataService: AppDataService,
		public pageTitleService: PageTitleService) { }

	ngOnInit(): void {

		this.sideSheetService.register("sideNav", this.sidenavRef, {
			toggleOnResize: true,
			closeOnRoute: false
		});

		this.sideSheetService.register("sideSheet", this.sideSheetRef);
		const sideSheet = this.sideSheetService.get("sideSheet");
		this.selectedSideSheet$ = (sideSheet ? sideSheet.selected$ : of(undefined)) as Observable<Type<any>>;
		this.scrollTopOnRoute();
	}

	scrollTopOnRoute(): void {
		this.router.events
			.pipe(
				filter(e => !(e instanceof NavigationEnd)),
				untilDestroyed(this)
			)
			.subscribe((() => {
				this.contentRef.scrollTo({ top: 0, left: 0 });
			}));
	}
}
