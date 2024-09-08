import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { ContainerComponent } from "./components/container.component";

const routes: Routes = [{ path: "", component: ContainerComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RoutingModule { }
