import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PortalContainerComponent } from "./components/container.component";

const routes: Routes = [{ path: "", component: PortalContainerComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PortalRoutingModule { }
