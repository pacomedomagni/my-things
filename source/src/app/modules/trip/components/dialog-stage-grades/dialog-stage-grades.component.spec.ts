import { MatDialogRef } from "@angular/material/dialog";

import { autoSpy } from "autoSpy";
import { DialogStageGradesComponent } from "./dialog-stage-grades.component";

function setup() {
	const injectedData = { model: { connectedDays: 150, ubiValue: 7.777 }, data: { minimumValue: 1.6, maximumValue: 6.25 }, parentForm: {} };

	const dialogRef = autoSpy(MatDialogRef) as MatDialogRef<DialogStageGradesComponent>;
	const builder = {
		dialogRef,
		default() {
			return builder;
		},
		build() {
			const comp = new DialogStageGradesComponent(injectedData);
			return comp;
		}
	};

	return builder;
}

describe("DialogStageGradesComponent", () => {

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
		expect(component.injectedData.data.minimumValue).toEqual(1.6);
		expect(component.injectedData.data.maximumValue).toEqual(6.25);
		expect(component.injectedData.parentForm).toEqual({});
	});
});

