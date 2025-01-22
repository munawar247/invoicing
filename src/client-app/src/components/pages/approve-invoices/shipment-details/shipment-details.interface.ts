export interface IProps {
  isInvoiceDataVisible: boolean;
  isStatementDetailsVisible: boolean;
  invoiceNo: string;
  isInvoiceDetailsVisible: boolean;
  setIsInvoiceDataVisible: (isVisible: boolean) => void;
  setIsStatementDetailsVisible: (isVisible: boolean) => void;
  setInvoiceNo: (invoiceNo: string) => void;
  setIsInvoiceDetailsVisible: (isVisible: boolean) => void;
}
