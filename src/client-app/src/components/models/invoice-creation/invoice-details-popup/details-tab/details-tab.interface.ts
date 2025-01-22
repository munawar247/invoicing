import { IAddressInformation } from './address.interface';
import { IDimensions, IUnit } from './dimensions.interface';

export interface CareOfDetail {
  name: string;
  email: string;
  mobile: string;
}

export interface Shipper {
  tradingPartnerId: string;
  name: string;
  address: IAddressInformation;
  careOfDetail: CareOfDetail;
  emailAddress: string;
  mobileNumber: string;
  contactPartnerId: string;
  contactPartner: string;
  contactPartnerEmail: string;
  contactPartnerMobileNumber: string;
}

export interface PickupInfo {
  readyDate: string | number | Date;
  closeDate: string | number | Date;
  instructions: string;
}

interface DeliveryInfo {
  readyDate: string | number | Date;
  closeDate: string | number | Date;
  instructions: string;
}

interface Customer {
  id: string;
  name: string;
}

interface PaymentTerm {
  id: string;
  name: string;
}

interface BillTo {
  id: string;
  name: string;
}

interface BillingInfo {
  customer: Customer;
  paymentTerm: PaymentTerm;
  billTo: BillTo;
}

export interface HandlingUnit {
  handlingUnitId: string;
  handlingUnitTypeId: string;
  handlingUnitType: string;
  quantity: number;
  dimensions: IDimensions;
  weight: IUnit;
  nmfc: string;
  nmfcClassId: string;
  nmfcClassName: string;
  productDescription: string;
  isHazmat: boolean;
  isNonStackable: boolean;
  hazmat?: IHazmat;
}

export interface ProductDetail {
  productId: string;
  productName: string;
  productNumber: string;
  quantity: number;
  innerPackCode: string;
  outerPackCode: string;
  productDescription: string;
}

export interface Accessorial {
  accessorialId: string;
  accessorialType: string;
  accessorialName: string;
}

export interface Document {
  documentId: string;
  documentContent: string;
  documentType: string;
  documentName: string;
}

export interface Reference {
  referenceId: string;
  referenceTypeId: string;
  referenceType: string;
  referenceNumber: string;
  document: Document;
}

export interface IShipmentDetails {
  shipmentId: string;
  shipper: Shipper;
  consignee: Shipper;
  mode: string;
  pickupDate: string;
  deliveryDate: string;
  handlingUnitsCount: number;
  carrierName: string;
  charge: number;
  fuel: number;
  accessorial: number;
  total: number;
}

export interface IResponseObject {
  id: string;
  accountId: string;
  shipper: Shipper;
  consignee: Shipper;
  pickupInfo: PickupInfo;
  deliveryInfo: DeliveryInfo;
  billingInfo: BillingInfo;
  handlingUnits: HandlingUnit[];
  productDetails: ProductDetail[];
  accessorials: Accessorial[];
  references: Reference[];
  transportationMode: { name: string; transportationModeId: string };
  value: number;
  costRate: number | null;
  chargeRate: number | null;
}

export interface IExceptions {
  shipmentID: string;
  exceptionReason: string;
  mode: string;
  createdDate: Date;
  action: string;
}

export interface IDetailsinfo {
  header: string;
  title: string;
  location: string;
  telephoneNo: string;
  emailId: string;
}

export interface IHazmat {
  unitedNationsNumber: string;
  properShippingName: string;
  hazardClass: HazardClass;
  packagingGroup: IPackingGroup;
  emergencyResponsePersonName: string;
  emergencyResponseContactType: string;
  emergencyResponseContact: string;
}

export enum HazardClass {
  Class1 = 1,
  Class2 = 2,
  Class3 = 3,
  Class4 = 4,
  Class5 = 5,
  Class6 = 6,
  Class7 = 7,
  Class8 = 8,
  Class9 = 9
}

export enum IPackingGroup {
  Single,
  Composite,
  Combination
}
