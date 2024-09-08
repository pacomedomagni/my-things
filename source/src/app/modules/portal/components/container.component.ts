import { Component } from "@angular/core";

@Component({
	selector: "ubi-portal-container",
	template: `
		<ubi-policy-search></ubi-policy-search>
		<ubi-policy-details></ubi-policy-details>
`
})
export class PortalContainerComponent {
	constructor() { }
}
