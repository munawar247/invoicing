import {
  IAddressDetail,
  IBankDetails,
  ICareOfDetail,
  IContactDetail,
  IInvoice,
  IThirdPartyDetail
} from '../models/approve-invoice/Invoice.interface';
import { ICharges } from '../models/approve-invoice/charges.interface';
import { IInvoiceHistory } from '../models/invoice-history/invoice-history.interface';
import { IApproveInvoicesRowDataItem } from '../pages/approve-invoices/invoices-data/approve-invoice-data.interface';

export const elementAttr = { id: 'selectBox' };
export const dropDownOptions = { container: '#selectBox' };

export const invoiceTabsMenu = [
  {
    id: 0,
    text: 'Ready to Invoice'
  },
  {
    id: 1,
    text: 'Not Ready to Invoice'
  },
  {
    id: 2,
    text: 'On Hold Invoices'
  }
];

export const emailData = [
  { id: 0, name: 'wade.cooper@gmail.com' },
  { id: 1, name: 'arlene.m@gmail.com' }
];

export const isPagination: boolean = true;
export const pageSizeSelectorOptions: any = [10, 20, 50];

// Address Details
const customerAddressDetail: IAddressDetail = {
  address: '1000 Central Pkwy North No.',
  city: 'Worcester',
  state: 'Massachusetts',
  zipCode: '1606',
  country: 'United States'
};

const billToAddressDetail: IAddressDetail = {
  address: 'Felipe Angeles 617 Col Alpes',
  city: 'Saltillo',
  state: 'Coahuila',
  zipCode: '25270',
  country: 'Mexico'
};

const thirdPartyAddressDetail: IAddressDetail = {
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: ''
};

// Care Of Details
const customerCareOfDetail: ICareOfDetail = {
  name: 'William',
  email: 'william@gmail.com',
  mobile: '+1 (254) 954-5114'
};

const billToCareOfDetail: ICareOfDetail = {
  name: 'Angel Culhane',
  email: 'culhane@gmail.com',
  mobile: '+1 (542) 654-1345'
};

// Contact Details
const customer: IContactDetail = {
  tradingPartnerId: 1,
  tradingPartner: 'Koepp Group',
  addressDetail: customerAddressDetail,
  careOfDetail: customerCareOfDetail,
  emailAddress: 'KoeppGroup@gmail.com',
  mobileNumber: '+1 (444) 456-3215'
};

const billTo: IContactDetail = {
  tradingPartnerId: 2,
  tradingPartner: 'Collins-Treutel',
  addressDetail: billToAddressDetail,
  careOfDetail: billToCareOfDetail,
  emailAddress: 'Collins@gmail.com',
  mobileNumber: '+1 (222) 456-4258'
};

// Bank Details
const bankDetails: IBankDetails = {
  bankName: 'Bank Of America',
  accountNo: '122445527',
  branchName: 'California',
  swiftCode: 'BOFAUS3N'
};

// Third Party Details
const thirdPartyDetail: IThirdPartyDetail = {
  thirdPartyId: '',
  thirdParty: '3rd Party',
  addressDetail: thirdPartyAddressDetail,
  emailAddress: '',
  mobileNumber: '+1 (777) 456-9548'
};

// Invoice Data
export const InvoiceData: IInvoice = {
  id: '',
  invoiceNumber: '',
  invoiceDate: new Date('Nov 10, 2024'),
  dueDate: new Date('Nov 18, 2024'),
  totalDue: 0,
  shipmentFromDate: new Date('Nov 06,2024'),
  shipmentToDate: new Date('Nov 08, 2024'),
  noOfPages: 24,
  noOfException: 2,
  totalShipments: 11,
  shipmentsOnInvoice: 9,
  customer: customer,
  billTo: billTo,
  bankDetails: bankDetails,
  thirdPartyDetail: thirdPartyDetail
};

export const ChargesData: ICharges = {
  charge: 10,
  fuel: 20,
  accessorial: 20,
  subTotal: 0,
  discount: 0,
  taxes: 0,
  total: 50
};

export const accessorialCharge = [
  {
    chargeType: '',
    cost: 0,
    charge: 0
  }
];

export const pickupAndDueDateTimeDetails = {
  pickupDateTime: new Date('2024-06-03T10:12:00.000Z'),
  dueDateTime: new Date('2024-06-05T10:12:00.000Z'),
  mode: 'FTL'
};

export const chargesList = [
  { charge: 100, fuel: 50, accessorial: 20, total: 170 },
  { charge: 120, fuel: 40, accessorial: 25, total: 185 },
  { charge: 90, fuel: 60, accessorial: 30, total: 180 },
  { charge: 110, fuel: 55, accessorial: 15, total: 180 }
];

