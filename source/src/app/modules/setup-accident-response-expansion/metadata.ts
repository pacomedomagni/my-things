import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.SetupAccidentResponseExpansion,
	name: "Setup Accident Response Expansion",
	description: "Enroll in Accident Detection, register, check eligibility for Accident Detection, activate accident detection feature",
	icon: "app_registration",
	isProdReady: true,
	isStaticDisplay: true,
	applications: [
		{
			id: "SetupAccidentResponseExpansion",
			name: "Accident Response Expansion Setup",
			typeId: ApplicationTypeIds.Application,
			icon: "search",
			description: `
				Enroll in Accident Detection, register, check eligibility for Accident Detection, activate accident detection feature
							`,
			isProdReady: true
		}
	]
};

