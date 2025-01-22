import { CheckboxColumn } from '@grc/ui-package';
import { dateFormatterCellRenderer } from '@grc/ui-utility';
import { useI18nState } from '../../../../stores/settings/language-context';
import InvoiceDetailsPopup from '../invoice-details-popup';

export default function useReadyToInvoice() {
  const { localeData } = useI18nState();
  const readyToInvoiceColumnsDef = [
    {
      ...CheckboxColumn,
      checkboxSelection: true,
      pinned: 'left'
    },
    {
      headerName: localeData.ShpID,
      field: 'shipmentId',
      cellStyle: { color: '#1099e7' },
      pinned: 'left',
      maxWidth: 120
    },
    {
      headerName: localeData.ShipmentDate,
      field: 'pickupDate',
      minWidth: 150,
      cellRenderer: (params: any) =>
        dateFormatterCellRenderer(params?.data?.pickupDate)
    },
    {
      headerName: localeData.Origin,
      field: 'shipper.address',
      minWidth: 300,
      autoHeight: true,
      cellStyle: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        lineHeight: '1.5'
      },
      valueGetter: (params: any) => {
        const address = params.data.consignee?.address;
        if (!address) return '';
        const { streetAddress, city, provinceState, country, postalZipCode } =
          address;
        return `${streetAddress?.[0] || ''}, ${city}, ${provinceState}, ${postalZipCode}, ${country}`;
      }
    },
    {
      headerName: localeData.Destination,
      field: 'consignee.address',
      minWidth: 300,
      autoHeight: true,
      cellStyle: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        lineHeight: '1.5'
      },
      valueGetter: (params: any) => {
        const address = params.data.consignee?.address;
        if (!address) return '';
        const { streetAddress, city, provinceState, country, postalZipCode } =
          address;
        return `${streetAddress?.[0] || ''}, ${city}, ${provinceState}, ${postalZipCode}, ${country}`;
      }
    },
    {
      headerName: `${localeData.Charge} ($)`,
      field: 'charge',
      cellStyle: { textAlign: 'right' },
      cellRenderer: InvoiceDetailsPopup,
      minWidth: 120
    },
    {
      headerName: `${localeData.Fuel} ($)`,
      field: 'fuel',
      cellStyle: { textAlign: 'right' },
      minWidth: 120
    },
    {
      headerName: `${localeData.Accessorial} ($)`,
      field: 'accessorial',
      cellStyle: { textAlign: 'right' },
      minWidth: 120
    },
    {
      headerName: `${localeData.Total} ($)`,
      field: 'total',
      cellStyle: { textAlign: 'right' },
      minWidth: 120
    }
  ];

  return {
    readyToInvoiceColumnsDef
  };
}
