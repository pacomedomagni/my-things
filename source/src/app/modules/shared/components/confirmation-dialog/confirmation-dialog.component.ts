import { Component, HostListener, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
	selector: "ubi-confirmation-dialog",
	templateUrl: "./confirmation-dialog.component.html",
	styleUrls: ["./confirmation-dialog.component.scss"]
})
export class ConfirmationDialogComponent {

	constructor(
		@Optional() @Inject(MAT_DIALOG_DATA) public data: {
			cancelText: string;
			confirmText: string;
			message: string;
			title: string;
			subtitle: string;
			hideCancelButton: boolean;
		},
		private dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

	shouldDisplaySubtitle(): boolean {
		return this.data.subtitle ? true : false;
	}

	onClose = () => {
		this.close(false);
	};

	onCancel = () => {
		this.close(false);
	};

	onConfirm = () => {
		this.close(true);
	};

	private close(value: boolean): void {
		this.dialogRef.close(value);
	}

	@HostListener("keydown.esc")
	public onEsc(): void {
		this.close(false);
	}
}
