import { ApplicationGroupMetadata } from "./application.interface";
import { metadata as home } from "../../home/metadata";
import { metadata as mobile } from "../../mobile/metadata";
import { metadata as plugin } from "../../plug-in/metadata";
import { metadata as portal } from "../../portal/metadata";
import { metadata as trip } from "../../trip/metadata";
import { metadata as additional } from "../../additional/metadata";
import { metadata as trial } from "../../trial/metadata";
import { metadata as setupAccidentResponseExpansion } from "../../setup-accident-response-expansion/metadata";
import { metadata as fulfillment } from "../../fulfillment/metadata";
import { metadata as codeViewer } from "../../code-viewer/metadata";
import { metadata as cad } from "../../cad/metadata";
import { metadata as TelematicsPortal } from "../../telematics-portal/metadata";

export const applicationGroups: ApplicationGroupMetadata[] = [
	home,
	mobile,
	plugin,
	portal,
	trip,
	additional,
	trial,
	setupAccidentResponseExpansion,
	fulfillment,
	codeViewer,
	cad,
	TelematicsPortal
].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
