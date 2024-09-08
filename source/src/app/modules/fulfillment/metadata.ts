import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.Fulfillment,
	name: "Device Fulfillment",
	description: `
				Assign Device to participants that need devices.
				This does not included policies the Start with 'TDM'
							`,
	svgIcon: "ubi_snapshot_device",
	isProdReady: true,
	isStaticDisplay: true,
	applications: [
		{
			id: "Fulfillment",
			name: "Fulfill Device Assignment",
			typeId: ApplicationTypeIds.Application,
			svgIcon: "ubi_snapshot_device",
			description: `
				Assign Device to participants that need devices.
				This does not included policies the Start with 'TDM'
							`,
			isProdReady: true
		}
	]
};
