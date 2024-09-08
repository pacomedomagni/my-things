import { fakeAsync, tick } from "@angular/core/testing";

import { PolicyQuery } from "@modules/shared/stores/_index";
import { autoSpy } from "autoSpy";
import { ParticipantsComponent } from "./participants.component";

function setup() {
	const policyQuery = autoSpy(PolicyQuery);
	const builder = {
		policyQuery,
		default() {
			return builder;
		},
		build() {
			return new ParticipantsComponent(policyQuery);
		}
	};

	return builder;
}

describe("ParticipantsComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
		expect(component.disableAnimation).toBeTruthy();
	});

	it("when ngAfterViewInit is called it should enabled animation", fakeAsync(() => {
		const { build } = setup().default();
		const component = build();

		component.ngAfterViewInit();
		tick(250);

		expect(component.disableAnimation).toBeFalsy();
	}));

});
