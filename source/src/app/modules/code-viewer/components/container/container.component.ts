import { Component } from "@angular/core";
import * as vkbeautify from "vkbeautify";
import { NotificationService } from "@pgr-cla/core-ui-components";
let beautify = require("json-beautify");

@Component({
	selector: "ubi-container",
	templateUrl: "./container.component.html",
	styleUrls: ["./container.component.scss"]
})
export class ContainerComponent {

	public content = ``;
	checked = false;
	constructor(private notificationService: NotificationService) { }

	onCheckedChanged() {
		if (this.checked) {
			this.textFormat(this.content);
		}
		else {
			this.textFlatten(this.content);
		}
	}

	textChanged(input: string) {
		if (this.checked) {
			this.textFormat(input);
		}
		else {
			this.textFlatten(input);
		}
	}

	textFlatten(input: string) {
		this.content = input.replace(/(\n\s+)/g, " ").replace(/(\n)/g, "");
	}

	textFormat(input: string) {
		if (input.indexOf("<") > -1) {
			try {
				input = (vkbeautify.xml(input));
				this.content = input;
			}
			catch {
				this.notificationService.error("Could not parse XML.");
			}
		}
		else if (input.indexOf("{") > -1) {
			try {
				JSON.parse(input);
				input = beautify(JSON.parse(input), null, 2);
				this.content = input;
			}
			catch {
				this.notificationService.error("Could not parse JSON");
			}
		}
	}
}
