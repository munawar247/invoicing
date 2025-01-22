export interface IAddressDetail {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ICareOfDetail {
  name: string;
  email: string;
  mobile: string;
}

export interface IContactDetail {
  tradingPartnerId: number;
  tradingPartner: string;
  addressDetail: IAddressDetail;
  careOfDetail: ICareOfDetail;
  emailAddress: string;
  mobileNumber: string;
}

export interface IBankDetails {
  bankName: string;
  accountNo: string;
  branchName: string;
  swiftCode: string;
}

export interface IThirdPartyDetail {
  thirdPartyId: string;
  thirdParty: string;
  addressDetail: IAddressDetail;
  emailAddress: string;
  mobileNumber: string;
}

export interface IInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate?: string | Date | string;
  dueDate?: number | Date | string;
  totalDue: number;
  shipmentFromDate?: number | Date | string;
  shipmentToDate?: number | Date | string;
  noOfPages: number;
  noOfException: number;
  totalShipments: number;
  shipmentsOnInvoice: number;
  customer: IContactDetail;
  billTo: IContactDetail;
  bankDetails: IBankDetails;
  thirdPartyDetail: IThirdPartyDetail;
}
