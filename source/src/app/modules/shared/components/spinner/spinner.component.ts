import { Component } from "@angular/core";
import { LoadingService } from "@modules/core/services/loading/loading.service";

@Component({
	selector: "ubi-spinner",
	templateUrl: "./spinner.component.html"
})
export class SpinnerComponent {

	constructor(public loadingService: LoadingService) { }

}
