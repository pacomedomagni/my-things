
import { CommonModule } from "@angular/common";
import { CoreModule } from "@modules/core/core.module";
import { NgModule } from "@angular/core";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { SharedModule } from "@modules/shared/shared.module";
import { MobileModule } from "@modules/mobile/mobile.module";
import { telematicsPortalRoutingModule } from "./telematics-portal-routing.module";
import { DialogEnrollmentComponent } from "./components/dialog-enrollment/dialog-enrollment.component";
import {
	telematicsPortalContainerComponent,
	SetupAccidentResponseExpansionComponent,
	AreMultiPolicyDetailsComponent
} from "./components/_index";

@NgModule({
	declarations: [
		telematicsPortalContainerComponent,
		SetupAccidentResponseExpansionComponent,
		AreMultiPolicyDetailsComponent,
		DialogEnrollmentComponent
	],
	imports: [
		CommonModule,
		telematicsPortalRoutingModule,
		CoreModule,
		SharedModule,
		MobileModule,
		NgxMaskDirective,
		NgxMaskPipe
	],
	providers: [
		provideNgxMask()
	]
})
export class TelematicsPortalModule { }
