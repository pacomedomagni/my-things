
import { CommonModule } from "@angular/common";
import { CoreModule } from "@modules/core/core.module";
import { NgModule } from "@angular/core";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { SharedModule } from "@modules/shared/shared.module";
import { MobileRoutingModule } from "./mobile-routing.module";
import { MobileRegisterService } from "./services/register.service";
import {
	ChangePhoneNumberComponent,
	DialogVehicleSelectionComponent,
	MobileContainerComponent,
	RegisterComponent
} from "./components/_index";

@NgModule({
	declarations: [
		DialogVehicleSelectionComponent,
		MobileContainerComponent,
		RegisterComponent,
		ChangePhoneNumberComponent
	],
	imports: [
		CommonModule,
		MobileRoutingModule,
		CoreModule,
		SharedModule,
		NgxMaskDirective,
		NgxMaskPipe
	],
	exports: [
		ChangePhoneNumberComponent
	],
	providers: [
		MobileRegisterService,
		provideNgxMask()
	]
})
export class MobileModule { }
