import { Component, Inject, Input, OnInit, Optional } from "@angular/core";
import { INFO_DIALOG_CONTENT } from "@modules/shared/components/information-dialog/information-dialog.component";
import { EDAQTrialCustomer, TrialCustomer } from "@modules/shared/data/resources";
import { EDAQTrialVendor, EDAQTrialVendorValue, ExpressTrialVendor, ExpressTrialVendorValue } from "@modules/shared/data/enums";

@Component({
	selector: "ubi-customer-info",
	templateUrl: "./customer-info.component.html",
	styleUrls: ["./customer-info.component.scss"]
})
export class CustomerInfoComponent implements OnInit {

	@Input() data: TrialCustomer | EDAQTrialCustomer;
	trialData: TrialCustomer;
	edaqTrialData: EDAQTrialCustomer;
	vendorCodeValue: number;
	trialType: boolean;

	public get vendorCode(): typeof ExpressTrialVendor {
		return ExpressTrialVendor;
	}
	public get edaqVendorCode(): typeof EDAQTrialVendor {
		return EDAQTrialVendor;
	}

	constructor(@Optional() @Inject(INFO_DIALOG_CONTENT) public injectedData: any) { }

	ngOnInit(): void {
		this.data = this.data || this.injectedData;

		this.trialType = this.injectedData.EDAQ === undefined;
		if (this.trialType) {
			this.trialData = (<TrialCustomer>this.data);
			this.vendorCodeValue = ExpressTrialVendorValue.get(<ExpressTrialVendor>(this.trialData.vendorCode));
		}
		else {
			this.edaqTrialData = (<EDAQTrialCustomer>this.data);
			this.vendorCodeValue = EDAQTrialVendorValue.get(<EDAQTrialVendor>(this.edaqTrialData.vendorCode));
		}
	}

}
