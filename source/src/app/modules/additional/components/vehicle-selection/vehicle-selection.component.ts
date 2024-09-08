import { AfterViewInit, Component, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";
import { Vehicle } from "@modules/shared/data/resources";

@Component({
	selector: "ubi-vehicle-selection",
	templateUrl: "./vehicle-selection.component.html",
	styleUrls: ["./vehicle-selection.component.scss"]
})
export class VehicleSelectionComponent implements OnInit, AfterViewInit {

	@Input() model: Vehicle;
	@Input() parentForm: NgForm;
	@Input() vehicles: Vehicle[];
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	constructor(
		@Optional() @Inject(FORM_DIALOG_CONTENT) public injectedData: any) { }

	ngOnInit(): void {
		this.model = this.model || this.injectedData.model;
		this.vehicles = this.vehicles || this.injectedData.vehicles;
		this.parentForm = this.parentForm || this.injectedData.form;
	}

	ngAfterViewInit(): void {
		this.controls.forEach(x => this.parentForm.addControl(x));
	}

}
