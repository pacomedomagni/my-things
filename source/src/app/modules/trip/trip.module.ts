import { CommonModule } from "@angular/common";
import { CoreModule } from "@modules/core/core.module";
import { NgModule } from "@angular/core";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { SharedModule } from "@modules/shared/shared.module";
import { DialogProcessMultipleTripsComponent } from "./components/dialog-process-multiple-trips/dialog-process-multiple-trips.component";
import { DialogProcessSingleTripComponent } from "./components/dialog-process-single-trip/dialog-process-single-trip.component";
import { DialogStageGradesComponent } from "./components/dialog-stage-grades/dialog-stage-grades.component";
import { TripContainerComponent } from "./components/container.component";
import { TripRoutingModule } from "./trip-routing.module";
import { TripService } from "./services/trip.service";
import { TripsHomeComponent } from "./components/trips-home/trips-home.component";
import { DialogStageGrades50Component } from "./components/dialog-stage-grades50/dialog-stage-grades50.component";

@NgModule({
	declarations: [
		TripContainerComponent,
		TripsHomeComponent,
		DialogStageGradesComponent,
		DialogProcessSingleTripComponent,
		DialogProcessMultipleTripsComponent,
		DialogStageGrades50Component
	],
	imports: [
		CommonModule,
		TripRoutingModule,
		CoreModule,
		SharedModule,
		NgxMaskDirective,
		NgxMaskPipe

	],
	providers: [
		TripService,
		provideNgxMask()
	]
})
export class TripModule { }
