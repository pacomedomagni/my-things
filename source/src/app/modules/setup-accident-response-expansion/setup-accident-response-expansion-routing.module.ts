import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { SetupAccidentResponseExpansionContainerComponent as SetupAccidentResponseExpansionContainerComponent } from "./components/container.component";

const routes: Routes = [{ path: "", component: SetupAccidentResponseExpansionContainerComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SetupAccidentResponseExpansionRoutingModule { }
