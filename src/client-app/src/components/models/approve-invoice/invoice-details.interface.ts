import { IApproveInvoicesRowDataItem } from '../../pages/approve-invoices/invoices-data/approve-invoice-data.interface';
import { IShipmentDetails } from '../invoice-creation/invoice-details-popup/details-tab/details-tab.interface';

export interface IInvoiceDetails {
  invoiceDetails: IApproveInvoicesRowDataItem[];
  shipmentDetails: IShipmentDetails[] | [];
}
