import { CommonModule } from "@angular/common";
import { CoreModule } from "@modules/core/core.module";
import { NgModule } from "@angular/core";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { SharedModule } from "@modules/shared/shared.module";
import { RoutingModule } from "./cad-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { ContainerComponent } from "./components/container.component";
import { CadService } from "./services/cad.service";

@NgModule({
	declarations: [
		ContainerComponent,
		HomeComponent
	],
	imports: [
		CommonModule,
		RoutingModule,
		CoreModule,
		SharedModule,
		NgxMaskDirective,
		NgxMaskPipe
	],
	providers: [
		CadService,
		provideNgxMask()
	]
})
export class CADModule { }
