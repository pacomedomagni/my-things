import { BillingTransaction, Participant, PlugInDeviceAssignment } from "@modules/shared/data/resources";
import { BillingTransactionType, ParticipantReasonCode } from "@modules/shared/data/enums";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";

import { ApiService } from "@modules/core/services/_index";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PlugInService {

	private CONTROLLER = "/Device";

	constructor(
		private api: ApiService,
		private policyQuery: PolicyQuery,
		private policyService: PolicyService) { }

	assignPlugInDevice(
		policyNumber: string,
		participantSequenceId: number,
		state: string): Observable<PlugInDeviceAssignment> {
		return this.api.post<PlugInDeviceAssignment>({
			uri: `${this.CONTROLLER}/AssignPlugInDevice`,
			payload: { policyNumber, participantSequenceId, state }
		}).pipe(
			tap(_ => this.updatePlugInDeviceInfo())
		);
	}

	unsolicitedDeviceReturn(
		policyNumber: string,
		policyPeriodSeqId: number,
		policyInceptionDate: Date,
		isWithinWindow: boolean,
		participant: Participant
	): Observable<any> {
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/UnsolicitedDeviceReturn`,
			payload: {
				policyNumber,
				participantSeqId: participant.sequenceId,
				participantId: participant.id,
				deviceSeqId: participant.deviceDetails.sequenceId,
				deviceSerialNumber: participant.deviceDetails.serialNumber,
				policyPeriodSeqId,
				qualifyingPeriodSeqId: participant.qualifyingPeriodSeqId,
				vehicleSeqId: participant.vehicleDetails.seqId,
				policyInceptionDate,
				firstContactDate: participant.firstContactDate,
				isWithinWindow,
				programType: participant.programType
			}
		}).pipe(tap(_ => this.updatePlugInDeviceInfo()));
	}

	private updatePlugInDeviceInfo(): void {
		const policyNumber = this.policyQuery.getActiveId() as string;
		this.policyService.getPolicyByNumber(policyNumber).subscribe();
	}
	returnPlugInDevice(
		participantSeqId: number,
		deviceSerialNumber: string): Observable<boolean> {
		return this.api.post<boolean>({
			uri: `${this.CONTROLLER}/ReturnDevice?participantSeqId=${participantSeqId}&deviceSerialNumber=${deviceSerialNumber}`
		}).pipe(
			tap(_ => this.updatePlugInDeviceInfo())
		);
	}

	getReturnedDevices(participantSeqId: number): Observable<string[]> {
		return this.api.get<string[]>({ uri: `${this.CONTROLLER}/GetReturnedDevicesEligibleForReturn?participantSeqId=${participantSeqId}` });
	}

	isEligibleForFeeChange(deviceSeqId: number, participantReasonCode: ParticipantReasonCode): Observable<boolean> {
		return this.api.post<boolean>({
			uri: `${this.CONTROLLER}/IsEligibleForFeeChange`,
			payload: { deviceSeqId, participantReasonCode }
		});
	}

	getCurrentBillingTransaction(participantSeqId: number): Observable<BillingTransaction> {
		return this.api.get<BillingTransaction>({ uri: `${this.CONTROLLER}/CurrentBillingTransaction/${participantSeqId}` });
	}

	addBillingTransaction(participantSeqId: number, deviceSeqId: number, deviceSerialNumber: string, transactionType: BillingTransactionType): Observable<any> {
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/AddBillingTransaction`,
			payload: {
				participantSeqId,
				deviceSeqId,
				deviceSerialNumber,
				transactionType
			}
		});
	}
}
