import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "ubi-forbidden",
	templateUrl: "./forbidden.component.html",
	styleUrls: ["./forbidden.component.scss"]
})
export class ForbiddenComponent implements OnInit {

	@Input() helpDeskNumber = "888-746-4500";

	ngOnInit(): void {
		// sessionStorage.clear();
	}
}
