import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationRouteGuard, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.Mobile,
	routeGuard: ApplicationRouteGuard.Mobile,
	name: "Mobile",
	description: "Mobile Registration, Change Phone Number, Unlock Registration, View Challenge Code and Challenge Expiration, Mobile Pause",
	svgIcon: "ubi_snapshot_mobile",
	isProdReady: true,
	applications: [
		{
			id: "Registration",
			name: "Registration",
			typeId: ApplicationTypeIds.Application,
			icon: "search",
			description: `
				Please select a participant to view or modify.
							`,
			isProdReady: true
		}
	]
};
