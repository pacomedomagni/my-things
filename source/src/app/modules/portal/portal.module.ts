
import { CommonModule } from "@angular/common";
import { CoreModule } from "@modules/core/core.module";
import { NgModule } from "@angular/core";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SharedModule } from "@modules/shared/shared.module";
import { PortalRoutingModule } from "./portal-routing.module";
import {
	MultiPolicyDetailsComponent,
	ParticipantsComponent,
	PolicyDetailsComponent,
	PolicySearchComponent,
	PortalContainerComponent,
	SinglePolicyDetailsComponent
} from "./components/_index";

@NgModule({
	declarations: [
		ParticipantsComponent,
		PortalContainerComponent,
		MultiPolicyDetailsComponent,
		PolicySearchComponent,
		PolicyDetailsComponent,
		SinglePolicyDetailsComponent
	],
	imports: [
		CommonModule,
		PortalRoutingModule,
		CoreModule,
		SharedModule,
		NgxMaskDirective,
		NgxMaskPipe
	],
	providers: [
		provideNgxMask()
	]
})
export class PortalModule { }
