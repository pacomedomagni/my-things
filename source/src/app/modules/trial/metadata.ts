import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.Trial,
	name: "Setup Express Trial Data",
	description: "Toyota, CreditKarma",
	icon: "app_registration",
	isProdReady: true,
	isStaticDisplay: true,
	applications: [
		{
			id: "TrialSetup",
			name: "Express Trial Setup",
			typeId: ApplicationTypeIds.Application,
			icon: "search",
			description: `
				Setup Express Trial data from providers below.
							`,
			isProdReady: true
		}
	]
};
