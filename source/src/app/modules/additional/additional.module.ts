import { CommonModule } from "@angular/common";
import { CoreModule } from "@modules/core/core.module";
import { NgModule } from "@angular/core";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SharedModule } from "@modules/shared/shared.module";
import { AdditionalContainerComponent } from "./components/container.component";
import { AdditionalRoutingModule } from "./additional-routing.module";
import { AdditionalService } from "./services/additional.service";
import { ChangeEnrollmentDateComponent } from "./components/change-enrollment-date/change-enrollment-date.component";
import { DialogStatusSetupComponent } from "./components/dialog-status-setup/dialog-status-setup.component";
import { SetupComponent } from "./components/setup/setup.component";
import { VehicleSelectionComponent } from "./components/vehicle-selection/vehicle-selection.component";
import { DeviceDateUpdateComponent } from "./components/device-date-update/device-date-update.component";

@NgModule({
	declarations: [
		SetupComponent,
		AdditionalContainerComponent,
		ChangeEnrollmentDateComponent,
		DialogStatusSetupComponent,
		VehicleSelectionComponent,
		DeviceDateUpdateComponent
	],
	imports: [
		CommonModule,
		AdditionalRoutingModule,
		CoreModule,
		SharedModule,
		NgxMaskDirective,
		NgxMaskPipe
	],
	providers: [
		AdditionalService,
		provideNgxMask()
	]
})
export class AdditionalModule { }
