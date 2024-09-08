import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { telematicsPortalContainerComponent } from "./components/container.component";

const routes: Routes = [{ path: "", component: telematicsPortalContainerComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class telematicsPortalRoutingModule { }


