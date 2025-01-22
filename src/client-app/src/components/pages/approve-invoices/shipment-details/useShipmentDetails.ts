import { useCallback, useEffect } from 'react';
import { CheckboxColumn, ColDef, GrcNotify, NotifyType } from '@grc/ui-package';
import { convertToShortDate, useGetApiData } from '@grc/ui-utility';
import { useI18nState } from '../../../stores/settings/language-context';
import {
  useSetStore,
  useStore
} from '../../../stores/approve-invoices/invoice-details-store';
import { IShipmentsRowDataItem } from './shipments-data.interface';
import notify from '../../common/notify';
import { getShipmentDetailsUrl } from '../../../common/constants/url-constants';
import { shipmentService } from '../../../common/constants/constants';
import { chargesList } from '../../../data/data';

export default function useShipmentDetails() {
  const { localeData } = useI18nState();
  const setGlobalStore = useSetStore();
  const { fetchData } = useGetApiData();
  const [shipmentDetailsStore] = useStore(store => store['shipmentDetails']);

  const approveInvoiceShipmentsColumnDefs: ColDef<IShipmentsRowDataItem>[] = [
    {
      ...CheckboxColumn,
      checkboxSelection: true,
      headerName: localeData.ShpID,
      field: 'shipmentId',
      cellStyle: { color: '#1099e7' },
      pinned: 'left',
      maxWidth: 110
    },
    {
      headerName: localeData.ShpCreationDate,
      field: 'shipmentDate',
      minWidth: 160,
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
      field: 'destination',
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
      cellStyle: { textAlign: 'right', fontWeight: 'bold' },
      minWidth: 120,
      valueFormatter: (params: any) => {
        return `$ ${Number(params.value).toFixed(2)}`;
      }
    }
  ];

  const handleGetShipmentDetails = useCallback(() => {
    const invoiceId = null;
    var inputData = { invoiceId };
    let chargesIndex = 0;
    const getNextCharges = () => {
      const charges = chargesList[chargesIndex];
      chargesIndex = (chargesIndex + 1) % chargesList.length;
      return charges;
    };
    fetchData(getShipmentDetailsUrl, notify, shipmentService, inputData)
      .then((response: any) => {
        if (response?.data?.length > 0) {
          const updatedData = response.data.map((shipment: any) => {
            const charges = getNextCharges();
            return {
              ...shipment,
              ...charges
            };
          });
          setGlobalStore({ shipmentDetails: updatedData });
        }
      })
      .catch(error => {
        GrcNotify({
          message: error.message,
          status: NotifyType.Error
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  useEffect(() => {
    handleGetShipmentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    approveInvoiceShipmentsColumnDefs,
    shipmentDetailsStore
  };
}
