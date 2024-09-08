import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";
import { CoreUiModule, SideSheetServiceModule, ThemeServiceModule } from "@pgr-cla/core-ui-components";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { AppConfigService, AppLoadService, EnvConfigService, getConfig } from "./services/configuration";
import { NotFoundComponent, TechnicalDifficultyComponent } from "./components/error-screens";

import { CoreRoutingModule } from "./core.routing.module";
import { ErrorHandlerService } from "./services/error-handler/error-handler.service";
import { HttpInterceptorErrorService } from "./services/http-interceptors/error-interceptor";
import { LoadingInterceptor } from "./services/http-interceptors/loading-interceptor";
import { JsonDateInterceptor } from "./services/http-interceptors/json-date-interceptor";
import { ApiService, PageTitleService } from "./services/_index";

import { AppQuery, GlobalErrorQuery } from "./stores/_index";
import { MaintenanceComponent } from "./components/error-screens/maintenance/maintenance.component";

@NgModule({
	declarations: [
		NotFoundComponent,
		MaintenanceComponent,
		TechnicalDifficultyComponent
	],
	imports: [
		CommonModule,
		CoreRoutingModule,
		MatIconModule,
		CoreUiModule,
		HttpClientModule,
		HttpClientJsonpModule,
		SideSheetServiceModule,
		ThemeServiceModule
	],
	providers: [
		ApiService,
		AppLoadService,
		PageTitleService,
		AppQuery,
		GlobalErrorQuery,
		{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorErrorService, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true },
		{ provide: ErrorHandler, useClass: ErrorHandlerService },
		{
			provide: APP_INITIALIZER,
			useFactory: getConfig,
			deps: [AppLoadService, EnvConfigService, AppConfigService],
			multi: true
		}
	]
})

export class CoreModule { }
