import { ApplicationGroupIds } from "@modules/shared/data/_index";
import { ApplicationRouteGuard } from "@modules/shared/data/application-groups.model";

export interface NavRailLinkItem {
	id: ApplicationGroupIds;
	route: string;
	routeGuard?: ApplicationRouteGuard;
	label: string;
	icon?: string;
	svgIcon?: string;
	isProdReady: boolean;
	isStatic: boolean;
}
