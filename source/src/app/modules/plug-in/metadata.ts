import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationRouteGuard, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.Plugin,
	routeGuard: ApplicationRouteGuard.Plugin,
	name: "Plug-in",
	description: "Assign, Return Device, Unsolicited Device Return, Plug-in Device Charge",
	svgIcon: "ubi_snapshot_device",
	isProdReady: true,
	applications: [
		{
			id: "PlugIn",
			name: "Plug-in Setup Features",
			typeId: ApplicationTypeIds.Application,
			icon: "ubi_snapshot_device",
			description: `
			Please select a participant to assign or return a device.
							`,
			isProdReady: true
		}
	]
};
