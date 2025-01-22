import { useState } from 'react';
import { CheckboxColumn } from '@grc/ui-package';
import { convertToShortDate } from '@grc/ui-utility';
import { useI18nState } from '../../../../stores/settings/language-context';
import { IOrdersRowDataItem } from '../orders-data.interface';

export default function useOnHoldInvoice() {
  const { localeData } = useI18nState();
  const [onHoldData, setOnHoldData] = useState<IOrdersRowDataItem[]>([]);

  const onHoldInvoiceColumnsDef = [
    {
      ...CheckboxColumn,
      checkboxSelection: true,
      headerName: localeData.ShpID,
      field: 'shipmentId',
      cellStyle: { color: '#1099e7' },
      pinned: 'left',
      maxWidth: 120
    },
    {
      headerName: localeData.ShpCreationDate,
      field: 'pickupDate',
      minWidth: 180,
      cellRenderer: (params: any) =>
        convertToShortDate(new Date(params?.data?.pickupDate))
    },
    {
      headerName: localeData.Origin,
      field: 'origin',
      minWidth: 300,
      autoHeight: true,
      cellStyle: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        lineHeight: '1.5'
      }
    },
    {
      headerName: localeData.Destination,
      field: 'destination',
      minWidth: 300,
      autoHeight: true,
      cellStyle: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        lineHeight: '1.5'
      }
    },
    {
      headerName: `${localeData.Charge} ($)`,
      field: 'charge',
      hide: true,
      cellStyle: { textAlign: 'right' },
      minWidth: 120,
      valueFormatter: (params: any) => {
        return `$ ${Number(params.value).toFixed(2)}`;
      }
    },
    {
      headerName: `${localeData.Fuel} ($)`,
      field: 'fuel',
      hide: true,
      cellStyle: { textAlign: 'right' },
      minWidth: 120,
      valueFormatter: (params: any) => {
        return `$ ${Number(params.value).toFixed(2)}`;
      }
    },
    {
      headerName: `${localeData.Accessorial} ($)`,
      field: 'accessorial',
      hide: true,
      cellStyle: { textAlign: 'right' },
      minWidth: 120,
      valueFormatter: (params: any) => {
        return `$ ${Number(params.value).toFixed(2)}`;
      }
    },
    {
      headerName: `${localeData.Total} ($)`,
      field: 'total',
      hide: true,
      cellStyle: { textAlign: 'right', fontWeight: 'bold' },
      minWidth: 120,
      valueFormatter: (params: any) => {
        return `$ ${Number(params.value).toFixed(2)}`;
      }
    }
  ];

  return {
    setOnHoldData,
    onHoldData,
    onHoldInvoiceColumnsDef
  };
}
