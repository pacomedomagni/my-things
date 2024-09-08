import { CommonModule } from "@angular/common";
import { CoreModule } from "@modules/core/core.module";
import { NgModule } from "@angular/core";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SharedModule } from "@modules/shared/shared.module";
import { DialogUnsolicitedReturnComponent } from "./components/dialog-unsolicited-return/dialog-unsolicited-return.component";
import { PlugInContainerComponent } from "./components/container.component";
import { PlugInHomeComponent } from "./components/plug-in-home/plug-in-home.component";
import { PlugInRoutingModule } from "./plug-in-routing.module";
import { DialogReturnPluginComponent } from "./components/dialog-return-plugin/dialog-return-plugin.component";

@NgModule({
	declarations: [
		PlugInHomeComponent,
		PlugInContainerComponent,
		DialogReturnPluginComponent,
		DialogUnsolicitedReturnComponent
	],
	imports: [
		CommonModule,
		PlugInRoutingModule,
		CoreModule,
		SharedModule,
		NgxMaskDirective,
		NgxMaskPipe
	],
	providers: [
		provideNgxMask()
	]
})
export class PlugInModule { }
