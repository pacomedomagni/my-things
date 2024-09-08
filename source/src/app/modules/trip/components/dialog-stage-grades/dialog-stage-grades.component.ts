import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";

@Component({
	selector: "ubi-dialog-stage-grades",
	templateUrl: "./dialog-stage-grades.component.html",
	styleUrls: ["./dialog-stage-grades.component.scss"]
})
export class DialogStageGradesComponent implements OnInit, AfterViewInit {
	@Input() model: { connectedDays: number; ubiValue: number };
	@Input() parentForm: NgForm;
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	ubiValue: string;
	minimum: number;
	maximum: number;
	minConnectedDays = 1;
	maxConnectedDays = 730;

	constructor(
		@Optional() @Inject(FORM_DIALOG_CONTENT) public injectedData: any) { }

	ngOnInit(): void {
		this.model = this.model || this.injectedData.model;
		this.parentForm = this.parentForm || this.injectedData.form;
		this.minimum = this.injectedData.data.minimumValue;
		this.maximum = this.injectedData.data.maximumValue;
	}

	ngAfterViewInit(): void {
		this.controls.forEach(x => this.parentForm.addControl(x));
	}
}

