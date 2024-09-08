import { Component, HostListener, Inject, InjectionToken, Injector, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export const INFO_DIALOG_CONTENT = new InjectionToken<string>("app.infoDiag.content");

@Component({
	selector: "ubi-information-dialog",
	templateUrl: "./information-dialog.component.html",
	styleUrls: ["./information-dialog.component.scss"]
})
export class InformationDialogComponent {
	contentInjector: Injector;

	constructor(
		@Optional() @Inject(MAT_DIALOG_DATA) public data: {
			confirmText: string;
			component: Component;
			componentData: any;
			title: string;
			subtitle: string;
		},
		private dialogRef: MatDialogRef<InformationDialogComponent>,
		public injector: Injector) {
		this.contentInjector = Injector.create({ providers: [{ provide: INFO_DIALOG_CONTENT, useValue: data.componentData }], parent: injector });
	}

	shouldDisplaySubtitle(): boolean {
		return this.data.subtitle ? true : false;
	}

	onClose = () => {
		this.close();
	};

	onCancel = () => {
		this.close();
	};

	onConfirm = () => {
		this.close();
	};

	private close(): void {
		this.dialogRef.close();
	}

	@HostListener("keydown.esc")
	public onEsc(): void {
		this.close();
	}
}
