import { Participant } from "@modules/shared/data/resources";
import { ProgramType } from "@modules/shared/data/enums";

import { HelperService } from "@modules/shared/services/helper/helper.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LabelService {

	constructor(private helper: HelperService) { }

	getParticipantDisplayName(participant: Participant): string {
		return participant ?
			participant.programType <= ProgramType.PriceModel3 || participant.mobileDetails === undefined
				|| participant.mobileDetails.alias === "" ?
				participant.vehicleDetails.year + " " + participant.vehicleDetails.make + " " + participant.vehicleDetails.model :
				participant.mobileDetails.alias : "";
	}

	getDialogSubtitleForParticipant(participant: Participant): string {
		const partLabel = this.getParticipantDisplayName(participant);
		let serialNumberLabel = ``;
		if (participant.deviceDetails?.serialNumber !== undefined) {
			serialNumberLabel = `<p>${participant.deviceDetails?.serialNumber}</p>`;
		}
		return `${partLabel}` + (!this.helper.isParticipantMobile(participant) ? serialNumberLabel : ``);
	}

}
