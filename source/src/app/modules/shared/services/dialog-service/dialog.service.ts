import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { map, take } from "rxjs/operators";

import { CUI_DIALOG_WIDTH } from "@pgr-cla/core-ui-components";
import { ConfirmationDialogComponent } from "@modules/shared/components/confirmation-dialog/confirmation-dialog.component";
import { FormDialogComponent } from "@modules/shared/components/form-dialog/form-dialog.component";
import { InformationDialogComponent } from "@modules/shared/components/information-dialog/information-dialog.component";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface DialogOptions {
	title: string;
	subtitle?: string;
	confirmText?: string;
	hideCancelButton?: boolean;
	message?: string;
	width?: string;
}

export interface InformationDialogOptions<T> extends DialogOptions {
	component: T;
	componentData?: any;
}

export interface FormDialogOptions<T> extends InformationDialogOptions<T> {
	formModel: any;
}

@Injectable()
export class DialogService {

	static readonly DefaultDialogOptions = {
		width: CUI_DIALOG_WIDTH.SMALL,
		panelClass: "cui-dialog",
		data: {}
	};

	private dialogRef: MatDialogRef<any>;

	constructor(private dialog: MatDialog) { }

	openConfirmationDialog({
		title,
		subtitle,
		message,
		confirmText,
		hideCancelButton = false,
		width
	}: DialogOptions): void {
		this.dialogRef = this.openDialog(ConfirmationDialogComponent, {
			...DialogService.DefaultDialogOptions,
			...{
				width: width ?? DialogService.DefaultDialogOptions.width,
				data: {
					cancelText: "Cancel",
					confirmText: confirmText ?? "Yes",
					message,
					title,
					subtitle,
					hideCancelButton
				}
			}
		});
	}

	openFormDialog<T>({
		title,
		subtitle,
		component,
		formModel,
		componentData,
		width
	}: FormDialogOptions<T>): void {
		this.dialogRef = this.openDialog(FormDialogComponent, {
			...DialogService.DefaultDialogOptions,
			...{
				width: width ?? DialogService.DefaultDialogOptions.width,
				data: {
					component,
					componentData,
					cancelText: "Cancel",
					confirmText: "Ok",
					formModel,
					title,
					subtitle
				}
			}
		});
	}

	openInformationDialog<T>({
		title,
		subtitle,
		component,
		componentData,
		width
	}: InformationDialogOptions<T>): void {
		this.dialogRef = this.openDialog(InformationDialogComponent, {
			...DialogService.DefaultDialogOptions,
			...{
				width: width ?? DialogService.DefaultDialogOptions.width,
				data: {
					component,
					componentData,
					confirmText: "Ok",
					title,
					subtitle
				}
			}
		});
	}

	openDialog<T>(TCtor: new (...args: any[]) => T, data: MatDialogConfig = DialogService.DefaultDialogOptions): MatDialogRef<T, any> {
		const dialogConfig = data;
		dialogConfig.autoFocus = true;
		const dialogRef = this.dialog.open(TCtor, dialogConfig);
		return dialogRef;
	}

	confirmed<T extends any>(): Observable<T> {
		return this.dialogRef.afterClosed()
			.pipe(take(1), map(res => {
				return res;
			}));
	}

}
