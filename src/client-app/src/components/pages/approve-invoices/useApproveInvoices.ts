import { useCallback, useEffect, useRef, useState } from 'react';
import { AgGridReact, CheckboxColumn } from '@grc/ui-package';
import { useI18nState } from '../../stores/settings/language-context';
import {
  useSetStore,
  useStore
} from '../../stores/approve-invoices/invoice-details-store';
import InvoiceNoRenderer from './invoices-data/invoice-cell-renderer';
import { approveInvoicesStaticRowData } from '../../data/data';

export default function useApproveInvoices() {
  const gridRef = useRef<AgGridReact>(null);
  const { localeData } = useI18nState();
  const setGlobalStore = useSetStore();
  const [invoiceDetailsStore] = useStore(store => store['invoiceDetails']);

  const [isSendInvoicePopupVisible, setIsSendInvoicePopupVisible] =
    useState<boolean>(false);
  const [isInCreation, setIsInvoiceCreation] = useState<boolean>(false);

  const columnDefs = [
    {
      ...CheckboxColumn,
      checkboxSelection: true,
      headerName: localeData.InvoiceNo,
      field: 'invoiceNo',
      enableRowGroup: false,
      cellRenderer: (params: { data: any }) =>
        InvoiceNoRenderer({ value: params?.data }),
      pinned: 'left',
      maxWidth: 150
    },
    { headerName: localeData.AccountName, field: 'accountName', minWidth: 170 },
    { headerName: localeData.RequestDate, field: 'requestDate', minWidth: 180 },
    { headerName: localeData.RequestedBy, field: 'requestedBy', minWidth: 170 },
    { headerName: localeData.Location, field: 'location', maxWidth: 130 },
    {
      headerName: localeData.NoOfCorrections,
      field: 'noOfCorrections',
      hide: true,
      cellStyle: { textAlign: 'right' },
      minWidth: 180
    },
    {
      headerName: localeData.NoOfShipments,
      field: 'noOfShipments',
      hide: true,
      cellStyle: { textAlign: 'right' },
      minWidth: 180
    },
    {
      headerName: localeData.TotalAmount,
      field: 'totalAmount',
      cellStyle: { textAlign: 'right', fontWeight: 'bold' },
      maxWidth: 170,
      valueFormatter: (params: any) => {
        return `$ ${Number(params.value).toFixed(2)}`;
      }
    }
  ];

  const GetInvoiceDetails = useCallback(() => {
    setGlobalStore({ invoiceDetails: approveInvoicesStaticRowData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    GetInvoiceDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isSendInvoicePopupVisible,
    setIsSendInvoicePopupVisible,
    isInCreation,
    setIsInvoiceCreation,
    gridRef,
    invoiceDetailsStore,
    columnDefs
  };
}
