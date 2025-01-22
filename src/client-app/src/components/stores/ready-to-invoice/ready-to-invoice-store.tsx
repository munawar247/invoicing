import { IReadyToInvoiceViewModel } from '../../models/invoice-creation/ready-to-invoice.interface';
import { createStore } from '../store';

export const {
  Provider: ReadyToInvoiceProvider,
  useStore,
  useSetStore
} = createStore<IReadyToInvoiceViewModel>();
