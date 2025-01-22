import { IAccessorial } from '../../../models/invoice-creation/invoice-details-popup/details-tab/accessorial.interface';
import {
  IDimension,
  IHandlingUnit
} from '../../../models/invoice-creation/invoice-details-popup/details-tab/handling-unit.interface';
import IInvoiceShipmentDetails from '../../../models/invoice-creation/invoice-shipment-details.interface';
import { IProductDetails } from '../../../models/invoice-creation/invoice-details-popup/details-tab/product-details.interface';
import { IReferenceAndDocuments } from '../../../models/invoice-creation/invoice-details-popup/details-tab/references-documents.interface';
import IChargeType from '../../../models/invoice-creation/invoice-details-popup/invoice-tab/chrage-type.interface';
import IInvoiceLocations from '../../../models/invoice-creation/invoice-details-popup/invoice-tab/invoice-locations.interface';
import IFilterDetails from '../../../models/invoice-creation/invoice-filters.interface';

export const accessorialDetails: IAccessorial[] = [
  {
    accessorialId: '1',
    accessorialType: '',
    accessorialName: ''
  }
];

export const dimensions: IDimension = {
  length: 40,
  width: 40,
  height: 40
};

export const invoiceHandlingUnitDetails: IHandlingUnit[] = [
  {
    handlingUnitId: '',
    handlingUnitTypeId: '',
    handlingUnitType: '',
    quantity: 5,
    dimensions: dimensions,
    weight: 80,
    isHazmat: true,
    isNonStackable: false,
    nmfc: '',
    nmfcClassId: '',
    nmfcClassName: '',
    huDescription: ''
  }
];

export const productDetails: IProductDetails[] = [
  {
    productId: '',
    productName: '',
    productNumber: '',
    quantity: '',
    innerPackCode: '',
    outerPackCode: '',
    productDescription: ''
  }
];

export const referencesAndDocuments: IReferenceAndDocuments[] = [
  {
    referenceId: '',
    referenceTypeId: '',
    referenceType: '',
    referenceNumber: '',
    document: {
      documentId: '',
      documentContent: '',
      documentType: '.',
      documentName: ''
    }
  }
];

export const chargeTypeDataSources: IChargeType[] = [
  {
    chargeType: '',
    cost: 0,
    charge: 0
  }
];

export const invoiceLocationDetails: IInvoiceLocations = {
  billTo: {
    id: '',
    tenantId: '',
    locationTypeId: '',
    locationType: 5,
    account: {
      accountId: '',
      name: ''
    },
    parentLocation: {
      locationId: '',
      locationName: ''
    },
    locationName: '',
    alias: '',
    email: '',
    telephoneNos: [
      {
        communicationType: 1,
        communicationAddressType: 1,
        contactValue: '+1 (555) 123-4567',
        displayOrder: 1
      }
    ],
    locationId: 1,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    countryId: '',
    country: '',
    latitude: 0,
    longitude: 0,
    status: 1
  },
  origin: {
    id: '',
    tenantId: '',
    locationTypeId: '',
    locationType: 4,
    account: {
      accountId: '',
      name: ''
    },
    parentLocation: {
      locationId: '',
      locationName: ''
    },
    locationName: '',
    alias: '',
    email: '',
    telephoneNos: [
      {
        communicationType: 1,
        communicationAddressType: 1,
        contactValue: '+1 (555) 123-4567',
        displayOrder: 1
      }
    ],
    locationId: 2,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    countryId: '',
    country: '',
    latitude: 0,
    longitude: 0,
    status: 1
  },
  destination: {
    id: '',
    tenantId: '',
    locationTypeId: '',
    locationType: 3,
    account: {
      accountId: '',
      name: ''
    },
    parentLocation: {
      locationId: '',
      locationName: ''
    },
    locationName: '',
    alias: '',
    email: '',
    telephoneNos: [
      {
        communicationType: 1,
        communicationAddressType: 1,
        contactValue: '+1 (555) 123-4567',
        displayOrder: 1
      }
    ],
    locationId: 14657,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    countryId: '',
    country: '',
    latitude: 0,
    longitude: 0,
    status: 1
  },
  customerDetails: {
    id: '',
    tenantId: '',
    locationTypeId: '',
    locationType: 5,
    account: {
      accountId: '',
      name: ''
    },
    parentLocation: {
      locationId: '',
      locationName: ''
    },
    locationName: '',
    alias: '',
    email: '',
    telephoneNos: [
      {
        communicationType: 1,
        communicationAddressType: 1,
        contactValue: '+1 (555) 123-4567',
        displayOrder: 1
      }
    ],
    locationId: 16768,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    countryId: '',
    country: '',
    latitude: 0,
    longitude: 0,
    status: 1
  },
  consignee: {
    id: '',
    tenantId: '',
    locationTypeId: '',
    locationType: 3,
    account: {
      accountId: '',
      name: ''
    },
    parentLocation: {
      locationId: '',
      locationName: ''
    },
    locationName: '',
    alias: '',
    email: '',
    telephoneNos: [
      {
        communicationType: 1,
        communicationAddressType: 1,
        contactValue: '+1 (555) 123-4567',
        displayOrder: 1
      }
    ],
    locationId: 14657,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    countryId: '',
    country: '',
    latitude: 0,
    longitude: 0,
    status: 1
  },
  shipper: {
    id: '',
    tenantId: '',
    locationTypeId: '',
    locationType: 5,
    account: {
      accountId: '',
      name: ''
    },
    parentLocation: {
      locationId: '',
      locationName: ''
    },
    locationName: '',
    alias: '',
    email: '',
    telephoneNos: [
      {
        communicationType: 1,
        communicationAddressType: 1,
        contactValue: '+1 (555) 123-4567',
        displayOrder: 1
      }
    ],
    locationId: 2,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    countryId: '',
    country: '',
    latitude: 0,
    longitude: 0,
    status: 1
  }
};

export const filterDetails: IFilterDetails = {
  accountFilter: undefined,
  billToFilter: undefined,
  locationFilter: [],
  locations: [],
  fromDate: '',
  toDate: '',
  accounts: undefined,
  billTos: undefined
};

export const invoicePopupDetails: IInvoiceShipmentDetails = {
  shipmentDetails: [],
  accessorialDetails: accessorialDetails,
  handlingUnitDetails: invoiceHandlingUnitDetails,
  productDetails: productDetails,
  referenceAndDocuments: referencesAndDocuments,
  chargeDetails: chargeTypeDataSources,
  locationDetails: invoiceLocationDetails,
  reasonCode: '',
  shipmentIds: [],
  filterDetails: filterDetails
};
