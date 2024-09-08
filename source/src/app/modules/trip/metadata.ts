import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.Trips,
	name: "Trips",
	description: "Stage Grades, Setup for Monitoring Complete (Discount or Surcharge), Continue to Monitor at Renewal, Process Trips, Stage 2.0 Initial Discount",
	svgIcon: "ubi_snapshot_trip",
	isProdReady: true,
	applications: [
		{
			id: "Trips",
			name: "Stage Grades and Telematics Statuses, Process Trips",
			typeId: ApplicationTypeIds.Application,
			icon: "ubi_snapshot_trip",
			description: `
					Stage Grades, Setup for Monitoring Complete (Discount or Surcharge), Continue to Monitor at Renewal, Process Trips, Stage 2.0 Initial Discount
							`,
			isProdReady: true
		}
	]
};
