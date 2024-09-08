import { EDAQTrialVendor, ParticipantReasonCodeValue } from "./enums";
/* eslint-disable max-len */

import { AlgorithmType, DeviceExperience, ExpressTrialVendor, MobileRegistrationStatus, ParticipantReasonCode, ParticipantStatus, ProgramType, UnenrollReason } from "./enums";
import { StateCodes } from "./state-data";

export const AlgorithmTypeLabel = new Map<AlgorithmType, string>([
	[AlgorithmType.Algorithm2008, "2008 Algorithm"],
	[AlgorithmType.Algorithm2015, "2015 Algorithm"],
	[AlgorithmType.Algorithm2008ObdAnd2018MobileWithDD, "2008 OBD2 / 2018 Mobile with Distracted Driving"],
	[AlgorithmType.Algorithm2008ObdAnd2018MobileWithoutDD, "2008 OBD2 / 2018 Mobile without Distracted Driving"],
	[AlgorithmType.Algorithm2018ObdAnd2018MobileWithDD, "2018 OBD2 / 2018 Mobile with Distracted Driving"],
	[AlgorithmType.Algorithm2018ObdAnd2018MobileWithoutDD, "2018 OBD2 / 2018 Mobile without Distracted Driving"],
	[AlgorithmType.Algorithm2020ObdAnd2020MobileWithDD, "2020 OBD2 / 2020 Mobile with Distracted Driving"],
	[AlgorithmType.Algorithm2020ObdAnd2020MobileWithoutDD, "2020 OBD2 / 2020 Mobile without Distracted Driving"],
	[AlgorithmType.Algorithm2021ObdAnd2021MobileWithDD, "2021 OBD2 / 2021 Mobile with Distracted Driving"],
	[AlgorithmType.Algorithm2021ObdAnd2021MobileWithoutDD, "2021 OBD2 / 2021 Mobile without Distracted Driving"]
]);

export const DeviceExperienceLabel = new Map<DeviceExperience, string>([
	[DeviceExperience.Device, "Device"],
	[DeviceExperience.Mobile, "Mobile"],
	[DeviceExperience.OEM, "OEM"]
]);

export const MobileRegistrationStatusLabel = new Map<MobileRegistrationStatus, string>([
	[MobileRegistrationStatus.Disabled, "Disabled"],
	[MobileRegistrationStatus.Inactive, "Inactive"],
	[MobileRegistrationStatus.PendingResolution, "Pending Resolution"],
	[MobileRegistrationStatus.Locked, "Locked"],
	[MobileRegistrationStatus.NotRegistered, "Not Registered (New)"],
	[MobileRegistrationStatus.ChallengeInProcess, "Challenge In Process"],
	[MobileRegistrationStatus.ChallegeError, "Challenge Error"],
	[MobileRegistrationStatus.ChallengeComplete, "Challenge Complete"],
	[MobileRegistrationStatus.Authenticated, "Mobile Registration is Authenticated"],
	[MobileRegistrationStatus.VehicleSelectionComplete, "Vehicle Selection Complete"],
	[MobileRegistrationStatus.ServerVerifyComplete, "Server Verify Complete"],
	[MobileRegistrationStatus.RegistrationCompleteInProcess, "Registration Complete In Process"],
	[MobileRegistrationStatus.RegistrationCompleteError, "Registration Complete Error"],
	[MobileRegistrationStatus.RegistrationComplete, "Registration Complete"]
]);

export const ParticipantReasonCodeLabel = new Map<ParticipantReasonCode, string>([
	// None should never happen. But, here as a safe guard.
	[ParticipantReasonCode.None, ``],
	[ParticipantReasonCode.ParticipantOptedOut, `Participant opted out (${ParticipantReasonCodeValue.get(ParticipantReasonCode.ParticipantOptedOut)})`],
	[ParticipantReasonCode.PolicyCanceled, `Policy canceled (${ParticipantReasonCodeValue.get(ParticipantReasonCode.PolicyCanceled)})`],
	[ParticipantReasonCode.RenewalWorkCreated, `Renewal work created (${ParticipantReasonCodeValue.get(ParticipantReasonCode.RenewalWorkCreated)})`],
	[ParticipantReasonCode.CollectingData, `Collecting data (${ParticipantReasonCodeValue.get(ParticipantReasonCode.CollectingData)})`],
	[ParticipantReasonCode.NeedsDeviceAssigned, `Needs device assigned (${ParticipantReasonCodeValue.get(ParticipantReasonCode.NeedsDeviceAssigned)})`],
	[ParticipantReasonCode.DeviceReplacementNeeded, `Device replacement needed (${ParticipantReasonCodeValue.get(ParticipantReasonCode.DeviceReplacementNeeded)})`],
	[ParticipantReasonCode.FlatDelete, `Flat delete (${ParticipantReasonCodeValue.get(ParticipantReasonCode.FlatDelete)})`],
	[ParticipantReasonCode.DeviceReturnedAutomatedOptOutInProcess, `Device was returned, automated Opt Out in process (${ParticipantReasonCodeValue.get(ParticipantReasonCode.DeviceReturnedAutomatedOptOutInProcess)})`],
	[ParticipantReasonCode.AutomatedOptOutEndorsementPending, `Automated Opt Out endorsement pending (${ParticipantReasonCodeValue.get(ParticipantReasonCode.AutomatedOptOutEndorsementPending)})`],
	[ParticipantReasonCode.AutomatedOptInEndorsementPending, `Automated Opt In endorsement pending (${ParticipantReasonCodeValue.get(ParticipantReasonCode.AutomatedOptInEndorsementPending)})`],
	[ParticipantReasonCode.MobilePendingRegistration, `Mobile Pending Registration (${ParticipantReasonCodeValue.get(ParticipantReasonCode.MobilePendingRegistration)})`]
]);

