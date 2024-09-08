import { MatDialogRef } from "@angular/material/dialog";

import { autoSpy } from "autoSpy";
import { DialogEnrollmentComponent } from "./dialog-enrollment.component";

function setup() {
	const injectedData = { model:{connectedDays: 150, ubiValue: 7.777}, parentForm:{}  };

	const dialogRef = autoSpy(MatDialogRef) as MatDialogRef<DialogEnrollmentComponent>;
	const builder = {
		dialogRef,
		default() {
			return builder;
		},
		build() {
			const comp = new DialogEnrollmentComponent(injectedData);
			return comp;
		}
	};

	return builder;
}

describe("DialogEnrollmentComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.injectedData.model.connectedDays).toEqual(150);
		expect(component.injectedData.model.ubiValue).toEqual(7.777);
		expect(component.injectedData.parentForm).toEqual({});
	});
});

