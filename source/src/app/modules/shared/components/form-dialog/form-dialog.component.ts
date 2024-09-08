import { AfterViewInit, Component, HostListener, Inject, InjectionToken, Injector, Optional, ViewChild } from "@angular/core";
import * as clone from "clone";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export const FORM_DIALOG_CONTENT = new InjectionToken<string>("app.formDiag.content");

@Component({
	selector: "ubi-form-dialog",
	templateUrl: "./form-dialog.component.html",
	styleUrls: ["./form-dialog.component.scss"]
})
export class FormDialogComponent implements AfterViewInit {
	@ViewChild("dialogForm", { static: false }) form: NgForm;

	loaded = false;
	contentInjector: Injector;
	clonedModel: any;

	constructor(
		@Optional() @Inject(MAT_DIALOG_DATA) public data: {
			cancelText: string;
			component: Component;
			componentData: any;
			confirmText: string;
			formModel: any;
			title: string;
			subtitle: string;
		},
		private dialogRef: MatDialogRef<FormDialogComponent>,
		public injector: Injector) {

	}

	ngAfterViewInit(): void {
		this.clonedModel = clone(this.data.formModel);

		this.contentInjector = Injector.create({
			providers: [{ provide: FORM_DIALOG_CONTENT, useValue: { model: this.clonedModel, data: this.data.componentData, form: this.form } }],
			parent: this.injector
		});

		setTimeout(() => {
			this.loaded = true;
		});

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
		this.close(this.clonedModel);
	};

	private close(formData?: any): void {
		this.dialogRef.close(formData);
	}

	@HostListener("keydown.esc")
	public onEsc(): void {
		this.close(false);
	}
}
