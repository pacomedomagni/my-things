import { ApplicationGroupIds, ApplicationGroupMetadata } from "@modules/shared/data/_index";

import { ParticipantGuard } from "@modules/shared/guards/_index";
import { autoSpy } from "autoSpy";
import { HomeContainerComponent } from "./container.component";

function setup() {
	const participantGuard = autoSpy(ParticipantGuard);
	const builder = {
		participantGuard,
		default() {
			return builder;
		},
		build() {
			return new HomeContainerComponent(participantGuard);
		}
	};

	return builder;
}

describe("HomeContainerComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("when shouldDisplay is called with non-prod ready app it should return false", () => {
		const { build } = setup().default();
		const component = build();
		const app = { isProdReady: false } as ApplicationGroupMetadata;

		expect(component.shouldDisplay(app)).toBeFalsy();
	});

	it("when shouldDisplay is called with home app it should return false", () => {
		const { build } = setup().default();
		const component = build();
		const app = { isProdReady: true, id: ApplicationGroupIds.Home } as ApplicationGroupMetadata;

		expect(component.shouldDisplay(app)).toBeFalsy();
	});

	it("when shouldDisplay is called and guard cant display it should return false", () => {
		const { build, participantGuard } = setup().default();
		const component = build();
		const app = { isProdReady: true } as ApplicationGroupMetadata;
		participantGuard.canDisplayNavLink.mockReturnValueOnce(false);

		expect(component.shouldDisplay(app)).toBeFalsy();
	});

	it("when shouldDisplay is called and guard can display it should return true", () => {
		const { build, participantGuard } = setup().default();
		const component = build();
		const app = { isProdReady: true } as ApplicationGroupMetadata;
		participantGuard.canDisplayNavLink.mockReturnValueOnce(true);

		expect(component.shouldDisplay(app)).toBeTruthy();
	});

});
