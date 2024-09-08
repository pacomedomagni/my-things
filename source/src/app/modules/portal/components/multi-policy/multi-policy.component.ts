import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from "@angular/core";

import { ID } from "@datorama/akita";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Policy } from "@modules/shared/data/resources";
import { PolicyQuery } from "@modules/shared/stores/_index";

@Component({
	selector: "ubi-multi-policy-details",
	templateUrl: "./multi-policy.component.html",
	styleUrls: ["./multi-policy.component.scss"]
})
export class MultiPolicyDetailsComponent implements AfterViewInit {

	displayedColumns: string[] = ["policyNumber", "pni", "participantStatus", "mobileStatus", "select"];
	selectedIndex: number;
	dataSource: MatTableDataSource<Policy> = new MatTableDataSource([]);

	@ViewChild(MatPaginator) paginator: MatPaginator;

	@Output() policySelection: EventEmitter<ID> = new EventEmitter();

	constructor(public policyQuery: PolicyQuery) {
		policyQuery.policies$.subscribe(x => this.dataSource.data = x);
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	selectRow(index: number): void {
		this.selectedIndex = index;
	}

	selectPolicy(policyNumber: ID): void {
		this.policySelection.emit(policyNumber);
	}
}
