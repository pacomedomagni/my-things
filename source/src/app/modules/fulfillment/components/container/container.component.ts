import { Component } from "@angular/core";
import { NotificationService } from "@pgr-cla/core-ui-components";
import { BehaviorSubject, Observable, firstValueFrom, pipe } from "rxjs";
import { FulfillmentService } from "../../services/fulfillment.service";
import { PlugInService } from "../../../plug-in/services/plug-in.service";
import { DialogService } from "../../../shared/services/dialog-service/dialog.service";

interface IProgressBar {
	progress: number;
}

@Component({
	selector: "ubi-container",
	templateUrl: "./container.component.html",
	styleUrls: ["./container.component.scss"]
})
export class ContainerComponent {
	today = new Date();

	private total: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);
	public total$: Observable<number> = this.total.asObservable();

	private done: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);
	public done$: Observable<number> = this.done.asObservable();
	public isWorking = false;

	lastChangeDateTime = new Date();
	progressBar: IProgressBar =
		{
			progress: 0
		};
	value: number;

	constructor(
		private notificationService: NotificationService,
		private fulfillmentService: FulfillmentService,
		private plugInService: PlugInService,
		private dialogService: DialogService) { }

	updateProgressBar(total: number, value: number) {
		this.done.next(value);
		this.progressBar.progress = (value / total) * 100;
		if (value === total) {
			this.notificationService.success(`${total} devices assigned successfully`);
			this.total.next(0);
		}
	}
	fulfillDevices(): void {
		this.isWorking = true;
		this.fulfillmentService.assignDevices(this.lastChangeDateTime).subscribe(pipe(result => {
			const total = result.length;
			if (total > 0) {
				this.dialogService.openConfirmationDialog({
					title: "Assign Plug-In Devices.",
					subtitle: `There are ${total} Device to assign.`,
					message: `Would you like to assign them, now?`,
					confirmText: "Yes"
				});

				this.dialogService.confirmed().subscribe(async (response) => {
					if (response) {
						this.total.next(total);
						this.done.next(0);
						this.value = 0;
						let groups = this.splitArray(result, 9);
						for (const group of groups) {
							for  (const d of group) {
								await this.do(d);
							}
						}
				}
			}
				);

			}
			else {
				this.notificationService.success(`no devices to assigned`);
			}
		}));
		this.isWorking = false;
	}

	async do(d: any) {
		await firstValueFrom(
			this.fulfillmentService.assignPlugInDevice(d.policyNumber, d.participantSeqId, d.state)
			);

			this.updateProgressBar(this.total.value, ++this.value);
			if (this.total.value === this.value) {
				this.notificationService.success(`${this.total} Devices Assigned.`);
			}
	}

	 splitArray(array, size): any[] {
		let result = [];
		let newSize = Math.floor(array.length / size) +
		((array.length % size > 0) ? 1 : 0);
		for (let i = 0; i < array.length; i += newSize) {
			let chunk = array.slice(i, i + newSize);
			result.push(chunk);
		}
		return result;
	}
}
