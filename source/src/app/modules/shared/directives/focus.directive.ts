import { Directive, AfterViewInit, ElementRef } from "@angular/core";

@Directive({
	selector: "[ubiFocus]"
})
export class FocusDirective implements AfterViewInit {
	constructor(private host: ElementRef) { }

	ngAfterViewInit(): void {
		this.host.nativeElement.focus();
	}
}
