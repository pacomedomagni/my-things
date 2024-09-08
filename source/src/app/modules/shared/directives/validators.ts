import { AbstractControl, NG_VALIDATORS, Validator, Validators } from "@angular/forms";
import { Directive, Input } from "@angular/core";

/* eslint-disable @angular-eslint/directive-selector */

@Directive({
	selector: "[min][matinput],[min][ngModel]",
	providers: [{ provide: NG_VALIDATORS, useExisting: MinDirective, multi: true }]
})
export class MinDirective implements Validator {
	@Input() min: number;

	validate(control: AbstractControl): { [key: string]: any } {
		return Validators.min(this.min)(control);
	}
}

@Directive({
	selector: "[max][matinput],[max][ngModel]",
	providers: [{ provide: NG_VALIDATORS, useExisting: MaxDirective, multi: true }]
})
export class MaxDirective implements Validator {
	@Input() max: number;

	validate(control: AbstractControl): { [key: string]: any } {
		return Validators.max(this.max)(control);
	}
}

/* eslint-enable @angular-eslint/directive-selector */
