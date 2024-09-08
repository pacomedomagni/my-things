import { HttpClient } from "@angular/common/http";
import { autoSpy } from "autoSpy";
import { NotificationService } from "@pgr-cla/core-ui-components";
import { CookieService } from "ngx-cookie-service";
import { LoadingService } from "../loading/loading.service";
import { ApiService } from "./api.service";
import { ConfigurationSettings, IAppConfig, IConnectionsConfig } from "../configuration/config-info";

function setup() {
	const httpClient = autoSpy(HttpClient);
	const authStorage: any = undefined;
	const cookieService = autoSpy(CookieService);
	const notificationService = autoSpy(NotificationService);
	const loadingService = autoSpy(LoadingService);

	ConfigurationSettings.appSettings = {
		connections: {

		} as IConnectionsConfig
	} as IAppConfig;

	const builder = {
		httpClient,
		authStorage,
		loadingService,
		notificationService,
		default() {
			return builder;
		},
		build() {
			return new ApiService(httpClient, authStorage, loadingService, notificationService);
		}
	};

	return builder;
}

describe("ApiService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();
		expect(component).toBeTruthy();
	});

});
