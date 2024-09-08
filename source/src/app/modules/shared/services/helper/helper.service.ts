import { Injectable } from "@angular/core";
import { Participant, Resource } from "@modules/shared/data/resources";
import { DeviceExperience, MessageCode } from "@modules/shared/data/enums";

@Injectable({ providedIn: "root" })
export class HelperService {

	constructor() { }

	getExtender(resource: Resource, extender: string): any {
		return resource?.extenders ? resource.extenders[extender] : undefined;
	}

	getMessage(resource: Resource, message: MessageCode): string {
		return resource?.messages ? resource.messages[MessageCode[message]] : undefined;
	}

	isParticipantMobile(participant: Participant): boolean {
		return participant.enrollmentExperience === DeviceExperience.Mobile;
	}

	isParticipantPlugin(participant: Participant): boolean {
		return participant.enrollmentExperience === DeviceExperience.Device;
	}

	isParticipantOEM(participant: Participant): boolean {
		return participant.enrollmentExperience === DeviceExperience.OEM;
	}

}
