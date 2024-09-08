import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { FormControl, NgForm, NgModel, Validators } from "@angular/forms";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";

@Component({
	selector: "ubi-dialog-enrollment",
	templateUrl: "./dialog-enrollment.component.html",
	styleUrls: ["./dialog-enrollment.component.scss"]
})
export class DialogEnrollmentComponent implements OnInit, AfterViewInit {
	@Input() model: { phoneNumber: string };
	@Input() parentForm: NgForm;
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	ubiValue: string;

	phoneNumberFormControl = new FormControl("", [
		Validators.required,
		Validators.minLength(10),
		Validators.maxLength(10)
	]);

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

