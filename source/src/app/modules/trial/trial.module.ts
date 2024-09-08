import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@modules/shared/shared.module";
import { CoreModule } from "@modules/core/core.module";
import { TrialRoutingModule } from "./trial-routing";
import { StateSelectionComponent } from "./components/dialogs/state-selection/state-selection.component";
import { ContainerComponent } from "./components/container/container.component";
import { CustomerInfoComponent } from "./components/dialogs/customer-info/customer-info.component";

@NgModule({
	declarations: [
		ContainerComponent,
		StateSelectionComponent,
		CustomerInfoComponent
	],
	imports: [
		CommonModule,
		TrialRoutingModule,
		CoreModule,
		SharedModule
	]
})
export class TrialModule { }