export const invoiceHistoryData: IInvoiceHistory[] = [
  {
    invoiceNo: 'I374751',
    invoiceDate: 'Nov 01, 2024',
    invoiceSentDate: 'Nov 01, 2024',
    invoiceDueDate: 'Nov 30, 2024',
    referenceNo: 'CUST-SDF58458',
    account: 'Tesla',
    billToName: 'Keeling',
    billToAddress: '145 Corporate Dr, London, KY 21458'
  },
  {
    invoiceNo: 'I374752',
    invoiceDate: 'Nov 05, 2024',
    invoiceSentDate: 'Nov 05, 2024',
    invoiceDueDate: 'Dec 05, 2024',
    referenceNo: 'CUST-XYZ67890',
    account: 'Toyota',
    billToName: 'Smith',
    billToAddress: '200 Silicon Ave, Cupertino, CA 95014'
  },
  {
    invoiceNo: 'I374753',
    invoiceDate: 'Nov 10, 2024',
    invoiceSentDate: 'Nov 10, 2024',
    invoiceDueDate: 'Dec 10, 2024',
    referenceNo: 'CUST-DEF54321',
    account: 'Ford',
    billToName: 'Johnson',
    billToAddress: '1600 Amphitheatre Pkwy, Mountain View, CA 94043'
  },
  {
    invoiceNo: 'I374754',
    invoiceDate: 'Nov 15, 2024',
    invoiceSentDate: 'Nov 15, 2024',
    invoiceDueDate: 'Dec 15, 2024',
    referenceNo: 'CUST-HIJ98765',
    account: 'MG',
    billToName: 'Brown',
    billToAddress: '410 Terry Ave N, Seattle, WA 98109'
  },
  {
    invoiceNo: 'I374755',
    invoiceDate: 'Nov 20, 2024',
    invoiceSentDate: 'Nov 20, 2024',
    invoiceDueDate: 'Dec 20, 2024',
    referenceNo: 'CUST-KLM65432',
    account: 'Audi',
    billToName: 'Davis',
    billToAddress: '1 Microsoft Way, Redmond, WA 98052'
  },
  {
    invoiceNo: 'I374756',
    invoiceDate: 'Nov 25, 2024',
    invoiceSentDate: 'Nov 25, 2024',
    invoiceDueDate: 'Dec 25, 2024',
    referenceNo: 'CUST-NOP32109',
    account: 'Honda',
    billToName: 'Miller',
    billToAddress: '1 Hacker Way, Menlo Park, CA 94025'
  },
  {
    invoiceNo: 'I374757',
    invoiceDate: 'Nov 30, 2024',
    invoiceSentDate: 'Nov 30, 2024',
    invoiceDueDate: 'Dec 30, 2024',
    referenceNo: 'CUST-QRS65489',
    account: 'Suzuki',
    billToName: 'Wilson',
    billToAddress: '5808 Sunset Blvd, Los Angeles, CA 90028'
  },
  {
    invoiceNo: 'I374758',
    invoiceDate: 'Dec 01, 2024',
    invoiceSentDate: 'Dec 01, 2024',
    invoiceDueDate: 'Dec 31, 2024',
    referenceNo: 'CUST-TUV90327',
    account: 'Tesla',
    billToName: 'Taylor',
    billToAddress: '4 World Trade Center, New York, NY 10007'
  },
  {
    invoiceNo: 'I374759',
    invoiceDate: 'Dec 05, 2024',
    invoiceSentDate: 'Dec 05, 2024',
    invoiceDueDate: 'Jan 04, 2025',
    referenceNo: 'CUST-WXY81265',
    account: 'Tesla',
    billToName: 'Lee',
    billToAddress: '85 Challenger Rd, Ridgefield Park, NJ 07660'
  },
  {
    invoiceNo: 'I374760',
    invoiceDate: 'Dec 10, 2024',
    invoiceSentDate: 'Dec 10, 2024',
    invoiceDueDate: 'Jan 09, 2025',
    referenceNo: 'CUST-ZAB73420',
    account: 'BMW',
    billToName: 'Martinez',
    billToAddress: '2200 Mission College Blvd, Santa Clara, CA 95054'
  }
];

export const charges = [
  {
    chargeType: 'Freight',
    cost: 100,
    charge: 150
  },
  {
    chargeType: 'Fuel Surcharge',
    cost: 50,
    charge: 75
  },
  {
    chargeType: 'Accessorial',
    accessorial: [
      {
        chargeType: 'After Hours Pickup',
        cost: 20,
        charge: 30
      },
      {
        chargeType: 'Drop Trailer',
        cost: 40,
        charge: 60
      },
      {
        chargeType: 'Warehouse Services',
        cost: 80,
        charge: 60
      }
    ]
  }
];

export const notReadyToInvoiceStaticData = [
  {
    shipmentId: 'S1539965',
    exceptionReason: 'Packing Slip Missing',
    transportationMode: 'LTL',
    createdDate: 'NOV 12, 2024',
    action: 'Update'
  },
  {
    shipmentId: 'S1539964',
    exceptionReason: 'Fuel Surcharge',
    transportationMode: 'FTL',
    createdDate: 'NOV 14, 2024',
    action: 'Update'
  },
  {
    shipmentId: 'S1539967',
    exceptionReason: 'POD Missing',
    transportationMode: 'LTL',
    createdDate: 'NOV 17, 2024',
    action: 'Update'
  }
];

