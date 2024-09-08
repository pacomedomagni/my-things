import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@modules/shared/shared.module";
import { CoreModule } from "@modules/core/core.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CodeViewerRoutingModule } from "./code-viewer-routing";
import { ContainerComponent } from "./components/container/container.component";

@NgModule({
	declarations: [
		ContainerComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CodeViewerRoutingModule,
		CoreModule,
		SharedModule
	]
})
export class CodeViewerModule { }
