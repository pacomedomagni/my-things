import { ApplicationGroupMetadata } from "@modules/shared/data/application.interface";
import { ApplicationGroupIds, ApplicationTypeIds } from "../shared/data/application-groups.model";

export const metadata: ApplicationGroupMetadata =
{
	id: ApplicationGroupIds.CodeViewer,
	name: "Code Viewer",
	description: `view code in a formatted way`,
	svgIcon: "ubi_code",
	isProdReady: true,
	isStaticDisplay: true,
	applications: [
		{
			id: "CodeViewer",
			name: "Code Viewer",
			typeId: ApplicationTypeIds.Application,
			svgIcon: "ubi_code",
			description: `view code in a formatted way`,
			isProdReady: true
		}
	]
};
