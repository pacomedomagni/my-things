import { Component, Input } from "@angular/core";

@Component({
	selector: "ubi-data-list",
	templateUrl: "./data-list.component.html",
	styleUrls: ["./data-list.component.scss"]
})
export class DataListComponent {
	@Input() density: "condensed" | "normal" = "normal";
	@Input() border = true;
}
