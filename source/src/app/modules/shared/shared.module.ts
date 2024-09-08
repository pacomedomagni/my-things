import { CommonModule, DatePipe } from "@angular/common";
import { CoreUiModule, ThemePickerModule } from "@pgr-cla/core-ui-components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxMatDateAdapter, NgxMatDatetimePickerModule, NgxMatTimepickerModule } from "@angular-material-components/datetime-picker";
import { NgxMatMomentAdapter, NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { AppDataService, DialogService, HelperService } from "./services/_index";
import {
	AppHeaderComponent,
	ConfirmationDialogComponent,
	DataListComponent,
	DataListRowComponent,
	EmptyStateComponent,
	FormDialogComponent,
	InformationDialogComponent,
	NavRailComponent,
	PageHeaderComponent,
	PolicyHeaderComponent,
	SideNavBarComponent,
	SideNavContainerComponent,
	SpinnerComponent,
	WrapperComponent
} from "./components/_index";
import { DynamicPipe, NullCoalescePipe, PhoneNumberPipe } from "./pipes/_index";
import { MaxDirective, MinDirective } from "./directives/validators";
import { ParticipantGuard, PolicyGuard } from "./guards/_index";

import { FocusDirective } from "./directives/focus.directive";
import { MaterialModule } from "./material.module";
// import { DATE_FORMATS } from "./data/date-formats";

@NgModule({
	imports: [
		CommonModule,
		CoreUiModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		RouterModule,
		ThemePickerModule,
		NgxMatDatetimePickerModule,
		NgxMatTimepickerModule,
		NgxMatMomentModule

	],
	declarations: [
		AppHeaderComponent,
		DataListComponent,
		DataListRowComponent,
		DynamicPipe,
		EmptyStateComponent,
		FocusDirective,
		PageHeaderComponent,
		PhoneNumberPipe,
		MinDirective,
		MaxDirective,
		NavRailComponent,
		NullCoalescePipe,
		SideNavBarComponent,
		SideNavContainerComponent,
		WrapperComponent,
		SpinnerComponent,
		PolicyHeaderComponent,
		ConfirmationDialogComponent,
		InformationDialogComponent,
		FormDialogComponent
	],
	exports: [
		AppHeaderComponent,
		CoreUiModule,
		DataListComponent,
		DataListRowComponent,
		DynamicPipe,
		EmptyStateComponent,
		FocusDirective,
		FormsModule,
		MaterialModule,
		MinDirective,
		MaxDirective,
		NavRailComponent,
		NullCoalescePipe,
		PageHeaderComponent,
		PhoneNumberPipe,
		PolicyHeaderComponent,
		ReactiveFormsModule,
		SideNavContainerComponent,
		WrapperComponent,
		SpinnerComponent,
		NgxMatDatetimePickerModule,
		NgxMatTimepickerModule,
		NgxMatMomentModule

	],
	providers: [
		ParticipantGuard,
		PolicyGuard,
		DatePipe,
		AppDataService,
		DialogService,
		HelperService,
		// { provide: NGX_MAT_DATE_FORMATS, useValue: DATE_FORMATS },
		{ provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter }
	]
})
export class SharedModule { }
