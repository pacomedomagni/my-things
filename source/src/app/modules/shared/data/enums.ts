export enum AlgorithmType {
	Algorithm2008 = "Algorithm2008",
	Algorithm2015 = "Algorithm2015",
	Algorithm2008ObdAnd2018MobileWithDD = "Algorithm2008ObdAnd2018MobileWithDD",
	Algorithm2008ObdAnd2018MobileWithoutDD = "Algorithm2008ObdAnd2018MobileWithoutDD",
	Algorithm2018ObdAnd2018MobileWithDD = "Algorithm2018ObdAnd2018MobileWithDD",
	Algorithm2018ObdAnd2018MobileWithoutDD = "Algorithm2018ObdAnd2018MobileWithoutDD",
	Algorithm2020ObdAnd2020MobileWithDD = "Algorithm2020ObdAnd2020MobileWithDD",
	Algorithm2020ObdAnd2020MobileWithoutDD = "Algorithm2020ObdAnd2020MobileWithoutDD",
	Algorithm2021ObdAnd2021MobileWithDD = "Algorithm2021ObdAnd2021MobileWithDD",
	Algorithm2021ObdAnd2021MobileWithoutDD = "Algorithm2021ObdAnd2021MobileWithoutDD"
}
export enum AreExperience {
	ARE = "ARE",
	CAD = "CAD"
}
export enum BillingTransactionType {
	Fee = "Fee",
	Reversal = "Reversal"
}
export enum CertificateStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	REVOKED = "REVOKED"
}
export enum DeviceExperience {
	Device = "Device",
	Mobile = "Mobile",
	OEM = "OEM"
}
export enum DeviceFeature {
	Audio = "Audio",
	BlueLight = "BlueLight",
	Accelerometer = "Accelerometer",
	GPS = "GPS",
	GPSToggle = "GPSToggle",
	AWSIot = "AWSIot"
}
export enum DeviceReturnReasonCode {
	OptOut = "OptOut",
	Cancel = "Cancel",
	NonInstaller = "NonInstaller",
	DeviceReplaced = "DeviceReplaced",
	CustomerReturn = "CustomerReturn",
	DeviceProblem = "DeviceProblem",
	DeviceRefused = "DeviceRefused",
	DeviceUnclaimed = "DeviceUnclaimed",
	MarkedReturned = "MarkedReturned",
	DeviceUndeliverable = "DeviceUndeliverable",
	Abandoned = "Abandoned",
	NonCommunicator = "NonCommunicator",
	DiscountQualified = "DiscountQualified",
	DiscountDisqualified = "DiscountDisqualified",
	ManualMonitoringComplete = "ManualMonitoringComplete"
}
export enum ExpressTrialVendor {
	Toyota = "Toyota",
	CreditKarma = "CreditKarma",
	ZenDrive = "ZenDrive"
}

export enum EDAQTrialVendor {
	EDAQToyota = "EDAQToyota",
	EDAQGm = "EDAQGm"

}

