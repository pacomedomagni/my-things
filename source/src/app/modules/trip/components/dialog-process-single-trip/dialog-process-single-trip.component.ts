import { AfterViewInit, Component, Input, OnInit, Optional, QueryList, ViewChildren } from "@angular/core";
import { fadeAnimation } from "@modules/shared/animations";
import { NgForm, NgModel } from "@angular/forms";
import { Inject } from "@angular/core";
import { FORM_DIALOG_CONTENT } from "@modules/shared/components/form-dialog/form-dialog.component";
import { TripService } from "@modules/trip/services/trip.service";
import { StoredTrip } from "@modules/shared/data/resources";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StoredTripType } from "@modules/shared/data/enums";

@Component({
	selector: "ubi-dialog-process-single-trip",
	templateUrl: "./dialog-process-single-trip.component.html",
	styleUrls: ["./dialog-process-single-trip.component.scss"],
	animations: [fadeAnimation]
})
export class DialogProcessSingleTripComponent implements OnInit, AfterViewInit {

	@Input() model: { tripSeqId: number; date: Date; type: string };
	@Input() parentForm: NgForm;
	@Input() storedTrips: StoredTrip[];
	@ViewChildren(NgModel) controls: QueryList<NgModel>;

	storedTripType = StoredTripType;
	isMobile: boolean;
	isPlugIn: boolean;
	maxDate = new Date();
	actualDate = new Date();
	minDate = new Date(this.actualDate.getFullYear()
		, this.actualDate.getMonth()
		, this.actualDate.getDate()
		, -17520, 0, 0
	); // date range from "today" to - 730 days

	constructor(
		@Optional() @Inject(FORM_DIALOG_CONTENT) public injectedData: any,
		@Inject(MAT_DIALOG_DATA) public data: { name: string; type: string },
		private tripService: TripService
	) { }

	ngOnInit(): void {
		this.model = this.model || this.injectedData.model;
		this.model.date = new Date();
		this.parentForm = this.parentForm || this.injectedData.form;

		this.isMobile = this.model.type === "mobile" ? true : false;
		this.isPlugIn = this.model.type === "plugin" ? true : false;

		this.tripService.getStoredTrips().subscribe(x => {
			if (this.isMobile) {
				this.storedTrips = x.filter((v): any => {
					return ((v["name"].toLowerCase() === "mk9zXFaVCZffR9098".toLowerCase()) ||
						(v["name"].toLowerCase() === "0cm45wtnReqnhO9Nq".toLowerCase()) ||
						(v["name"].toLowerCase() === "19Df8SbFLAvQMEei2".toLowerCase()));
				});

				this.storedTrips.forEach(m => {
					if (m.name.toLowerCase() === "mk9zXFaVCZffR9098".toLowerCase()) {
						m.name = "Brakes & Phone Usage";
					}
					else if (m.name.toLowerCase() === "0cm45wtnReqnhO9Nq".toLowerCase()) {
						m.name = "Brake(s) and Hard Acceleration";
					}
					else if (m.name.toLowerCase() === "19Df8SbFLAvQMEei2".toLowerCase()) {
						m.name = "Clean Trip";
					}
				});
			}

			if (this.isPlugIn) {
				this.storedTrips = x.filter((v): any => {
					return ((v["name"].toLowerCase() === "No Braking Events".toLowerCase()) ||
						(v["name"].toLowerCase() === "ExtremeBrakeHighJerkCount3ANDHardBrakeV2Count5ANDHardAccelerationV2Count4".toLowerCase()) ||
						(v["name"].toLowerCase() === "WareHouseTrip".toLowerCase()) ||
						(v["name"].toLowerCase() === "SmartHub Brakings".toLowerCase()));

				});
				this.storedTrips.forEach(p => {
					if (p.name.toLowerCase() === "No Braking Events".toLowerCase()) {
						p.name = "Clean Trip";
					}
					else if (p.name.toLowerCase() === "ExtremeBrakeHighJerkCount3ANDHardBrakeV2Count5ANDHardAccelerationV2Count4".toLowerCase()) {
						p.name = "Acceleration";
					}
					else if (p.name.toLowerCase() === "WareHouseTrip".toLowerCase()) {
						p.name = "Hard Brake";
					}
					else if (p.name.toLowerCase() === "SmartHub Brakings".toLowerCase()) {
						p.name = "Braking and Acceleration";
					}

				});

			}
		});

	}

	ngAfterViewInit(): void {
		this.controls.forEach(x => this.parentForm.addControl(x));
	}

}
