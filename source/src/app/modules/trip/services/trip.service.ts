import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";

import { ApiService } from "@modules/core/services/_index";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InitialParticipationScoreInProcess, ParticipantCalculatedValues, StoredTrip } from "@modules/shared/data/resources";
import { tap } from "rxjs/operators";
import { ApiOptions } from "@modules/core/services/api/api.service";

@Injectable({ providedIn: "root" })
export class TripService {

	private CONTROLLER = "/trip";

	constructor(
		private api: ApiService,
		private policyService: PolicyService,
		private policyQuery: PolicyQuery) { }

	updateMobileStageGrades(
		deviceId: string,
		deviceSeqId: number,
		homebaseDeviceSeqId: number,
		participantSeqId: number,
		connectedDays: number,
		ubiValue: number): Observable<ParticipantCalculatedValues> {
		return this.api.post<ParticipantCalculatedValues>(
			{
				uri: `${this.CONTROLLER}/StageGradesMobile`,
				payload: { deviceId, deviceSeqId, homebaseDeviceSeqId, participantSeqId, connectedDays, ubiValue }
			}).pipe(
				tap(_ => this.updateRegistration())
			);
	}

	updateMobileStageGrades50(
		deviceId: string,
		deviceSeqId: number,
		homebaseDeviceSeqId: number,
		participantSeqId: number,
		policyPeriodSeqId: number,
		startDate: Date,
		endDate: Date,
		ubiValue: number): Observable<ParticipantCalculatedValues> {
		return this.api.post<ParticipantCalculatedValues>(
			{
				uri: `${this.CONTROLLER}/StageGradesMobile50`,
				payload: { deviceId, deviceSeqId, homebaseDeviceSeqId, participantSeqId, policyPeriodSeqId, startDate, endDate, ubiValue }
			}).pipe(
				tap(_ => this.updateRegistration())
			);
	}

	updatePluginStageGrades(
		deviceSerialNumber: string,
		deviceSeqId: number,
		homebaseDeviceSeqId: number,
		participantSeqId: number,
		connectedDays: number,
		ubiValue: number): Observable<ParticipantCalculatedValues> {
		return this.api.post<ParticipantCalculatedValues>(
			{
				uri: `${this.CONTROLLER}/StageGradesPlugin`,
				payload: { deviceSerialNumber, deviceSeqId, homebaseDeviceSeqId, participantSeqId, connectedDays, ubiValue }
			}).pipe(
				tap(_ => this.updateRegistration())
			);
	}

	updatePluginStageGrades50(
		deviceSerialNumber: string,
		deviceSeqId: number,
		homebaseDeviceSeqId: number,
		participantSeqId: number,
		policyPeriodSeqId: number,
		startDate: Date,
		endDate: Date,
		ubiValue: number): Observable<ParticipantCalculatedValues> {
		return this.api.post<ParticipantCalculatedValues>(
			{
				uri: `${this.CONTROLLER}/StageGradesPlugin50`,
				payload: { deviceSerialNumber, deviceSeqId, homebaseDeviceSeqId, participantSeqId, policyPeriodSeqId, startDate, endDate, ubiValue }
			}).pipe(
				tap(_ => this.updateRegistration())
			);
	}

	getStoredTrips(): Observable<StoredTrip[]> {
		return this.api.get<StoredTrip[]>({ uri: `${this.CONTROLLER}/GetStoredTrips` });
	}

	runStoredTripMobile(
		storedTripSequenceId: number,
		participantExternalId: string,
		deviceId: string,
		participantSeqId: number,
		deviceSeqId: number,
		tripDate: Date,
		firstContactDate: Date,
		enrollmentDate: Date,
		policyStartDate: Date
	): Observable<any> {
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/RunStoredTripMobile`,
			payload: {
				storedTripSequenceId, participantExternalId, deviceId, participantSeqId, deviceSeqId,
				tripDate, firstContactDate, enrollmentDate, policyStartDate
			}
		}).pipe(
			tap(_ => this.updateRegistration())
		);
	}

	runMultipleStoredTripsMobile(
		storedTripSequenceId: number,
		participantExternalId: string,
		deviceId: string,
		participantSeqId: number,
		deviceSeqId: number,
		tripDate: Date,
		firstContactDate: Date,
		enrollmentDate: Date,
		policyStartDate: Date): Observable<any> {
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/RunMultipleStoredTripsMobile`,
			payload: {
				storedTripSequenceId, participantExternalId, deviceId, participantSeqId, deviceSeqId,
				tripDate, firstContactDate, enrollmentDate, policyStartDate
			},
			options: { timeout: 300 } as ApiOptions
		}).pipe(
			tap(_ => this.updateRegistration())
		);
	}

	runStoredTripPlugIn(
		storedTripSequenceId: number,
		sim: string,
		participantSeqId: number,
		serialNumber: string,
		tripDate: Date,
		enrollmentDate: Date,
		policyStartDate: Date,
		shipDate: Date,
		firstContactDate: Date
	): Observable<any> {
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/RunStoredTripPlugin`,
			payload: {
				storedTripSequenceId, sim, participantSeqId, serialNumber, tripDate, enrollmentDate, policyStartDate, shipDate, firstContactDate
			}
		}).pipe(
			tap(_ => this.updateRegistration())
		);
	}

	runMultipleStoredTripsPlugIn(
		storedTripSequenceId: number,
		sim: string,
		participantSeqId: number,
		serialNumber: string,
		tripDate: Date,
		enrollmentDate: Date,
		policyStartDate: Date,
		shipDate: Date,
		firstContactDate: Date
	): Observable<any> {
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/RunMultipleStoredTripsPlugin`,
			payload: {
				storedTripSequenceId, sim, participantSeqId, serialNumber, tripDate, enrollmentDate, policyStartDate, shipDate, firstContactDate
			},
			options: { timeout: 180 } as ApiOptions
		}).pipe(
			tap(_ => this.updateRegistration())
		);
	}

	getInitialParticipationScore(participantSequenceId: number): Observable<InitialParticipationScoreInProcess> {
		return this.api.get({ uri: `${this.CONTROLLER}/GetInitialParticipationScore?participantSequenceId=${participantSequenceId}` });
	}

	stageInitialDiscount(
		policyNumber: string,
		participantSequenceId: number,
		participantId: string,
		policyPeriodSequenceId: number,
		inceptionDate: Date): Observable<any> {
		return this.api.post<any>({
			uri: `${this.CONTROLLER}/InitialDiscount`,
			payload: { policyNumber, participantSequenceId, participantId, policyPeriodSequenceId, inceptionDate }
		}).pipe(
			tap(() => this.updateRegistration())
		);
	}

	private updateRegistration(): void {
		const policyNumber = this.policyQuery.getActiveId() as string;
		this.policyService.getPolicyByNumber(policyNumber).subscribe();
	}

	getStageGradesValidRange(participantSeqId: number): Observable<any> {
		return this.api.get<any>({ uri: `${this.CONTROLLER}/StageGradesScoreValues/${participantSeqId}` });
	}
}
