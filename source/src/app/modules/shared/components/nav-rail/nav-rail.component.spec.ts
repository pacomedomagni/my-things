import { AuthService } from "@modules/auth/services/auth.service";
import { ParticipantGuard } from "@modules/shared/guards/_index";
import { SideSheetService } from "@pgr-cla/core-ui-components";
import { autoSpy } from "autoSpy";
import { NavRailComponent } from "./nav-rail.component";

function setup(): any {
	const sideSheetService = autoSpy(SideSheetService);
	const routeGuard = autoSpy(ParticipantGuard);
	const authService = autoSpy(AuthService);
	const builder = {
		sideSheetService,
		routeGuard,
		authService,
		default(): any {
			return builder;
		},
		build(): any {
			return new NavRailComponent(sideSheetService, authService, routeGuard);
		}
	};

	return builder;
}

describe("NavRailComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
