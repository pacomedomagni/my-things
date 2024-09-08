import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";

@Component({
	selector: "ubi-dialog-return-plugin",
	templateUrl: "./dialog-return-plugin.component.html",
	styleUrls: ["./dialog-return-plugin.component.scss"]

})
export class DialogReturnPluginComponent implements OnInit, AfterViewInit {
	@Input() model: { selection: string };
	@Input() deviceSerialNumbers: string[];
	@Input() parentForm: NgForm;
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	constructor(
		@Optional() @Inject(FORM_DIALOG_CONTENT) public injectedData: any) { }

	ngOnInit(): void {
		this.model = this.model || this.injectedData.model;
		this.deviceSerialNumbers = this.deviceSerialNumbers || this.injectedData.data;
		this.parentForm = this.parentForm || this.injectedData.form;
	}

	ngAfterViewInit(): void {
		this.controls.forEach(x => this.parentForm.addControl(x));
	}
}
