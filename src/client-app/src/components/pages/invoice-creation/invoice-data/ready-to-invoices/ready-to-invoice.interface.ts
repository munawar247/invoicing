import { IOrdersRowDataItem } from '../orders-data.interface';

export interface IInvoiceReady {
  setInvoiceHoldOrPreview: (isVisible: boolean) => void;
  setOnHoldInvoiceData: (data: IOrdersRowDataItem[]) => void;
}
