import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@modules/shared/shared.module";
import { CoreModule } from "@modules/core/core.module";
import { FulfillmentRoutingModule } from "./fulfillment-routing";
import { ContainerComponent } from "./components/container/container.component";

@NgModule({
	declarations: [
		ContainerComponent
	],
	imports: [
		CommonModule,
		FulfillmentRoutingModule,
		CoreModule,
		SharedModule
	]
})
export class FulfillmentModule { }
