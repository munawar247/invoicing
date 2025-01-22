import { IInvoiceDetails } from '../../models/approve-invoice/invoice-details.interface';
import { approveInvoiceDetails } from '../../pages/approve-invoices/invoices-data/approve-invoice-initial-data';
import { createStore } from '../store';

export const {
  Provider: ApproveInvoicesProvider,
  useStore,
  useSetStore
} = createStore<IInvoiceDetails>(approveInvoiceDetails);
