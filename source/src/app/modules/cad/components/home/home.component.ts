import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { fadeAnimation } from "@modules/shared/animations";
import { PolicyQuery } from "@modules/shared/stores/_index";
import { Participant } from "@modules/shared/data/resources";
import { ParticipantStatusLabel } from "@modules/shared/data/enum-descriptions";
import { CadService } from "@modules/cad/services/cad.service";
import { NotificationService } from "@pgr-cla/core-ui-components";

@UntilDestroy()
@Component({
	selector: "ubi-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
	animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {
	selectedParticipant: Participant;
	participants: Participant[];
	participantStatusLabel = ParticipantStatusLabel;

	constructor(public policyQuery: PolicyQuery, private cadService: CadService, private notificationService: NotificationService) { }

	ngOnInit(): void {
		this.policyQuery.workingPolicy$.pipe(untilDestroyed(this)).subscribe(x => {
			this.participants = x.participants;
			const index = this.selectedParticipant === undefined ? 0 : this.participants.findIndex(y => y.sequenceId === this.selectedParticipant.sequenceId);
			this.selectedParticipant = this.participants[index];
		});
	}

	shouldDisableResetEligbility(participant: Participant): boolean {
		return participant.crashAccidentDetectionInfo?.ineligibleDateTime === undefined;
	}

	resetEligibility(participant: Participant): void {
		this.cadService.resetEligibility(participant.sequenceId).subscribe(_ =>
			this.notificationService.success("CAD eligibility has been reset"));
	}
}
