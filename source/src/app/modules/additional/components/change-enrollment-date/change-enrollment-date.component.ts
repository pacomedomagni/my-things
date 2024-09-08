import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";

@Component({
	selector: "ubi-change-enrollment-date",
	templateUrl: "./change-enrollment-date.component.html",
	styleUrls: ["./change-enrollment-date.component.scss"]
})
export class ChangeEnrollmentDateComponent implements OnInit, AfterViewInit {

	@Input() model: { enrollmentDate: Date };
	@Input() parentForm: NgForm;
	@ViewChildren(NgModel) controls: QueryList<NgModel>;
	today: Date = new Date();

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
