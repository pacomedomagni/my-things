import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { IConfig,  NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { LOCALE_ID, NgModule } from "@angular/core";

import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { AuthModule } from "@modules/auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "@modules/core/core.module";
import { MatIconRegistry } from "@angular/material/icon";
import { SharedModule } from "@modules/shared/shared.module";
import { environment } from "environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		NgxMaskDirective,
		NgxMaskPipe,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		AuthModule,
		CoreModule,
		SharedModule
	],
	providers: [{ provide: LOCALE_ID, useValue: "en-US" }, provideNgxMask()],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
		const icons = [
			["ubi_progressive_p", "logo-p.svg"],
			["ubi_progressive_logo", "logo-progressive.svg"],
			["ubi_sadcone", "sadCone.svg"],
			["ubi_snapshot_mobile", "snapshot_phoneuse.svg"],
			["ubi_snapshot_device", "snapshot_plugin.svg"],
			["ubi_snapshot_trip", "snapshot_total_trips.svg"],
			["ubi_snapshot_additional", "snapshot_additional.svg"],
			["ubi_home", "home.svg"],
			["ubi_code", "code_icon.svg"],
			["ubi_search", "search.svg"],
			["tel_mobile", "tel_mobile.svg"],
			["tel_plugin", "tel_plugin.svg"]
		];
		icons.forEach(x => this.addMatIcon(x[0], x[1]));
	}

	addMatIcon(iconName: string, fileName: string): void {
		this.matIconRegistry.addSvgIcon(
			iconName,
			this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${fileName}`)
		);
	}
}

