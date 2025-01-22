import { INotReadyToInvoiceViewModel } from '../../models/invoice-creation/not-ready-to-invoice';
import { createStore } from '../store';

export const {
  Provider: NotReadyToInvoiceProvider,
  useStore,
  useSetStore
} = createStore<INotReadyToInvoiceViewModel>();