export const approveInvoicesStaticRowData: IApproveInvoicesRowDataItem[] = [
  {
    invoiceNo: 'I374156',
    accountName: 'Tesla',
    requestDate: 'Nov 07, 2024 | 14:20 EST',
    requestedBy: 'Maren Mango',
    location: 'U.S.',
    noOfCorrections: 20,
    noOfShipments: 40,
    totalAmount: 100.5
  },
  {
    invoiceNo: 'I375777',
    accountName: 'Toyota',
    requestDate: 'Nov 23, 2024 | 16:30 EST',
    requestedBy: 'Jocelyn Press',
    location: 'U.S.',
    noOfCorrections: 3,
    noOfShipments: 10,
    totalAmount: 50.0
  },
  {
    invoiceNo: 'I374125',
    accountName: 'MG',
    requestDate: 'Jan 23, 2024 | 13:50 EST',
    requestedBy: 'Tiana George',
    location: 'U.S.',
    noOfCorrections: 2,
    noOfShipments: 10,
    totalAmount: 80.0
  },
  {
    invoiceNo: 'I374158',
    accountName: 'Ford',
    requestDate: 'Jan 23, 2024 | 11:45 EST',
    requestedBy: 'Corey Saris',
    location: 'Canada',
    noOfCorrections: 10,
    noOfShipments: 20,
    totalAmount: 96.0
  },
  {
    invoiceNo: 'I374151',
    accountName: 'Tesla',
    requestDate: 'Jan 23, 2024 | 10:35 EST',
    requestedBy: 'Maren Mango',
    location: 'U.S.',
    noOfCorrections: 20,
    noOfShipments: 40,
    totalAmount: 100.5
  },
  {
    invoiceNo: 'I371242',
    accountName: 'Audi',
    requestDate: 'Jan 23, 2024 | 17:35 EST',
    requestedBy: 'Desirae Botosh',
    location: 'Mexico',
    noOfCorrections: 20,
    noOfShipments: 40,
    totalAmount: 100.5
  },
  {
    invoiceNo: 'I374584',
    accountName: 'Honda',
    requestDate: 'Jan 23, 2024 | 12:20 EST',
    requestedBy: 'Dulce Gouse',
    location: 'Canada',
    noOfCorrections: 22,
    noOfShipments: 10,
    totalAmount: 180.0
  },
  {
    invoiceNo: 'I378547',
    accountName: 'Suzuki',
    requestDate: 'Jan 23, 2024 | 14:40 EST',
    requestedBy: 'Makenna Carder',
    location: 'U.S.',
    noOfCorrections: 6,
    noOfShipments: 2,
    totalAmount: 85.0
  },
  {
    invoiceNo: 'I374895',
    accountName: 'Jeep',
    requestDate: 'Jan 23, 2024 | 15:45 EST',
    requestedBy: 'Maren Mango',
    location: 'U.S.',
    noOfCorrections: 20,
    noOfShipments: 40,
    totalAmount: 100.5
  },
  {
    invoiceNo: 'I374552',
    accountName: 'Ford',
    requestDate: 'Jan 23, 2024 | 17:20 EST',
    requestedBy: 'Omar Siphron',
    location: 'Mexico',
    noOfCorrections: 11,
    noOfShipments: 56,
    totalAmount: 180.0
  }
];

export const onHoldInvoicesStaticData = [
  {
    shipmentId: 'S658428',
    pickupDate: 'Nov 14, 2024',
    origin:
      '307 323 Bingaman St Attn Ron Mcgettigan, Reading, Pennsylvania, 19610, United States',
    destination:
      '2040 Janice Avenue, Melrose Park, Illinois, 60160, United States',
    charge: '25',
    fuel: '50',
    accessorial: '40',
    total: '115'
  },
  {
    shipmentId: 'S658954',
    pickupDate: 'Nov 17, 2024',
    origin:
      '3808 North Sullivan Rd Bldg 10 Ste, Lansing, Michigan, 99216, United States',
    destination:
      '201 Townsend St Po 16 0056, Lansing, Michigan, 48913, United States',
    charge: '40',
    fuel: '50',
    accessorial: '50',
    total: '140'
  },
  {
    shipmentId: 'S658245',
    pickupDate: 'Nov 18, 2024',
    origin:
      '1187 Brittmoore Rd Laura Hamby, Houston, Texas, 77043, United States',
    destination:
      'Co South Shore Electric Motor Pum, North Quincy, Massachusetts, 2171, United States',
    charge: '80',
    fuel: '50',
    accessorial: '200',
    total: '330'
  }
];

export const sentForApprovalDetails = {
  requestedBy: 'Corine Johnson',
  requestedDate: 'Nov 14, 2024'
};

export const locationsNew = [
  {
    id: '1',
    name: 'location 1'
  },
  {
    id: '2',
    name: 'location 2'
  },
  {
    id: '3',
    name: 'location 3'
  }
];
