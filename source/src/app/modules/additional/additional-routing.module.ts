import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { AdditionalContainerComponent } from "./components/container.component";

const routes: Routes = [{ path: "", component: AdditionalContainerComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdditionalRoutingModule { }
