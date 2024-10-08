import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeContainerComponent } from "./components/container/container.component";

const routes: Routes = [{ path: "", component: HomeContainerComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
