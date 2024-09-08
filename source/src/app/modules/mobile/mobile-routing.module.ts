import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { MobileContainerComponent } from "./components/container.component";

const routes: Routes = [{ path: "", component: MobileContainerComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MobileRoutingModule { }
