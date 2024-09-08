import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MobileRegistrationStatusLabel, ParticipantReasonCodeLabel, ParticipantStatusLabel, ProgramTypeLabel } from "@modules/shared/data/enum-descriptions";

import { MatAccordion } from "@angular/material/expansion";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { DeviceExperience } from "@modules/shared/data/enums";

@Component({
	selector: "ubi-participants",
	templateUrl: "./participants.component.html",
	styleUrls: ["./participants.component.scss"]
})
export class ParticipantsComponent implements AfterViewInit {

	@ViewChild("participantDetailsAccordion") participantDetailsAccordion: MatAccordion;

	mobileRegistrationStatusLabel = MobileRegistrationStatusLabel;
	participantStatusLabel = ParticipantStatusLabel;
	participantReasonCodeLabel = ParticipantReasonCodeLabel;
	programTypeLabel = ProgramTypeLabel;

	public get deviceExperience(): typeof DeviceExperience {
		return DeviceExperience;
	}
	constructor(public policyQuery: PolicyQuery) { }

	// Workaround for angular component issue #13870
	disableAnimation = true;
	ngAfterViewInit(): void {
		// timeout required to avoid the dreaded "ExpressionChangedAfterItHasBeenCheckedError"
		setTimeout(() => this.disableAnimation = false);
	}

	hideDummyAppVersion(appversion: string): boolean {
		if(appversion !== "TrueMotion 1.0")
		{
			return true;
		}
	}
}
