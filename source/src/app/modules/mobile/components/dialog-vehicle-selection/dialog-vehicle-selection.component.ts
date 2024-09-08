import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";
import { Vehicle } from "@modules/shared/data/resources";

@Component({
	selector: "ubi-dialog-vehicle-selection",
	templateUrl: "./dialog-vehicle-selection.component.html",
	styleUrls: ["./dialog-vehicle-selection.component.scss"]
})
export class DialogVehicleSelectionComponent implements OnInit, AfterViewInit {
	@Input() model: { selection: Vehicle };
	@Input() vehicles: Vehicle[];
	@Input() parentForm: NgForm;
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	constructor(
		@Optional() @Inject(FORM_DIALOG_CONTENT) public injectedData: any) { }

	ngOnInit(): void {
		this.model = this.model || this.injectedData.model;
		this.vehicles = this.vehicles || this.injectedData.data;
		this.parentForm = this.parentForm || this.injectedData.form;
	}

	ngAfterViewInit(): void {
		this.controls.forEach(x => this.parentForm.addControl(x));
	}
}
