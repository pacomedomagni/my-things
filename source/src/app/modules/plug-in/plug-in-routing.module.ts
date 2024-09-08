import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlugInContainerComponent } from "./components/container.component";

const routes: Routes = [{ path: "", component: PlugInContainerComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PlugInRoutingModule { }