export enum MessageCode {
	Error = "Error",
	ErrorCode = "ErrorCode",
	ErrorDetails = "ErrorDetails",
	Handled = "Handled",
	StackTrace = "StackTrace",
	StatusCode = "StatusCode",
	StatusDescription = "StatusDescription"
}
export enum MobileRegistrationStatus {
	Disabled = "Disabled",
	Inactive = "Inactive",
	PendingResolution = "PendingResolution",
	Locked = "Locked",
	NotRegistered = "NotRegistered",
	ChallengeInProcess = "ChallengeInProcess",
	ChallegeError = "ChallegeError",
	ChallengeComplete = "ChallengeComplete",
	Authenticated = "Authenticated",
	VehicleSelectionComplete = "VehicleSelectionComplete",
	ServerVerifyComplete = "ServerVerifyComplete",
	RegistrationCompleteInProcess = "RegistrationCompleteInProcess",
	RegistrationCompleteError = "RegistrationCompleteError",
	RegistrationComplete = "RegistrationComplete"
}
export enum MobileRegistrationStatusUpdateAction {
	None = "None",
	Enable = "Enable",
	Inactive = "Inactive",
	Unlock = "Unlock"
}
export enum MobileValueCalculatorType {
	Calculator2008 = "Calculator2008",
	Calculator2015 = "Calculator2015",
	Calculator2018WithDistractedDriving = "Calculator2018WithDistractedDriving",
	Calculator2018WithoutDistractedDriving = "Calculator2018WithoutDistractedDriving",
	Calculator2020WithDistractedDriving = "Calculator2020WithDistractedDriving",
	Calculator2020WithoutDistractedDriving = "Calculator2020WithoutDistractedDriving",
	Calculator2021WithDistractedDriving = "Calculator2021WithDistractedDriving",
	Calculator2021WithoutDistractedDriving = "Calculator2021WithoutDistractedDriving"
}
export enum OBDValueCalculatorType {
	Calculator2008 = "Calculator2008",
	Calculator2015 = "Calculator2015",
	Calculator2018 = "Calculator2018",
	Calculator2020 = "Calculator2020",
	Calculator2021 = "Calculator2021"
}
export enum OptOutReasonCode {
	CustomerOptOut = "CustomerOptOut",
	Cancel = "Cancel",
	DriverDelete = "DriverDelete",
	VehicleDelete = "VehicleDelete",
	NonInstaller = "NonInstaller",
	NonCommunicator = "NonCommunicator",
	NotFitMilesTrips = "NotFitMilesTrips",
	NotFitCategoryChangePct = "NotFitCategoryChangePct",
	MonitoringComplete = "MonitoringComplete",
	NotCompleteTwoTerms = "NotCompleteTwoTerms"
}
export enum ParticipantReasonCode {
	None = "None",
	ParticipantOptedOut = "ParticipantOptedOut",
	PolicyCanceled = "PolicyCanceled",
	PolicyCanceledRC3 = "PolicyCanceledRC3",
	ParticipantOptedOutRC4 = "ParticipantOptedOutRC4",
	ParticipantOptedOutRC5 = "ParticipantOptedOutRC5",
	PolicyCanceledBeforeConfirmation = "PolicyCanceledBeforeConfirmation",
	NeverConfirmed = "NeverConfirmed",
	RenewalWorkCreated = "RenewalWorkCreated",
	EndorsementPending = "EndorsementPending",
	ValidUploadReceived = "ValidUploadReceived",
	CollectingData = "CollectingData",
	DeviceOnlyEndorsementInProcess = "DeviceOnlyEndorsementInProcess",
	DeviceAndDiscountEndorsementInProcess = "DeviceAndDiscountEndorsementInProcess",
	NeedsDeviceAssigned = "NeedsDeviceAssigned",
	DeviceReplacementEndorsementInProcess = "DeviceReplacementEndorsementInProcess",
	DeviceReplacementNeeded = "DeviceReplacementNeeded",
	AwaitingConfirmation = "AwaitingConfirmation",
	PolicyCanceledRC18 = "PolicyCanceledRC18",
	ParticipantOptedOutRC19 = "ParticipantOptedOutRC19",
	InvalidUploadReceived = "InvalidUploadReceived",
	ParticipantOptedOutBeforeConfirmation = "ParticipantOptedOutBeforeConfirmation",
	FlatDelete = "FlatDelete",
	ParticipantOptedOutBeforeConfirmationKeepDiscount = "ParticipantOptedOutBeforeConfirmationKeepDiscount",
	DeviceAssignmentPendingNoEndorsement = "DeviceAssignmentPendingNoEndorsement",
	ProductIneligible = "ProductIneligible",
	StateIneligible = "StateIneligible",
	CurrentPolicyTermIneligible = "CurrentPolicyTermIneligible",
	MissedSignupWindow = "MissedSignupWindow",
	SalesChannelIneligible = "SalesChannelIneligible",
	VehicleIneligible = "VehicleIneligible",
	IncompletePolicyInfo = "IncompletePolicyInfo",
	NonInstallerAutomatedOptOutInProcess = "NonInstallerAutomatedOptOutInProcess",
	NonCommunicatorAutomatedOptOutInProcess = "NonCommunicatorAutomatedOptOutInProcess",
	DeviceReturnedAutomatedOptOutInProcess = "DeviceReturnedAutomatedOptOutInProcess",
	AutomatedOptOutEndorsementPending = "AutomatedOptOutEndorsementPending",
	AutomatedOptInEndorsementPending = "AutomatedOptInEndorsementPending",
	MobilePendingRegistration = "MobilePendingRegistration",
	AgentDeviceInstall = "AgentDeviceInstall"
}
export enum ParticipantStatus {
	Active = "Active",
	Inactive = "Inactive",
	Pending = "Pending",
	Renewal = "Renewal",
	Unenrolled = "Unenrolled"
}
export enum ProgramCode {
	Unknown = "Unknown",
	Snapshot = "Snapshot",
	Trial = "Trial",
	Labs = "Labs"
}
export enum ProgramType {
	PriceModel2 = "PriceModel2",
	PriceModel3 = "PriceModel3",
	PriceModel4 = "PriceModel4",
	PriceModel5 = "PriceModel5"
}
export enum StoredTripType {
	SnapshotDevice = "SnapshotDevice",
	Mobile = "Mobile"
}
export enum TripEventType {
	None = "None",
	Brake = "Brake",
	Acceleration = "Acceleration"
}
export enum UnenrollReason {
	DeviceNotEligible = "DeviceNotEligible",
	DriverAdded = "DriverAdded",
	DriverDeleted = "DriverDeleted",
	DriverLicenseChange = "DriverLicenseChange",
	DriverNotEligible = "DriverNotEligible",
	DriverStatusChange = "DriverStatusChange",
	ExpireNonPay = "ExpireNonPay",
	NonCommunicator = "NonCommunicator",
	NonInstaller = "NonInstaller",
	PolicyCancel = "PolicyCancel",
	UserInitiated = "UserInitiated",
	VehicleAdded = "VehicleAdded"
}
export const AlgorithmTypeValue = new Map<AlgorithmType, number>([
	[AlgorithmType.Algorithm2008, 1],
	[AlgorithmType.Algorithm2015, 2],
	[AlgorithmType.Algorithm2008ObdAnd2018MobileWithDD, 3],
	[AlgorithmType.Algorithm2008ObdAnd2018MobileWithoutDD, 4],
	[AlgorithmType.Algorithm2018ObdAnd2018MobileWithDD, 5],
	[AlgorithmType.Algorithm2018ObdAnd2018MobileWithoutDD, 6],
	[AlgorithmType.Algorithm2020ObdAnd2020MobileWithDD, 7],
	[AlgorithmType.Algorithm2020ObdAnd2020MobileWithoutDD, 8],
	[AlgorithmType.Algorithm2021ObdAnd2021MobileWithDD, 9],
	[AlgorithmType.Algorithm2021ObdAnd2021MobileWithoutDD, 10]
]);
export const AreExperienceValue = new Map<AreExperience, number>([
	[AreExperience.ARE, 0],
	[AreExperience.CAD, 1]
]);
export const BillingTransactionTypeValue = new Map<BillingTransactionType, number>([
	[BillingTransactionType.Fee, 1],
	[BillingTransactionType.Reversal, 2]
]);
export const CertificateStatusValue = new Map<CertificateStatus, number>([
	[CertificateStatus.ACTIVE, 1],
	[CertificateStatus.INACTIVE, 2],
	[CertificateStatus.REVOKED, 3]
]);
export const DeviceExperienceValue = new Map<DeviceExperience, number>([
	[DeviceExperience.Device, 1],
	[DeviceExperience.Mobile, 2],
	[DeviceExperience.OEM, 3]
]);
export const DeviceFeatureValue = new Map<DeviceFeature, number>([
	[DeviceFeature.Audio, 1],
	[DeviceFeature.BlueLight, 2],
	[DeviceFeature.Accelerometer, 3],
	[DeviceFeature.GPS, 4],
	[DeviceFeature.GPSToggle, 5],
	[DeviceFeature.AWSIot, 6]
]);
export const DeviceReturnReasonCodeValue = new Map<DeviceReturnReasonCode, number>([
	[DeviceReturnReasonCode.OptOut, 1],
	[DeviceReturnReasonCode.Cancel, 2],
	[DeviceReturnReasonCode.NonInstaller, 3],
	[DeviceReturnReasonCode.DeviceReplaced, 4],
	[DeviceReturnReasonCode.CustomerReturn, 5],
	[DeviceReturnReasonCode.DeviceProblem, 6],
	[DeviceReturnReasonCode.DeviceRefused, 7],
	[DeviceReturnReasonCode.DeviceUnclaimed, 8],
	[DeviceReturnReasonCode.MarkedReturned, 9],
	[DeviceReturnReasonCode.DeviceUndeliverable, 10],
	[DeviceReturnReasonCode.Abandoned, 11],
	[DeviceReturnReasonCode.NonCommunicator, 12],
	[DeviceReturnReasonCode.DiscountQualified, 13],
	[DeviceReturnReasonCode.DiscountDisqualified, 14],
	[DeviceReturnReasonCode.ManualMonitoringComplete, 15]
]);
export const EDAQTrialVendorValue = new Map<EDAQTrialVendor, number>([
	[EDAQTrialVendor.EDAQToyota, 7],
	[EDAQTrialVendor.EDAQGm, 6]
]);
export const ExpressTrialVendorValue = new Map<ExpressTrialVendor, number>([
	[ExpressTrialVendor.Toyota, 2],
	[ExpressTrialVendor.CreditKarma, 5],
	[ExpressTrialVendor.ZenDrive, 10]
]);
export const MessageCodeValue = new Map<MessageCode, number>([
	[MessageCode.Error, 0],
	[MessageCode.ErrorCode, 1],
	[MessageCode.ErrorDetails, 2],
	[MessageCode.Handled, 3],
	[MessageCode.StackTrace, 4],
	[MessageCode.StatusCode, 5],
	[MessageCode.StatusDescription, 6]
]);
export const MobileRegistrationStatusValue = new Map<MobileRegistrationStatus, number>([
	[MobileRegistrationStatus.Disabled, 0],
	[MobileRegistrationStatus.Inactive, 2],
	[MobileRegistrationStatus.PendingResolution, 6],
	[MobileRegistrationStatus.Locked, 8],
	[MobileRegistrationStatus.NotRegistered, 10],
	[MobileRegistrationStatus.ChallengeInProcess, 20],
	[MobileRegistrationStatus.ChallegeError, 22],
	[MobileRegistrationStatus.ChallengeComplete, 24],
	[MobileRegistrationStatus.Authenticated, 30],
	[MobileRegistrationStatus.VehicleSelectionComplete, 40],
	[MobileRegistrationStatus.ServerVerifyComplete, 50],
	[MobileRegistrationStatus.RegistrationCompleteInProcess, 60],
	[MobileRegistrationStatus.RegistrationCompleteError, 62],
	[MobileRegistrationStatus.RegistrationComplete, 64]
]);
export const MobileRegistrationStatusUpdateActionValue = new Map<MobileRegistrationStatusUpdateAction, number>([
	[MobileRegistrationStatusUpdateAction.None, 0],
	[MobileRegistrationStatusUpdateAction.Enable, 1],
	[MobileRegistrationStatusUpdateAction.Inactive, 2],
	[MobileRegistrationStatusUpdateAction.Unlock, 3]
]);
export const MobileValueCalculatorTypeValue = new Map<MobileValueCalculatorType, number>([
	[MobileValueCalculatorType.Calculator2008, 1],
	[MobileValueCalculatorType.Calculator2015, 2],
	[MobileValueCalculatorType.Calculator2018WithDistractedDriving, 3],
	[MobileValueCalculatorType.Calculator2018WithoutDistractedDriving, 4],
	[MobileValueCalculatorType.Calculator2020WithDistractedDriving, 5],
	[MobileValueCalculatorType.Calculator2020WithoutDistractedDriving, 6],
	[MobileValueCalculatorType.Calculator2021WithDistractedDriving, 7],
	[MobileValueCalculatorType.Calculator2021WithoutDistractedDriving, 8]
]);
export const OBDValueCalculatorTypeValue = new Map<OBDValueCalculatorType, number>([
	[OBDValueCalculatorType.Calculator2008, 1],
	[OBDValueCalculatorType.Calculator2015, 2],
	[OBDValueCalculatorType.Calculator2018, 3],
	[OBDValueCalculatorType.Calculator2020, 4],
	[OBDValueCalculatorType.Calculator2021, 5]
]);
export const OptOutReasonCodeValue = new Map<OptOutReasonCode, number>([
	[OptOutReasonCode.CustomerOptOut, 1],
	[OptOutReasonCode.Cancel, 2],
	[OptOutReasonCode.DriverDelete, 3],
	[OptOutReasonCode.VehicleDelete, 4],
	[OptOutReasonCode.NonInstaller, 5],
	[OptOutReasonCode.NonCommunicator, 6],
	[OptOutReasonCode.NotFitMilesTrips, 7],
	[OptOutReasonCode.NotFitCategoryChangePct, 8],
	[OptOutReasonCode.MonitoringComplete, 9],
	[OptOutReasonCode.NotCompleteTwoTerms, 10]
]);
export const ParticipantReasonCodeValue = new Map<ParticipantReasonCode, number>([
	[ParticipantReasonCode.ParticipantOptedOut, 1],
	[ParticipantReasonCode.PolicyCanceled, 2],
	[ParticipantReasonCode.PolicyCanceledRC3, 3],
	[ParticipantReasonCode.ParticipantOptedOutRC4, 4],
	[ParticipantReasonCode.ParticipantOptedOutRC5, 5],
	[ParticipantReasonCode.PolicyCanceledBeforeConfirmation, 6],
	[ParticipantReasonCode.NeverConfirmed, 7],
	[ParticipantReasonCode.RenewalWorkCreated, 8],
	[ParticipantReasonCode.EndorsementPending, 9],
	[ParticipantReasonCode.ValidUploadReceived, 10],
	[ParticipantReasonCode.CollectingData, 11],
	[ParticipantReasonCode.DeviceOnlyEndorsementInProcess, 12],
	[ParticipantReasonCode.DeviceAndDiscountEndorsementInProcess, 13],
	[ParticipantReasonCode.NeedsDeviceAssigned, 14],
	[ParticipantReasonCode.DeviceReplacementEndorsementInProcess, 15],
	[ParticipantReasonCode.DeviceReplacementNeeded, 16],
	[ParticipantReasonCode.AwaitingConfirmation, 17],
	[ParticipantReasonCode.PolicyCanceledRC18, 18],
	[ParticipantReasonCode.ParticipantOptedOutRC19, 19],
	[ParticipantReasonCode.InvalidUploadReceived, 20],
	[ParticipantReasonCode.ParticipantOptedOutBeforeConfirmation, 21],
	[ParticipantReasonCode.FlatDelete, 22],
	[ParticipantReasonCode.ParticipantOptedOutBeforeConfirmationKeepDiscount, 23],
	[ParticipantReasonCode.DeviceAssignmentPendingNoEndorsement, 25],
	[ParticipantReasonCode.ProductIneligible, 30],
	[ParticipantReasonCode.StateIneligible, 31],
	[ParticipantReasonCode.CurrentPolicyTermIneligible, 32],
	[ParticipantReasonCode.MissedSignupWindow, 33],
	[ParticipantReasonCode.SalesChannelIneligible, 34],
	[ParticipantReasonCode.VehicleIneligible, 35],
	[ParticipantReasonCode.IncompletePolicyInfo, 39],
	[ParticipantReasonCode.NonInstallerAutomatedOptOutInProcess, 40],
	[ParticipantReasonCode.NonCommunicatorAutomatedOptOutInProcess, 41],
	[ParticipantReasonCode.DeviceReturnedAutomatedOptOutInProcess, 42],
	[ParticipantReasonCode.AutomatedOptOutEndorsementPending, 43],
	[ParticipantReasonCode.AutomatedOptInEndorsementPending, 44],
	[ParticipantReasonCode.MobilePendingRegistration, 60],
	[ParticipantReasonCode.AgentDeviceInstall, 99]
]);
export const ParticipantStatusValue = new Map<ParticipantStatus, number>([
	[ParticipantStatus.Active, 0],
	[ParticipantStatus.Inactive, 1],
	[ParticipantStatus.Pending, 2],
	[ParticipantStatus.Renewal, 3],
	[ParticipantStatus.Unenrolled, 4]
]);
export const ProgramCodeValue = new Map<ProgramCode, number>([
	[ProgramCode.Unknown, 0],
	[ProgramCode.Snapshot, 1],
	[ProgramCode.Trial, 2],
	[ProgramCode.Labs, 3]
]);
export const ProgramTypeValue = new Map<ProgramType, number>([
	[ProgramType.PriceModel2, 0],
	[ProgramType.PriceModel3, 1],
	[ProgramType.PriceModel4, 2],
	[ProgramType.PriceModel5, 3]
]);
export const StoredTripTypeValue = new Map<StoredTripType, number>([
	[StoredTripType.SnapshotDevice, 1],
	[StoredTripType.Mobile, 2]
]);
export const TripEventTypeValue = new Map<TripEventType, number>([
	[TripEventType.None, 0],
	[TripEventType.Brake, 1],
	[TripEventType.Acceleration, 2]
]);
export const UnenrollReasonValue = new Map<UnenrollReason, number>([
	[UnenrollReason.DeviceNotEligible, 1],
	[UnenrollReason.DriverAdded, 2],
	[UnenrollReason.DriverLicenseChange, 3],
	[UnenrollReason.DriverNotEligible, 4],
	[UnenrollReason.DriverStatusChange, 5],
	[UnenrollReason.ExpireNonPay, 6],
	[UnenrollReason.NonCommunicator, 7],
	[UnenrollReason.NonInstaller, 8],
	[UnenrollReason.PolicyCancel, 9],
	[UnenrollReason.UserInitiated, 10],
	[UnenrollReason.VehicleAdded, 11],
	[UnenrollReason.DriverDeleted, 12]
]);
