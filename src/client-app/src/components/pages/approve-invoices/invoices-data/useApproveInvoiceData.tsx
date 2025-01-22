import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { AgGridReact, CheckboxColumn, ColDef } from '@grc/ui-package';
import { useI18nState } from '../../../stores/settings/language-context';
import { IApproveInvoicesRowDataItem } from './approve-invoice-data.interface';
import {
  approveInvoicesUrl,
  invoiceDetailsUrl
} from '../../../common/constants/url-constants';

export default function useApproveInvoiceData() {
  const navigate = useNavigate();
  const { localeData } = useI18nState();
  const gridRef = useRef<AgGridReact>(null);
  const invoiceNoRenderer: React.FC<{
    value: any;
  }> = ({ value }) => {
    const handleClick = () => {
      navigate(invoiceDetailsUrl, {
        state: {
          invoiceId: value.invoiceNo,
          breadCrumbLinks: [
            {
              title: localeData.ApproveInvoices,
              path: approveInvoicesUrl
            },
            {
              title: value.invoiceNo
            }
          ]
        }
      });
    };

    return (
      <span
        onClick={handleClick}
        className="grc-text-link text-decoration-none"
      >
        {value.invoiceNo}
      </span>
    );
  };

  const columnDefs: ColDef<IApproveInvoicesRowDataItem>[] = [
    {
      ...CheckboxColumn,
      checkboxSelection: true,
      pinned: 'left'
    },
    {
      headerName: localeData.InvoiceNo,
      field: 'invoiceNo',
      enableRowGroup: false,
      cellRenderer: (params: { data: any }) =>
        invoiceNoRenderer({ value: params.data }),
      pinned: 'left',
      maxWidth: 120
    },
    { headerName: localeData.AccountName, field: 'accountName', minWidth: 150 },
    { headerName: localeData.RequestDate, field: 'requestDate', minWidth: 180 },
    { headerName: localeData.RequestedBy, field: 'requestedBy', minWidth: 150 },
    { headerName: localeData.Location, field: 'location', minWidth: 120 },
    {
      headerName: localeData.NoOfCorrections,
      field: 'noOfCorrections',
      cellStyle: { textAlign: 'right' },
      minWidth: 180
    },
    {
      headerName: localeData.NoOfShipments,
      field: 'noOfShipments',
      cellStyle: { textAlign: 'right' },
      minWidth: 180
    },
    {
      headerName: localeData.TotalAmount,
      field: 'totalAmount',
      cellStyle: { textAlign: 'right' },
      minWidth: 150
    }
  ];

  return {
    invoiceNoRenderer,
    columnDefs,
    gridRef
  };
}
