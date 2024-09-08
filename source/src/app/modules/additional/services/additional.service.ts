import { MobileDeviceRegistration, Participant } from "@modules/shared/data/resources";
import { DeviceExperience, ProgramType } from "@modules/shared/data/enums";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";

import { ApiService } from "@modules/core/services/_index";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AdditionalService {
	private MOBILE_CONTROLLER = "/MobileRegistration";
	private PLUGIN_CONTROLLER = "/Device";

	constructor(
		private api: ApiService,
		private policyQuery: PolicyQuery,
		private policyService: PolicyService) { }

	changeNonInstallerDatesMobile(participantSequenceId: number, policyStartDate: string, enrollmentDate: string): Observable<any> {
		return this.api.post<any>({
			uri: `${this.MOBILE_CONTROLLER}/ChangeNonInstallerDates`,
			payload: { participantSequenceId, policyStartDate, enrollmentDate }
		}).pipe(
			tap(_ => this.refreshPolicy())
		);
	}

	changeInceptionDates(policyPeriodSeqId: number, inceptionDate: string): Observable<any> {
		return this.api.post<any>({
			uri: `${this.MOBILE_CONTROLLER}/ChangeNonInstallerInceptionDates`,
			payload: { policyPeriodSeqId, inceptionDate }
		}).pipe(
			tap(_ => this.refreshPolicy())
		);
	}

	nonInstallerOptOutMobile(
		policyNumber: string,
		policyPeriodSeqId: number,
		inceptionDate: Date,
		participantSeqId: number,
		participantId: string,
		deviceSeqId: number,
		programType: ProgramType): Observable<any> {
		return this.api.post<any>({
			uri: `${this.MOBILE_CONTROLLER}/NonInstallerOptOut`,
			payload: {
				policyNumber,
				policyPeriodSeqId,
				inceptionDate,
				participantSeqId,
				participantId,
				deviceSeqId,
				programType
			}
		}).pipe(
			tap(_ => this.refreshPolicy())
		);
	}

	changeNonCommunicatorDatesMobile(deviceSequenceId: number, lastContactDate: string, lastUploadDate: string): Observable<any> {
		return this.api.post<any>({
			uri: `${this.MOBILE_CONTROLLER}/ChangeNonCommunicatorDates`,
			payload: { deviceSequenceId, lastContactDate, lastUploadDate }
		}).pipe(
			tap(_ => this.refreshPolicy())
		);
	}

	nonCommunicatorOptOutMobile(
		policyNumber: string,
		policyPeriodSeqId: number,
		inceptionDate: Date,
		participantSeqId: number,
		participantId: string,
		deviceSeqId: number,
		programType: ProgramType): Observable<any> {
		return this.api.post<any>({
			uri: `${this.MOBILE_CONTROLLER}/NonCommunicatorOptOut`,
			payload: {
				policyNumber,
				policyPeriodSeqId,
				inceptionDate,
				participantSeqId,
				participantId,
				deviceSeqId,
				programType
			}
		}).pipe(
			tap(_ => this.refreshPolicy())
		);
	}

	changeNonInstallerDatesPlugin(participantSeqId: number, serialNumber: string, shipDate: string, wirelessStatus: string): Observable<any> {
		return this.api.post<any>({
			uri: `${this.PLUGIN_CONTROLLER}/ChangeNonInstallerDates`,
			payload: { participantSeqId, serialNumber, shipDate, wirelessStatus }
		}).pipe(
			tap(_ => this.refreshPolicy())
		);
	}

	nonInstallerOptOutPlugin(
		policyNumber: string,
		policyPeriodSeqId: number,
		qualifyingPeriodSeqId: number,
		inceptionDate: Date,
		deviceSeqId: number,
		participantSeqId: number,
		participantId: string,
		deviceSerialNumber,
		vehicleSeqId: number): Observable<any> {
		return this.api.post<any>({
			uri: `${this.PLUGIN_CONTROLLER}/NonInstallerOptOut`,
			payload: {
				policyNumber,
				policyPeriodSeqId,
				qualifyingPeriodSeqId,
				inceptionDate,
				deviceSeqId,
				participantSeqId,
				participantId,
				deviceSerialNumber,
				vehicleSeqId
			}
		}).pipe(
			tap(_ => this.refreshPolicy())
		);
	}

	changeNonCommunicatorDatesPlugin(
		participantSeqId: number,
		serialNumber: string,
		firstContactDate: string,
		lastContactDate: string,
		lastUploadDate: string,
		shipDate: string,
		wirelessStatus: string): Observable<any> {
		return this.api.post<any>({
			uri: `${this.PLUGIN_CONTROLLER}/ChangeNonCommunicatorDates`,
			payload: { participantSeqId, serialNumber, firstContactDate, lastContactDate, lastUploadDate, shipDate, wirelessStatus }
		}).pipe(
			tap(_ => this.refreshPolicy())
		);
	}

	nonCommunicatorOptOutPlugin(
		policyNumber: string,
		policyPeriodSeqId: number,
		qualifyingPeriodSeqId: number,
		inceptionDate: Date,
		deviceSeqId: number,
		participantSeqId: number,
		participantId: string,
		deviceSerialNumber,
		vehicleSeqId: number,
		programType: ProgramType): Observable<any> {
		return this.api.post<any>({
			uri: `${this.PLUGIN_CONTROLLER}/NonCommunicatorOptOut`,
			payload: {
				policyNumber,
				policyPeriodSeqId,
				qualifyingPeriodSeqId,
				inceptionDate,
				deviceSeqId,
				participantSeqId,
				participantId,
				deviceSerialNumber,
				vehicleSeqId,
				programType
			}
		}).pipe(
			tap(_ => this.refreshPolicy())
		);
	}

	automatedOptInPlugin(
		policyNumber: string,
		policyPeriodSeqId: number,
		inceptionDate: Date,
		participant: Participant): Observable<any> {
		return this.api.post<any>({
			uri: `${this.PLUGIN_CONTROLLER}/AutomatedOptIn`,
			payload: {
				policyNumber,
				participantSeqId: participant.sequenceId,
				participantId: participant.id,
				deviceSerialNumber: participant.deviceDetails.serialNumber,
				policyPeriodSeqId,
				inceptionDate
			}
		}).pipe(tap(_ => this.refreshPolicy()));
	}

	automatedOptInMobile(
		policyNumber: string,
		policyPeriodSeqId: number,
		policyInceptionDate: Date,
		participant: Participant,
		vehicleId: string,
		appName: string
	): Observable<MobileDeviceRegistration> {
		return this.api.post<MobileDeviceRegistration>({
			uri: `${this.MOBILE_CONTROLLER}/AutomatedOptIn`,
			payload: {
				deviceSeqId: participant.mobileDetails.sequenceId,
				mobileRegistrationCode: participant.mobileDetails.phoneNumber,
				participantId: participant.id,
				participantSeqId: participant.sequenceId,
				policyInceptionDate,
				policyNumber,
				policyPeriodSeqId,
				programType: participant.programType,
				vehicleId,
				appName
			}
		}).pipe(tap(_ => this.refreshPolicy()));
	}

	switchMobileToObd(policyNumber: string, participantSeqId: number): Observable<any> {
		return this.api.post<any>({
			uri: `${this.MOBILE_CONTROLLER}/SwitchToOBD`,
			payload: { policyNumber, participantSeqId }
		}).pipe(tap(_ => this.refreshPolicy()));
	}

	mobileNotFitOptOut(
		policyNumber: string,
		policyPeriodSeqId: number,
		policyInceptionDate: Date,
		participant: Participant): Observable<any> {
		return this.api.post<any>({
			uri: `${this.MOBILE_CONTROLLER}/MobileNotFitOptOut`,
			payload: {
				policyNumber,
				participantSeqId: participant.sequenceId,
				participantId: participant.id,
				policyPeriodSeqId,
				policyInceptionDate,
				programType: participant.programType
			}
		}).pipe(tap(_ => this.refreshPolicy()));
	}

	updateDeviceContactDates(
		participant: Participant,
		newContactDate: Date): Observable<any> {
		const url = participant.enrollmentExperience === DeviceExperience.Mobile ? this.MOBILE_CONTROLLER : this.PLUGIN_CONTROLLER;
		return this.api.post<any>({
			uri: `${url}/UpdateContactDates?slot=${this.policyQuery.getSlot()}`,
			payload: {
				serialNumber: participant.deviceDetails?.serialNumber,
				homebaseSeqId: participant.mobileDetails?.homebaseSequenceId,
				newContactDate
			}
		}).pipe(tap(_ => this.refreshPolicy()));
	}

	private refreshPolicy(): void {
		const policyNumber = this.policyQuery.getActiveId() as string;
		this.policyService.getPolicyByNumber(policyNumber).subscribe();
	}
}
