import { MatDialogRef } from "@angular/material/dialog";

import { autoSpy } from "autoSpy";
import { DialogStageGrades50Component } from "./dialog-stage-grades50.component";

function setup() {
	const injectedData = { data: { enrollmentDate: new Date(2021, 4, 1), expirationDate: new Date(2021, 10, 1) }, model: { ubiValue: 7.777 }, parentForm: {} };

	const dialogRef = autoSpy(MatDialogRef) as MatDialogRef<DialogStageGrades50Component>;
	const builder = {
		dialogRef,
		default() {
			return builder;
		},
		build() {
			const comp = new DialogStageGrades50Component(injectedData);
			return comp;
		}
	};

	return builder;
}

describe("DialogStageGrades50Component", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.injectedData.model.ubiValue).toEqual(7.777);
		expect(component.enrollmentDate).toEqual(component.injectedData.data.enrollmentDate);
		expect(component.expirationDate).toEqual(component.injectedData.data.expirationDate);
		expect(component.injectedData.parentForm).toEqual({});
	});
});

