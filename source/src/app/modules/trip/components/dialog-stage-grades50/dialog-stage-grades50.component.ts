import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";

@Component({
	selector: "ubi-dialog-stage-grades50",
	templateUrl: "./dialog-stage-grades50.component.html",
	styleUrls: ["./dialog-stage-grades50.component.scss"]
})
export class DialogStageGrades50Component implements OnInit, AfterViewInit {
	@Input() model: { startDate: Date; endDate: Date; ubiValue: number };
	@Input() parentForm: NgForm;
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	enrollmentDate: Date;
	expirationDate: Date;
	ubiValue: string;
	minimum: number;
	maximum: number;

	constructor(
		@Optional() @Inject(FORM_DIALOG_CONTENT) public injectedData: any) { }

	ngOnInit(): void {
		this.model = this.model || this.injectedData.model;
		this.parentForm = this.parentForm || this.injectedData.form;
		this.enrollmentDate = new Date(this.injectedData.data.enrollmentDate);
		this.expirationDate = new Date(this.injectedData.data.expirationDate);
		this.minimum = this.injectedData.data.minimumValue;
		this.maximum = this.injectedData.data.maximumValue;
	}

	ngAfterViewInit(): void {
		this.controls.forEach(x => this.parentForm.addControl(x));
	}
}

