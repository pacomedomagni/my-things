import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.CAD,
	name: "CAD",
	description: "[Crash Accident Detection] - Reset Eligibility",
	icon: "car_crash",
	isProdReady: true,
	applications: [
		{
			id: "CAD",
			name: "Crash Accident Detection",
			typeId: ApplicationTypeIds.Application,
			icon: "car_crash",
			description: "Reset Eligibility",
			isProdReady: true
		}
	]
};

