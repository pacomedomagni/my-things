import { ID } from "@datorama/akita";
import * as Enums from "./enums";

export interface Resource {
	extenders: Map<string, any>[];
	messages: KeyValuePair<Enums.MessageCode, any>[];
}
export interface Address extends Resource {
	address1: string;
	address2: string;
	city: string;
	state: string;
	zipCode: string;
}
export interface BillingTransaction extends Resource {
	amount: string;
	billingTransactionID: number;
	createDate: Date;
	deviceSeqId: number;
	id: string;
	status: string;
	transactionType: Enums.BillingTransactionType;
}
export interface Communication extends Resource {
	campaign: string;
	createDate: Date;
	deviceSerialNumber: string;
	method: string;
	participantSequenceId: number;
	reason: string;
}
export interface CrashAccidentDetectionInfo extends Resource {
	eligibleDateTime: Date;
	ineligibleDateTime: Date;
	isDeviceEligible: boolean;
	isProgramEligible: boolean;
}
export interface DevicesNeedingAssignment extends Resource {
	participantSeqId: number;
	policyNumber: ID;
	slot: string;
	state: string;
}
export interface Driver extends Resource {
	externalId: string;
	firstName: string;
	lastName: string;
	sequenceId: number;
}
export interface InitialParticipationScoreInProcess extends Resource {
	endorsementAppliedDateTime: Date;
	isEmailSent: boolean;
	isEndorsementDiscountZero: boolean;
	isScoreCalculated: boolean;
}
export interface MaintenanceConfiguration extends Resource {
	configKey: string;
	configValue: string;
}
export interface MobileDevice extends Resource {
	alias: string;
	appVersion: string;
	homebaseSequenceId: number;
	id: string;
	model: string;
	os: string;
	osVersion: string;
	phoneNumber: string;
	sequenceId: number;
}
export interface MobileDeviceRegistration extends Resource {
	apiToken: string;
	challengeCode: string;
	challengeCodeExpirationDate: Date;
	challengeRequestCount: number;
	createDateTime: Date;
	driverExternalId: string;
	groupExternalId: string;
	lastChangeDateTime: Date;
	mobileRegistrationCode: string;
	participantExternalId: string;
	registered: boolean;
	registrationDate: Date;
	registrationSequenceId: number;
	reregisteredInd: boolean;
	status: Enums.MobileRegistrationStatus;
	vehicleExternalId: string;
}
export interface OptOutData extends Resource {
	date: Date;
	reason: Enums.OptOutReasonCode;
	reasonDescription: string;
}
export interface OptOutSuspension extends Resource {
	deviceSeqId: number;
	deviceSerialNumber: string;
	endDate: Date;
	isCanceled: boolean;
	isReturned: boolean;
	reasonCode: Enums.OptOutReasonCode;
	seqId: number;
	startDate: Date;
	userName: string;
}
export interface Participant extends Resource {
	areDetails: AreParticipantDetails;
	changeEffectiveDate: Date;
	crashAccidentDetectionInfo: CrashAccidentDetectionInfo;
	deviceDetails: PhysicalDevice;
	driver: Driver;
	enrollmentDate: Date;
	enrollmentExperience: Enums.DeviceExperience;
	externalId: string;
	firstContactDate: Date;
	groupExternalId: string;
	id: string;
	lastContactDate: Date;
	lastUploadDate: Date;
	mobileDetails: MobileDevice;
	mobileDeviceDetails: MobileDevice;
	mobileRegistrationDetails: MobileDeviceRegistration;
	monitoringCompleteConnectionDays: number;
	optOutDetails: OptOutData;
	pluginDeviceDetails: PluginDevice;
	policyStartDate: Date;
	programType: Enums.ProgramType;
	qualifyingPeriodSeqId: number;
	reasonCode: Enums.ParticipantReasonCode;
	registrationDetails: MobileRegistration;
	scoringAlgorithm: number;
	scoringAlgorithmData: ScoringAlgorithmData;
	sequenceId: number;
	snapshotDetails: SnapshotParticipantDetails;
	status: Enums.ParticipantStatus;
	telematicsId: string;
	uBIFeatureActivationDateTime: Date;
	vehicleDetails: Vehicle;
}
export interface ParticipantCalculatedValues {
	annualizationFactor: number;
	connectedDays: number;
	connectedSeconds: number;
	disconnectCount: number;
	disconnectedSeconds: number;
	participantSequenceId: number;
	scoringDetails: ParticipantScoringData;
	ubiScore: number;
	ubiValue: number;
}
export interface ParticipantScoringData extends Resource {
	experience: Enums.DeviceExperience;
	mobileCalculator: Enums.MobileValueCalculatorType;
	mobileSummarizerVersionCode: number;
	monitoringCompleteConnectDays: number;
	pluginCalculator: Enums.OBDValueCalculatorType;
	ratedDistractedDrivingIndicator: boolean;
	state: string;
}
export interface PhysicalDevice extends Resource {
	homebaseSequenceId: number;
	returnDate: Date;
	sequenceId: number;
	serialNumber: string;
	shipDate: Date;
	sim: string;
	version: string;
	wirelessStatus: string;
}
export interface PlugInDeviceAssignment extends Resource {
	deviceSerialNumber: string;
	make: string;
	model: string;
	modelYear: string;
}
export interface Policy extends Resource {
	appName: string;
	areDetails: ArePolicyDetails;
	channelIndicator: string;
	createDate: Date;
	expirationDate: Date;
	groupExternalId: string;
	inceptionDate: Date;
	mailingAddress: Address;
	participants: Participant[];
	policyNumber: ID;
	policyPeriodDetails: PolicyPeriod[];
	policyPeriodSeqId: number;
	policySeqId: number;
	policySystem: string;
	primaryContact: Driver;
	snapshotDetails: SnapshotPolicyDetails;
}
export interface PolicyPeriod extends Resource {
	createDate: Date;
	expirationDate: Date;
	expirationYear: number;
	groupExternalId: string;
	inceptionDate: Date;
	lastChangeDateTime: Date;
	policyPeriodSeqID: number;
	policySeqID: number;
	policySuffix: number;
	policySystem: string;
	policySystemID: number;
	rateRevision: string;
}
export interface StoredTrip extends Resource {
	name: string;
	storedTripSeqId: number;
	storedTripType: Enums.StoredTripType;
}
export interface TrialCustomer extends Resource {
	customerId: string;
	participantId: string | null;
	state: string;
	vendorCode: Enums.ExpressTrialVendor | Enums.EDAQTrialVendor;
	vendorCustomerId: number | null;
}

