import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TripContainerComponent } from "./components/container.component";

const routes: Routes = [
	{ path: "", component: TripContainerComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TripRoutingModule { }
