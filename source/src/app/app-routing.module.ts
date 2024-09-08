import { ParticipantGuard, PolicyGuard } from "@modules/shared/guards/_index";
import { RouterModule, Routes } from "@angular/router";

import { ApplicationGroupIds } from "@modules/shared/data/_index";
import { ApplicationRouteGuard } from "@modules/shared/data/application-groups.model";
import { AuthGuard } from "@modules/auth/guards/auth.guard";
import { NgModule } from "@angular/core";
import { WrapperComponent } from "@modules/shared/components/_index";

const routes: Routes = [
	{
		path: "", component: WrapperComponent,
		children: [
			{
				path: "",
				redirectTo: ApplicationGroupIds.Portal,
				pathMatch: "full"
			},
			{
				path: ApplicationGroupIds.Portal,
				canActivate: [AuthGuard],
				loadChildren: () => import("./modules/portal/portal.module")
					.then(m => m.PortalModule)
			},
			{
				path: ApplicationGroupIds.Home,
				canActivate: [AuthGuard, PolicyGuard],
				loadChildren: () => import("./modules/home/home.module")
					.then(m => m.HomeModule)
			},
			{
				path: ApplicationGroupIds.Mobile,
				canActivate: [AuthGuard, ParticipantGuard],
				data: { experience: ApplicationRouteGuard.Mobile },
				loadChildren: () => import("./modules/mobile/mobile.module")
					.then(m => m.MobileModule)
			},
			{
				path: ApplicationGroupIds.Plugin,
				canActivate: [AuthGuard, ParticipantGuard],
				data: { experience: ApplicationRouteGuard.Plugin },
				loadChildren: () => import("./modules/plug-in/plug-in.module")
					.then(m => m.PlugInModule)
			},
			{
				path: ApplicationGroupIds.Trips,
				canActivate: [AuthGuard, PolicyGuard],
				loadChildren: () => import("./modules/trip/trip.module")
					.then(m => m.TripModule)
			},
			{
				path: ApplicationGroupIds.Additional,
				canActivate: [AuthGuard, ParticipantGuard],
				loadChildren: () => import("./modules/additional/additional.module")
					.then(m => m.AdditionalModule)
			},
			{
				path: ApplicationGroupIds.Trial,
				canActivate: [AuthGuard],
				loadChildren: () => import("./modules/trial/trial.module")
					.then(m => m.TrialModule)
			},
			{
				path: ApplicationGroupIds.SetupAccidentResponseExpansion,
				canActivate: [AuthGuard],
				loadChildren: () => import("./modules/setup-accident-response-expansion/setup-accident-response-expansion.module")
					.then(m => m.SetupAccidentResponseExpansionModule)
			},
			{
				path: ApplicationGroupIds.CAD,
				canActivate: [AuthGuard, PolicyGuard],
				loadChildren: () => import("./modules/cad/cad.module")
					.then(m => m.CADModule)
			},
			{
				path: ApplicationGroupIds.Fulfillment,
				canActivate: [AuthGuard],
				loadChildren: () => import("./modules/fulfillment/fulfillment.module")
					.then(m => m.FulfillmentModule)
			},
			{
				path: ApplicationGroupIds.CodeViewer,
				canActivate: [AuthGuard],
				loadChildren: () => import("./modules/code-viewer/code-viewer.module")
					.then(m => m.CodeViewerModule)
			},
			{
				path: ApplicationGroupIds.TelematicsPortal,
				canActivate: [AuthGuard],
				loadChildren: () => import("./modules/telematics-portal/telematics-portal.module")
					.then(m => m.TelematicsPortalModule)
			},
		]
	}];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