export interface UBIVehicle extends Resource {
	make: string;
	model: string;
	vehicleExternalId: string;
	vin: string;
	year: number;

}
export interface EDAQTrialCustomer extends TrialCustomer {
	participantExternalKey: string;
	vin: string;
	state: string;
	year: number;
	make: string;
	model: string;
}
export interface EDAQTrialVehicle extends Resource {
	referenceId: number;
	oemTypeDesc: string;
	vendorCode: Enums.EDAQTrialVendor;
	participantExternalKey: string;
	isDataAvailable: boolean;
	vendorCarrierDescription: string;
}

export interface UserInfo {
	isAdmin: boolean;
	isSuperUser: boolean;
	name: string;
}
export interface Vehicle extends Resource {
	externalId: string;
	make: string;
	model: string;
	seqId: number;
	vin: string;
	year: number;
}
export interface ADDriver {
	adEnrollmentEligible: boolean;
	driverReferenceId: string;
	mobileRegistrationData: MobileRegistration;
	participantSummary: ParticipantSummariesResponse;
	tmxParticipantSummary: TmxParticipantSummariesResponse;
}
export interface ADEEligibilityResponse {
	drivers: Drivers[];
}
export interface AREParticipantSummaryResponse {
	drivers: ADDriver[];
}
export interface Drivers {
	adEnrollmentEligible: boolean;
	driverReferenceId: string;
}
export interface MobileRegistration extends Resource {
	challengeExpirationDateTime: Date;
	challengeRequestCount: number;
	createDateTime: Date;
	driverExternalId: string;
	driverFirstName: string;
	driverLastName: string;
	groupExternalId: string;
	lastChangeDateTime: Date;
	mobileApiTokenId: string;
	mobileChallengeCode: string;
	mobileDeviceId: string;
	mobileLastRegistrationDateTime: Date;
	mobileRegistrationCode: string;
	mobileRegistrationExtended: MobileRegistrationExtended;
	mobileRegistrationSeqId: number;
	mobileRegistrationStatusCode: Enums.MobileRegistrationStatus;
	mobileRegistrationStatusDescription: string;
	mobileReregisteredInd: boolean;
	newMobileRegistrationStatusDescription: string;
	participantExternalId: string;
	policyParticipant: PolicyDriverData;
	programCode: Enums.ProgramCode;
	vehicleExternalId: string;
}

