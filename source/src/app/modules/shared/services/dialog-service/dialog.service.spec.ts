import { MatDialog } from "@angular/material/dialog";
import { autoSpy } from "autoSpy";
import { DialogService } from "./dialog.service";

function setup() {
	const dialog = autoSpy(MatDialog);

	const builder = {
		default() {
			return builder;
		},
		build() {
			return new DialogService(dialog);
		}
	};

	return builder;
}

describe("DialogService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

});
