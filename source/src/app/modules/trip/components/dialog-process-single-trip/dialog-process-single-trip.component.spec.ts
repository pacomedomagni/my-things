import { StoredTrip } from "@modules/shared/data/resources";
import { StoredTripType } from "@modules/shared/data/enums";
import { TripService } from "@modules/trip/services/trip.service";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";

import { DialogProcessSingleTripComponent } from "./dialog-process-single-trip.component";

function setup() {
	const injectedData = { model: { date: undefined, type: "" } };
	const data = { name: "Honda", type: "mobile" };
	const tripService = autoSpy(TripService);
	tripService.getStoredTrips.mockReturnValue(of([
		{
			storedTripSeqId: 1,
			name: "mk9zXFaVCZffR9098",
			storedTripType: StoredTripType.Mobile
		},
		{
			storedTripSeqId: 1,
			name: "0cm45wtnReqnhO9Nq",
			storedTripType: StoredTripType.Mobile
		},
		{
			storedTripSeqId: 1,
			name: "19Df8SbFLAvQMEei2",
			storedTripType: StoredTripType.Mobile
		},
		{
			storedTripSeqId: 1,
			name: "test",
			storedTripType: StoredTripType.Mobile
		},
		{
			storedTripSeqId: 1,
			name: "No Braking Events",
			storedTripType: StoredTripType.SnapshotDevice
		}, ,
		{
			storedTripSeqId: 1,
			name: "ExtremeBrakeHighJerkCount3ANDHardBrakeV2Count5ANDHardAccelerationV2Count4",
			storedTripType: StoredTripType.SnapshotDevice
		},
		{
			storedTripSeqId: 1,
			name: "WareHouseTrip",
			storedTripType: StoredTripType.SnapshotDevice
		},
		{
			storedTripSeqId: 1,
			name: "SmartHub Brakings",
			storedTripType: StoredTripType.SnapshotDevice
		},
		{
			storedTripSeqId: 1,
			name: "test",
			storedTripType: StoredTripType.SnapshotDevice
		}
	] as StoredTrip[]));

	const builder = {
		injectedData,
		default() {
			return builder;
		},
		build() {
			return new DialogProcessSingleTripComponent(injectedData, data, tripService);
		}
	};
	return builder;
}

describe("DialogProcessSingleTripComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();
		component.ngOnInit();
		expect(component).toBeTruthy();
	});

	it("Calling stored trips for mobile", function() {
		const { build, injectedData } = setup().default();
		injectedData.model.type = "mobile";
		const component = build();
		component.ngOnInit();
		const trips = component.storedTrips.map(x => x.name);
		expect(trips).toEqual(["Brakes & Phone Usage", "Brake(s) and Hard Acceleration", "Clean Trip"]);
	});

	it("Calling stored trips for snapShotDevice", function() {
		const { build, injectedData } = setup().default();
		injectedData.model.type = "plugin";
		const component = build();
		component.ngOnInit();
		const trips = component.storedTrips.map(x => x.name);
		expect(trips).toEqual(["Clean Trip", "Acceleration", "Hard Brake", "Braking and Acceleration"]);
	});
});

