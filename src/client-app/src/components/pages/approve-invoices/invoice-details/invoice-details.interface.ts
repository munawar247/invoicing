export interface IProps {
  isInvoiceDataVisible: boolean;
  invoiceNo: string;
  requestedBy : string;
  isStatementDetailsVisible: boolean;
  isInvoiceDetailsVisible: boolean;
  setIsInvoiceDataVisible: (isVisible: boolean) => void;
  setInvoiceNo: (invoiceNo: string) => void;
  setRequestedBy: (requestedBy: string) => void;
  setIsStatementDetailsVisible: (isVisible: boolean) => void;
  setIsInvoiceDetailsVisible: (isVisible: boolean) => void;
}
