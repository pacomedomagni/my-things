import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.TelematicsPortal,
	name: "Telematics Policy Search",
	description: "Telematics Policy Search",
	svgIcon: "ubi_search",
	isProdReady: true,
	isStaticDisplay: true,
	applications: [
		{
			id: "PolicySearch",
			name: "Telematics Policy Search",
			typeId: ApplicationTypeIds.Application,
			icon: "search",
			description: `Look up by Policy number or Mobile Phone number.`,
			isProdReady: true
		}
	]
};
