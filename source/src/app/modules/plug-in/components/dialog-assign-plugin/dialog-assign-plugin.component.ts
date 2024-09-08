import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
	selector: "ubi-dialog-assign-plugin",
	templateUrl: "./dialog-assign-plugin.component.html",
	styleUrls: ["./dialog-assign-plugin.component.scss"]

})
export class DialogAssignPluginComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { name: string },
		private dialogRef: MatDialogRef<DialogAssignPluginComponent>
	) { }

	ngOnInit(): void {
	}

	onClose = () => {
		this.dialogRef.close();
	};

	onCancel = () => {
		this.dialogRef.close();
	};

	onConfirm = () => {
		this.dialogRef.close({});
	};
}
