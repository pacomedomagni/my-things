import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";

@Component({
	selector: "ubi-dialog-status-setup",
	templateUrl: "./dialog-status-setup.component.html",
	styleUrls: ["./dialog-status-setup.component.scss"]
})
export class DialogStatusSetupComponent implements OnInit, AfterViewInit {

	@Input() model: { isNonInstaller: boolean; isNonCommunicator: boolean; nonInstallerDays: number; nonCommunicatorDays: number  };
	@Input() parentForm: NgForm;
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	constructor(
		@Optional() @Inject(FORM_DIALOG_CONTENT) public injectedData: any) { }

	ngOnInit(): void {
		this.model = this.model || this.injectedData.model;
		this.parentForm = this.parentForm || this.injectedData.form;
	}

	ngAfterViewInit(): void {
		this.controls.forEach(x => this.parentForm.addControl(x));
	}
}

