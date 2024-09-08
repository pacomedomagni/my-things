import { AfterViewInit, Component, EventEmitter, Output, ViewChild, Input } from "@angular/core";

import { ID } from "@datorama/akita";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Policy } from "@modules/shared/data/resources";

@Component({
	selector: "ubi-are-multi-policy-details",
	templateUrl: "./multi-policy.component.html",
	styleUrls: ["./multi-policy.component.scss"]
})

export class AreMultiPolicyDetailsComponent implements AfterViewInit {

	displayedColumns: string[] = ["policyNumber", "mobileStatus"];
	selectedIndex: number;
	dataSource: MatTableDataSource<Policy> = new MatTableDataSource([]);
	@Input() policies: Policy[];

	@ViewChild(MatPaginator) paginator: MatPaginator;

	@Output() policySelection: EventEmitter<ID> = new EventEmitter();

	constructor() {
	}

	ngAfterViewInit(): void {
		this.dataSource = new MatTableDataSource(this.policies);
		this.dataSource.paginator = this.paginator;
	}

	selectRow(index: number): void {
		this.selectedIndex = index;
	}

	selectPolicy(policyNumber: ID): void {
		this.policySelection.emit(policyNumber);
	}
}
