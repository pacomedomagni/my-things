/* eslint-disable unused-imports/no-unused-vars */
import { ApiService } from "@modules/core/services/_index";
import { autoSpy } from "autoSpy";
import { fakeAsync } from "@angular/core/testing";
import { of } from "rxjs";
import { PolicyQuery, PolicyService } from "@modules/shared/stores/_index";
import { ApiOptions } from "@modules/core/services/api/api.service";
import { TripService } from "./trip.service";

function setup() {
	const api = autoSpy(ApiService);
	const policyQuery = autoSpy(PolicyQuery);
	policyQuery.getSlot = jest.fn(() => "anaconda");
	const policyService = autoSpy(PolicyService);
	api.post.mockReturnValue(of({}));
	api.put.mockReturnValue(of({}));

	const controller = "/trip/";
	const builder = {
		api,
		controller,
		policyQuery,
		default() {
			return builder;
		},
		build() {
			return new TripService(api, policyService, policyQuery);
		}
	};

	return builder;
}

describe("TripService", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	test.each([
		"StageGradesMobile",
		"StageGradesPlugin",
		"RunStoredTripMobile",
		"RunStoredTripPlugin",
		"RunMultipleStoredTripsMobile",
		"RunMultipleStoredTripsPlugin"
	])
		("should call %s", fakeAsync((action) => {
			const { build, api, controller, policyQuery } = setup().default();
			const deviceId = "1";
			const deviceSerialNumber = "123";
			const deviceSeqId = 2;
			const homebaseDeviceSeqId = 3;
			const participantSeqId = 0;
			const connectedDays = 120;
			const ubiValue = 1;
			const storedTripSequenceId = 4;
			const participantExternalId = "012";
			const tripDate = new Date(Date.now());
			const firstContactDate = new Date(Date.now());
			const enrollmentDate = new Date(Date.now());
			const policyStartDate = new Date(Date.now());
			const sim = "01";
			const serialNumber = "89";
			const shipDate = new Date(Date.now());
			const component = build();
			const slot = policyQuery.getSlot();

			switch (action) {
				case "StageGradesMobile":
					component.updateMobileStageGrades(deviceId, deviceSeqId, homebaseDeviceSeqId, participantSeqId, connectedDays, ubiValue);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { deviceId, deviceSeqId, homebaseDeviceSeqId, participantSeqId, connectedDays, ubiValue }
					});
					break;
				case "StageGradesPlugin":
					component.updatePluginStageGrades(deviceSerialNumber, deviceSeqId, homebaseDeviceSeqId, participantSeqId, connectedDays, ubiValue);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { deviceSerialNumber, deviceSeqId, homebaseDeviceSeqId, participantSeqId, connectedDays, ubiValue }
					});
					break;

				case "RunStoredTripMobile":
					component.runStoredTripMobile(storedTripSequenceId, participantExternalId, deviceId, participantSeqId, deviceSeqId, tripDate, firstContactDate, enrollmentDate, policyStartDate);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { storedTripSequenceId, participantExternalId, deviceId, participantSeqId, deviceSeqId, tripDate, firstContactDate, enrollmentDate, policyStartDate }
					});
					break;

				case "RunMultipleStoredTripsMobile":
					component.runMultipleStoredTripsMobile(storedTripSequenceId, participantExternalId, deviceId, participantSeqId, deviceSeqId, tripDate, firstContactDate, enrollmentDate, policyStartDate);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { storedTripSequenceId, participantExternalId, deviceId, participantSeqId, deviceSeqId, tripDate, firstContactDate, enrollmentDate, policyStartDate },
						options: { timeout: 300 } as ApiOptions
					});
					break;

				case "RunStoredTripPlugin":
					component.runStoredTripPlugIn(storedTripSequenceId, sim, participantSeqId, serialNumber, tripDate, enrollmentDate, policyStartDate, shipDate, firstContactDate);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { storedTripSequenceId, sim, participantSeqId, serialNumber, tripDate, enrollmentDate, policyStartDate, shipDate, firstContactDate }
					});
					break;

				case "RunMultipleStoredTripsPlugin":
					component.runMultipleStoredTripsPlugIn(storedTripSequenceId, sim, participantSeqId, serialNumber, tripDate, enrollmentDate, policyStartDate, shipDate, firstContactDate);
					expect(api.post).toHaveBeenCalledWith({
						uri: controller + action,
						payload: { storedTripSequenceId, sim, participantSeqId, serialNumber, tripDate, enrollmentDate, policyStartDate, shipDate, firstContactDate },
						options: { timeout: 180 } as ApiOptions
					});
					break;

			}
		}));

});
