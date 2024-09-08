import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { FormControl, NgForm, NgModel, Validators } from "@angular/forms";
import { MobileRegisterService } from "@modules/mobile/services/register.service";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";

@Component({
	selector: "ubi-change-phone-number",
	templateUrl: "./change-phone-number.component.html",
	styleUrls: ["./change-phone-number.component.scss"]
})
export class ChangePhoneNumberComponent implements OnInit, AfterViewInit {
	@Input() model: { phoneNumber: string };
	@Input() parentForm: NgForm;
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	generateSuccessful = false;

	phoneNumberFormControl = new FormControl("", [
		Validators.required,
		Validators.minLength(10),
		Validators.maxLength(10)
	]);

	constructor(
		@Optional() @Inject(FORM_DIALOG_CONTENT) public injectedData: any,
		private registerService: MobileRegisterService) { }

	ngOnInit(): void {
		this.model = this.model || this.injectedData.model;
		this.parentForm = this.parentForm || this.injectedData.form;
	}

	ngAfterViewInit(): void {
		this.controls.forEach(x => this.parentForm.addControl(x));
	}

	clearAutoGenerateMobileNumber(): void {
		this.generateSuccessful = false;
	}

	generateMobileNumber(): void {
		this.registerService.generateMobileNumber().subscribe(x => {
			this.model.phoneNumber = x;
			this.generateSuccessful = true;
		});
	}
}

