
import { CommonModule } from "@angular/common";
import { CoreModule } from "@modules/core/core.module";
import { NgModule } from "@angular/core";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { SharedModule } from "@modules/shared/shared.module";
import { MobileModule } from "@modules/mobile/mobile.module";
import { SetupAccidentResponseExpansionRoutingModule } from "./setup-accident-response-expansion-routing.module";
import { DialogEnrollmentComponent } from "./components/dialog-enrollment/dialog-enrollment.component";
import {
	SetupAccidentResponseExpansionContainerComponent,
	SetupAccidentResponseExpansionComponent,
	AreMultiPolicyDetailsComponent
} from "./components/_index";

@NgModule({
	declarations: [
		SetupAccidentResponseExpansionContainerComponent,
		SetupAccidentResponseExpansionComponent,
		AreMultiPolicyDetailsComponent,
		DialogEnrollmentComponent
	],
	imports: [
		CommonModule,
		SetupAccidentResponseExpansionRoutingModule,
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
export class SetupAccidentResponseExpansionModule { }
