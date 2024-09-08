import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";
import { StateCodes } from "@modules/shared/data/state-data";

@Component({
	selector: "ubi-state-selection",
	templateUrl: "./state-selection.component.html",
	styleUrls: ["./state-selection.component.scss"]
})
export class StateSelectionComponent implements OnInit, AfterViewInit {

	@Input() model: { state: string };
	@Input() parentForm: NgForm;
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	states = Object.values(StateCodes);

	constructor(@Optional() @Inject(FORM_DIALOG_CONTENT) public injectedData: any) { }

	ngOnInit(): void {
		this.model = this.model || this.injectedData.model;
		this.parentForm = this.parentForm || this.injectedData.form;
	}

	ngAfterViewInit(): void {
		this.controls.forEach(x => this.parentForm.addControl(x));
	}

}
