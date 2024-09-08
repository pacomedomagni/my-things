import { Component, OnInit } from "@angular/core";
import { EDAQTrialVendorLabel, ExpressTrialVendorLabel } from "@modules/shared/data/enum-descriptions";
import { EDAQTrialVendor, ExpressTrialVendor } from "@modules/shared/data/enums";
import { DialogService } from "@modules/shared/services/dialog-service/dialog.service";
import { TrialService } from "@modules/trial/services/trial.service";
import { CUI_DIALOG_WIDTH, NotificationService } from "@pgr-cla/core-ui-components";
import { CustomerInfoComponent } from "../dialogs/customer-info/customer-info.component";
import { StateSelectionComponent } from "../dialogs/state-selection/state-selection.component";

@Component({
	selector: "ubi-container",
	templateUrl: "./container.component.html",
	styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {

	ExpressTrialVendorLabel = ExpressTrialVendorLabel;
	EDAQTrialVendorLabel = EDAQTrialVendorLabel;
	vendors = ExpressTrialVendor;
	vendorList: any[] = null;

	edaqVendors = EDAQTrialVendor;
	vendorEDAQList: any[] = null;

	constructor(private dialogService: DialogService,
		private notificationService: NotificationService,
		private trialService: TrialService) { }

	ngOnInit(): void {
		this.vendorList = Object
			.keys(ExpressTrialVendor)
			.filter(k => isNaN(Number(k)))
			.map(v => ExpressTrialVendor[v]);

		this.vendorEDAQList = Object
			.keys(EDAQTrialVendor)
			.filter(k => isNaN(Number(k)))
			.map(v => EDAQTrialVendor[v]);
	}

	openTrialSetupDialog(vendor: ExpressTrialVendor): void {
		const vendorDisplay = ExpressTrialVendorLabel.get(vendor);
		this.dialogService.openFormDialog({
			title: `Create ${vendorDisplay} Participant`,
			component: StateSelectionComponent,
			formModel: { state: undefined }
		});

		this.dialogService.confirmed<{ state: string }>().subscribe(x => {
			if (x) {
				this.trialService.setupExpressTrialParticipant(x.state, vendor).subscribe(y => {
					this.dialogService.openInformationDialog({
						title: `${vendorDisplay} Participant Info`,
						component: CustomerInfoComponent,
						componentData: y,
						width:
							vendor === ExpressTrialVendor.Toyota
								? CUI_DIALOG_WIDTH.SMALL
								: CUI_DIALOG_WIDTH.MEDIUM
					});
					this.notificationService.success(`${vendorDisplay} participant successfully created`);
				});
			}
		});
	}

	openEDAQTrialSetupDialog(vendor: EDAQTrialVendor): void {
		const vendorDisplay = EDAQTrialVendorLabel.get(vendor);
		this.dialogService.openFormDialog({
			title: `Create ${vendorDisplay} Participant`,
			component: StateSelectionComponent,
			formModel: { state: undefined }
		});

		this.dialogService.confirmed<{ state: string }>().subscribe(x => {
			if (x) {
				this.trialService.setupExpressTrialParticipant(x.state, vendor).subscribe(y => {
					this.dialogService.openInformationDialog({
						title: `${vendorDisplay} Participant Info`,
						component: CustomerInfoComponent,
						componentData: { ...y, EDAQ: true },
						width: CUI_DIALOG_WIDTH.MEDIUM
					});
					this.notificationService.success(`${vendorDisplay} participant successfully created`);
				});
			}
		});
	}
}
