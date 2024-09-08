import { Component, Input } from "@angular/core";

@Component({
	selector: "ubi-page-header",
	templateUrl: "./page-header.component.html",
	styleUrls: ["./page-header.component.scss"]
})

export class PageHeaderComponent {
	@Input() headerText: string;

	constructor() { }
}