export const ParticipantStatusLabel = new Map<ParticipantStatus, string>([
	[ParticipantStatus.Active, "Active"],
	[ParticipantStatus.Inactive, "Inactive"],
	[ParticipantStatus.Pending, "Pending"],
	[ParticipantStatus.Renewal, "Renewal"],
	[ParticipantStatus.Unenrolled, "Un-enrolled"]
]);

export const ProgramTypeLabel = new Map<ProgramType, string>([
	[ProgramType.PriceModel2, "Snapshot 2.0"],
	[ProgramType.PriceModel3, "Snapshot 3.0"],
	[ProgramType.PriceModel4, "Snapshot 4.0"],
	[ProgramType.PriceModel5, "Snapshot 5.0"]
]);

export const ExpressTrialVendorLabel = new Map<ExpressTrialVendor, string>([
	[ExpressTrialVendor.Toyota, "Toyota"],
	[ExpressTrialVendor.CreditKarma, "Credit Karma"],
	[ExpressTrialVendor.ZenDrive, "ZenDrive"]
]);

export const EDAQTrialVendorLabel = new Map<EDAQTrialVendor, string>([
	[EDAQTrialVendor.EDAQToyota, "EDAQ Toyota"],
	[EDAQTrialVendor.EDAQGm, "EDAQ GM"]
]);

export const StateFullName = new Map<StateCodes, string>([
	[StateCodes.AL, "Alabama"],
	[StateCodes.AK, "Alaska"],
	[StateCodes.AZ, "Arizona"],
	[StateCodes.AR, "Arkansas"],
	[StateCodes.CA, "California"],
	[StateCodes.CO, "Colorado"],
	[StateCodes.CT, "Connecticut"],
	[StateCodes.DE, "Delaware"],
	[StateCodes.DC, "District Of Columbia"],
	[StateCodes.FL, "Florida"],
	[StateCodes.GA, "Georgia"],
	[StateCodes.HI, "Hawaii"],
	[StateCodes.ID, "Idaho"],
	[StateCodes.IL, "Illinois"],
	[StateCodes.IN, "Indiana"],
	[StateCodes.IA, "Iowa"],
	[StateCodes.KS, "Kansas"],
	[StateCodes.KY, "Kentucky"],
	[StateCodes.LA, "Louisiana"],
	[StateCodes.ME, "Maine"],
	[StateCodes.MD, "Maryland"],
	[StateCodes.MA, "Massachusetts"],
	[StateCodes.MI, "Michigan"],
	[StateCodes.MN, "Minnesota"],
	[StateCodes.MS, "Mississippi"],
	[StateCodes.MO, "Missouri"],
	[StateCodes.MT, "Montana"],
	[StateCodes.NE, "Nebraska"],
	[StateCodes.NV, "Nevada"],
	[StateCodes.NH, "New Hampshire"],
	[StateCodes.NJ, "New Jersey"],
	[StateCodes.NM, "New Mexico"],
	[StateCodes.NY, "New York"],
	[StateCodes.NC, "North Carolina"],
	[StateCodes.ND, "North Dakota"],
	[StateCodes.OH, "Ohio"],
	[StateCodes.OK, "Oklahoma"],
	[StateCodes.OR, "Oregon"],
	[StateCodes.PA, "Pennsylvania"],
	[StateCodes.RI, "Rhode Island"],
	[StateCodes.SC, "South Carolina"],
	[StateCodes.SD, "South Dakota"],
	[StateCodes.TN, "Tennessee"],
	[StateCodes.TX, "Texas"],
	[StateCodes.UT, "Utah"],
	[StateCodes.VT, "Vermont"],
	[StateCodes.VA, "Virginia"],
	[StateCodes.WA, "Washington"],
	[StateCodes.WV, "West Virginia"],
	[StateCodes.WI, "Wisconsin"],
	[StateCodes.WY, "Wyoming"]
]);

export const UnenrollReasonLabel = new Map<UnenrollReason, string>([
	[UnenrollReason.DeviceNotEligible, "Device Not Eligible"],
	[UnenrollReason.DriverAdded, "Driver Added"],
	[UnenrollReason.DriverDeleted, "Driver Deleted"],
	[UnenrollReason.DriverLicenseChange, "Driver License Change"],
	[UnenrollReason.DriverNotEligible, "Driver Not Eligible"],
	[UnenrollReason.DriverStatusChange, "Driver Status Change"],
	[UnenrollReason.ExpireNonPay, "Expired - Non Pay"],
	[UnenrollReason.NonCommunicator, "Non-Communicator"],
	[UnenrollReason.NonInstaller, "Non-Installer"],
	[UnenrollReason.PolicyCancel, "Policy Cancel"],
	[UnenrollReason.UserInitiated, "User Initiated"],
	[UnenrollReason.VehicleAdded, "Vehicle Added"]
]);

/* eslint-enable max-len */
