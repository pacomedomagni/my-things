import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.Home,
	name: "Home",
	description: "Home Page",
	svgIcon: "ubi_home",
	isProdReady: true,
	applications: [
		{
			id: "ActivitySelection",
			name: "Activity Selection",
			typeId: ApplicationTypeIds.Application,
			icon: "home",
			description: `
							Here you can choose what service to perform next on your selected policy.
							`,
			isProdReady: true
		}
	]
};
