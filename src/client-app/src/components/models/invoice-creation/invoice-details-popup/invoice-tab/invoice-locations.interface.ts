export default interface IInvoiceLocations {
  billTo: ILocations;
  shipper: ILocations;
  consignee: ILocations;
  origin: ILocations;
  destination: ILocations;
  customerDetails: ILocations;
}

export interface ILocations {
  id: string;
  tenantId: string;
  locationTypeId: string;
  locationType: LocationType;
  account: IAccountReference;
  parentLocation: ILocationReference;
  locationName: string;
  alias: string;
  email: string;
  telephoneNos: ICommunicationDetails[];
  locationId: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  countryId: string;
  country: string;
  latitude: number;
  longitude: number;
  status: Status;
}

export enum LocationType {
  TenantOwned = 1,
  TenantHub = 2,
  AccountOwned = 3,
  AccountSupplier = 4,
  AccountCustomer = 5,
  Carrier = 6,
  Broker = 7,
  Agent = 8,
  BillTo = 9
}

export interface IAccountReference {
  accountId: string;
  name: string;
}

export interface ILocationReference {
  locationId: string;
  locationName: string;
}
export enum CommunicationAddressType {
  Home = 1,
  Work = 2,
  Mobile = 3,
  Fax = 4,
  Other = 5
}

export enum CommunicationType {
  Mobile = 1,
  Email = 2
}

export interface ICommunicationDetails {
  communicationType: CommunicationType;
  communicationAddressType: CommunicationAddressType;
  contactValue: string;
  displayOrder: number;
}

export enum Status {
  Active = 1,
  Inactive = 2
}
