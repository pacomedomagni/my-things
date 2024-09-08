import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.Additional,
	name: "Additional Setup Features",
	description: "Non-Installer, Non-Communicator, Change Enrollment Date, Switch Mobile to Plug-in, Mobile Not Fit Opt-out, Automated Opt-in, Manual Device Date Update",
	svgIcon: "ubi_snapshot_additional",
	isProdReady: true,
	applications: [
		{
			id: "Setup",
			name: "Additional Setup Features",
			typeId: ApplicationTypeIds.Application,
			icon: "ubi_snapshot_additional",
			description: `
				Non-Installer, Non-Communicator, Change Enrollment Date, Switch Mobile to Plug-in, Mobile Not Fit Opt-out, Automated Opt-in, Manual Device Date Update
			`,
			isProdReady: true
		}
	]
};
