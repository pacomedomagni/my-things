import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ApplicationGroupMetadata, applicationGroups } from "@modules/shared/data/_index";
import { Router, NavigationEnd } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { filter, map, startWith } from "rxjs/operators";
import { PageTitleService } from "@modules/core/services/_index";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable()
export class AppDataService {

	private currentAppGroup: ApplicationGroupMetadata = null;
	private currentAppGroupSubject: BehaviorSubject<ApplicationGroupMetadata> =
		new BehaviorSubject<ApplicationGroupMetadata>(this.currentAppGroup);

	public currentAppGroup$: Observable<ApplicationGroupMetadata> = this.currentAppGroupSubject.asObservable();

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private router: Router,
		public pageTitleService: PageTitleService) {

		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				startWith(this.router),
				map((event: NavigationEnd) => {
					const routeParts = this.router.url.split("/");
					const route = routeParts[routeParts.length - 1];
					return this.getEnabledApplicationGroups().find(x => x.id === route);
				}),
				untilDestroyed(this)
			)
			.subscribe((app: ApplicationGroupMetadata) => {
				if (app) {
					this.currentAppGroupSubject.next(app);
					this.pageTitleService.title = app.name;
				}
			});
	}

	getEnabledApplicationGroups = () =>
		applicationGroups
			.filter(x => this.shouldDisplayApplication(this.document.location.href, x.isProdReady))
			.filter(x => x.applications.find(y => this.shouldDisplayApplication(this.document.location.href, y.isProdReady)));
	/* applicationGroups.map(appGroup => ({
		...appGroup,
		appList: applications
			.filter(app => (this.shouldDisplayApplication(this.document.location.href, app.isProdReady)
				&& app.groupId === appGroup.id)
			)
			.map(componentItem => ({
				...componentItem,
				homePath: appGroup.id + "/" + componentItem.id
			}))
	})) */

	getAllApplicationGroups = () => applicationGroups;

	shouldDisplayApplication(url: string, isProdReady: boolean): boolean {
		/* const nonProdEnvironment = /^(?=.*\blocalhost\b)|(?=.*\bd-s2ds\b).*$/;
		const isEnvironmentNonProd = nonProdEnvironment.test(url);
		return isEnvironmentNonProd ? isEnvironmentNonProd : isProdReady; */
		return isProdReady;
	}
}