export interface MobileDevice {
	createDateTime: Date;
	deviceIdentifier: string;
	deviceSeqId: number;
	firstContactDateTime: Date;
	homeBaseDeviceSeqId: number;
	isPausedInd: boolean;
	isRegisteredInd: boolean;
	lastChangeDateTime: Date;
	lastContactDateTime: Date;
	lastUploadDateTime: Date;
	mobileAppConfigId: number;
	mobileAppVersionName: string;
	mobileDeviceAliasName: string;
	mobileDeviceModelName: string;
	mobileOSName: string;
	mobileOSVersionName: string;
}
export interface MobileRegistrationExtended {
	canUnlock: boolean;
}
export interface ParticipantSummariesResponse {
	accidentResponseActivationDateTime: Date;
	accidentResponseConsentDateTime: Date;
	adEnrollmentEligible: boolean;
	driverReferenceId: string;
	enrollmentDateTime: Date;
	isAccidentResponseActivated: boolean;
	isAccidentResponseEnrolled: boolean;
	lastContactDateTime: Date;
	participantId: string;
	policyNumber: ID;
	telematicsId: string;
	unenrollmentDateTime: Date;
	unenrollReason: Enums.UnenrollReason;
}
export interface PolicyDriverData {
	driverFirstName: string;
	driverLastName: string;
	pJStatus: string;
	policyNumber: ID;
}
export interface TmxParticipantSummariesResponse {
	adActivated: boolean;
	adEnrolled: boolean;
	cadExperience: boolean;
	driverReferenceId: string;
	policyNumber: ID;
	telematicsId: string;
	tmxMobileRegistered: boolean;
	ubiActivated: boolean;
	ubiEnrolled: boolean;
	ubiExperience: string;
}
export interface TmxPolicySummaryResponse {
	participants: TmxParticipantSummariesResponse[];
	policy: string;
}
export interface AppInfo extends Resource {
	appName: string;
	assignmentExpirationDateTime: Date;
}
export interface AreParticipantDetails extends Resource {
	accidentResponseActivationDateTime: Date;
	accidentResponseConsentDateTime: Date;
	adActivated: boolean;
	adEnrolled: boolean;
	cadExperience: boolean;
	driverReferenceId: string;
	enrollmentDateTime: Date;
	lastContactDateTime: Date;
	tmxMobileRegistered: boolean;
	ubiActivated: boolean;
	ubiEnrolled: boolean;
	unenrollmentDateTime: Date;
	unenrollReason: Enums.UnenrollReason;
}
export interface ArePolicyDetails extends Resource {
	experienceType: Enums.AreExperience;
}
export interface CompatibilityActionTaken extends Resource {
	actionTakenCode: number;
	actionTakenXRefSeqId: number;
	compatibilitySeqId: number;
	createDateTime: Date;
	lastChangeUserId: string;
}
export interface CompatibilityItem extends Resource {
	compatibilityActionTakenXRef: CompatibilityActionTaken[];
	compatibilitySeqId: number;
	compatibilityTypeCode: number;
	createDateTime: Date;
	detailedDescription: string;
	deviceExperienceTypeCode: Enums.DeviceExperience;
	deviceSerialNumber: string;
	emailAddress: string;
	lastChangeDateTime: Date;
	lastChangeUserId: string;
	mobileDeviceId: string;
	mobileDeviceModelName: string;
	mobileOSName: string;
	nonIssueFlag: boolean;
	participantSeqId: number;
	policyNumber: ID;
	programCode: Enums.ProgramCode;
	vehicleMake: string;
	vehicleModel: string;
	vehicleModelYear: number;
}
export interface DeviceFirmwareDetails {
	cellFirmwareFileName: string;
	cellFirmwareValue: string;
	configurationFirmwareFileName: string;
	configurationFirmwareValue: string;
	gpsFirmwareFileName: string;
	gpsFirmwareValue: string;
	mainFirmwareFileName: string;
	mainFirmwareValue: string;
	obd2FirmwareFileName: string;
	obd2FirmwareValue: string;
	targetCellFirmwareFileName: string;
	targetCellFirmwareValue: string;
	targetConfigurationFirmwareFileName: string;
	targetConfigurationFirmwareValue: string;
	targetGpsFirmwareFileName: string;
	targetGpsFirmwareValue: string;
	targetMainFirmwareFileName: string;
	targetMainFirmwareValue: string;
	targetObd2FirmwareFileName: string;
	targetObd2FirmwareValue: string;
}
export interface DeviceHistory extends Resource {
	recoveryInfo: DeviceRecoveryItem[];
	shippingInfo: DeviceShippingInformation[];
	suspensionInfo: DeviceSuspensionItem[];
}
export interface DeviceRecoveryItem extends Resource {
	deviceReceivedDate: Date;
	deviceSeqId: number;
	deviceSerialNumber: string;
	isAbandoned: boolean;
	isSuspended: boolean;
	returnRequestDate: Date;
}
export interface DeviceShippingInformation {
	policyNumber: ID;
	returnedDeviceCreateDate: Date;
	returnedDeviceReceivedDate: Date;
	shipDateTime: Date;
}
export interface DeviceSuspensionItem extends Resource {
	daysSuspended: string;
	deviceSerialNumber: string;
	startDate: Date;
	userName: string;
}
export interface GPSCollectionStateChannel extends Resource {
	channel: string;
	createDateTime: Date;
	gpscollectiontypecode: number;
	lastChangeDateTime: Date;
	state: string;
}
export interface PluginDevice extends Resource {
	deviceAbandonedDate: Date;
	deviceManufacturer: string;
	deviceReceivedDate: Date;
	deviceSeqId: number;
	deviceSerialNumber: string;
	deviceVersion: string;
	features: Enums.DeviceFeature[];
	firmwareDetails: DeviceFirmwareDetails;
	history: DeviceHistory;
	homeBaseDeviceSeqId: number;
	lastRemoteResetDateTime: Date;
	location: string;
	pendingDeviceSerialNumber: string;
	reportedVIN: string;
	returnReasonCode: Enums.DeviceReturnReasonCode;
	shipDateTime: Date;
	sim: string;
	status: string;
	wirelessStatus: string;
}
export interface ScheduledEvent extends Resource {
	dataValue: number;
	executionDate: Date;
	policyExpiration: number;
	policyNumber: ID;
	policySuffix: number;
	processedDate: Date;
	scheduledEventSeqID: number;
	scheduledEventTypeCode: number;
}
export interface ScoringAlgorithmData extends Resource {
	code: number;
	createDateTime: Date;
	description: string;
	invalidDistractedDrivingCode: number;
	isActive: boolean;
	mobileSummarizerCode: number;
	mobileValueCalculatorCode: number;
	oBD2SummarizerCode: number;
	oBD2ValueCalculatorCode: number;
	ratedDistractedDrivingInd: number;
}
export interface SnapshotParticipantDetails extends Resource {
	billingTransactions: BillingTransaction[];
	changeEffectiveDate: Date;
	communications: Communication[];
	compatibilityIssues: CompatibilityItem[];
	enrollmentDate: Date;
	enrollmentExperience: Enums.DeviceExperience;
	firstContactDateTime: Date;
	initialFirstContactDateTime: Date;
	lastContactDateTime: Date;
	lastUploadDateTime: Date;
	monitoringCompleteConnectDays: number;
	optOutDetails: OptOutData;
	participantId: string;
	participantSeqId: number;
	policyStartDate: Date;
	programType: Enums.ProgramType;
	reasonCode: Enums.ParticipantReasonCode;
	scoringAlgorithmCode: Enums.AlgorithmType;
	status: Enums.ParticipantStatus;
	trialStartDate: Date;
	vehicleDetails: UBIVehicle;
}
export interface SnapshotPolicyDetails extends Resource {
	appInfo: AppInfo;
	createDate: Date;
	expirationDate: Date;
	groupExternalId: string;
	inceptionDate: Date;
	mailingAddress: Address;
	policySystem: string;
}
export interface TransactionAuditLog extends Resource {
	createDate: Date;
	policyNumber: ID;
	resolutionComments: string;
	resolutionStatus: string;
	resultMessage: string;
	resultStatus: string;
	transactionAuditSeqID: number;
	transactionData: string;
	transactionName: string;
}
export interface XirgoDevice extends Resource {
	benchTestStatusCode: number;
	binaryTransferInfo: string;
	cellfirmwaretypeversioncode: number;
	configurationFirmwareTypeVersionCode: number;
	createDateTime: Date;
	currentAudioVolume: number;
	deviceSeqID: number;
	deviceSerialNumber: string;
	firstContactDateTime: Date;
	gpscollectiontypecode: number;
	gpsfirmwaretypeversioncode: number;
	imei: string;
	inventoryLotSeqID: number;
	isCommunicationAllowed: boolean;
	isDataCollectionAllowed: boolean;
	isDBImportAllowed: boolean;
	isRefurbished: boolean;
	isSimActive: boolean;
	lastChangeDateTime: Date;
	lastContactDateTime: Date;
	lastRemoteResetDateTime: Date;
	lastUploadDateTime: Date;
	locationCode: number;
	mainFirmwareTypeVersionCode: number;
	manufacturerLotSeqID: number;
	obd2firmwaretypeversioncode: number;
	programCode: number;
	reportedProtocolCode: number;
	reportedVIN: string;
	returnLotSeqID: number;
	rmalotseqid: number;
	shipDateTime: Date;
	sim: string;
	statusCode: number;
	targetAudioVolume: number;
	targetFirmwareSetCode: number;
	versionCode: number;
	wTFStateInfo: string;
}
export interface KeyValuePair<TKey, TValue> {
	key: TKey;
	value: TValue;
}
