import { ApplicationGroupIds, ApplicationRouteGuard, ApplicationTypeIds } from "./application-groups.model";

export interface ApplicationGroupMetadata {
	id: ApplicationGroupIds;
	name: string;
	routeGuard?: ApplicationRouteGuard;
	description: string;
	icon?: string;
	svgIcon?: string;
	isProdReady: boolean;
	isStaticDisplay?: boolean;
	externalUrl?: string;
	applications?: ApplicationMetadata[];
}

export interface ApplicationMetadata {
	id: string;
	typeId: ApplicationTypeIds | string;
	name: string;
	description: string;
	icon?: string;
	svgIcon?: string;
	isProdReady: boolean;
	externalUrl?: string;
}
