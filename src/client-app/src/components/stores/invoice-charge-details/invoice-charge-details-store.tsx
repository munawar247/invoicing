import IInvoiceShipmentDetails from '../../models/invoice-creation/invoice-shipment-details.interface';
import { invoicePopupDetails } from '../../pages/invoice-creation/invoice-data/initial-invoice-data';
import { createStore } from '../store';

export const {
  Provider: InvoiceChargeDetailsProvider,
  useStore,
  useSetStore
} = createStore<IInvoiceShipmentDetails>(invoicePopupDetails);
