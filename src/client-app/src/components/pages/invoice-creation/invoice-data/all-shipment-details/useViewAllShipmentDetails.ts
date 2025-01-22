import { useCallback, useEffect, useState } from 'react';
import { convertToShortDate, useGetApiData } from '@grc/ui-utility';
import { useI18nState } from '../../../../stores/settings/language-context';
import { useStore } from '../../../../stores/invoice-charge-details/invoice-charge-details-store';
import {
  fetchAccountByIdUrl,
  fetchLocationById
} from '../../../../common/constants/url-constants';
import { tenantService } from '../../../../common/constants/constants';
import notify from '../../../common/notify';

export default function useViewAllShipmentDetails() {
  const { fetchData } = useGetApiData();
  const { localeData } = useI18nState();
  const [shipmentIds] = useStore(store => store['shipmentIds']);
  const [filterDetailsStore] = useStore(store => store['filterDetails']);
  const [billTo, setBillTo] = useState<any>();
  const [customer, setCustomer] = useState<any>();

  const getBillTo = useCallback(
    (billToId: any) => {
      fetchData(`${fetchLocationById}${billToId}`, notify, tenantService).then(
        (response: any) => {
          if (response.status === 200) {
            setBillTo(response.data);
          }
        }
      );
    },
    [fetchData]
  );

  const getCustomer = useCallback(
    (customerId: any) => {
      fetchData(
        `${fetchAccountByIdUrl}${customerId}`,
        notify,
        tenantService
      ).then((response: any) => {
        if (response.status === 200) {
          setCustomer(response.data);
        }
      });
    },
    [fetchData]
  );

  const shipmentDetailsColumnsDef = [
    {
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

  useEffect(() => {
    if (filterDetailsStore?.accountFilter?.id) {
      getCustomer(filterDetailsStore.accountFilter.id);
    }
    if (filterDetailsStore?.billToFilter?.id) {
      getBillTo(filterDetailsStore.billToFilter.id);
    }
  }, [filterDetailsStore, getCustomer, getBillTo]);

  return {
    shipmentIds,
    billTo,
    customer,
    shipmentDetailsColumnsDef
  };
}
