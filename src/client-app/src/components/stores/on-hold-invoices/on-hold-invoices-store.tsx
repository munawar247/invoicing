import { IOnHoldInvoicesViewModel } from '../../models/invoice-creation/on-hold-invoice';
import { createStore } from '../store';

export const {
  Provider: OnHoldInvoicesProvider,
  useStore,
  useSetStore
} = createStore<IOnHoldInvoicesViewModel>();
