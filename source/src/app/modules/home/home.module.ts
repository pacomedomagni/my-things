import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@modules/shared/shared.module";
import { CoreModule } from "@modules/core/core.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeContainerComponent } from "./components/container/container.component";

@NgModule({
	declarations: [
		HomeContainerComponent
	],
	imports: [
		CommonModule,
		HomeRoutingModule,
		CoreModule,
		SharedModule
	]
})
export class HomeModule { }
