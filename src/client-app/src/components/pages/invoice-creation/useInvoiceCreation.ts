import { useCallback, useRef, useState } from 'react';
import { convertToShortDate, useGetApiData } from '@grc/ui-utility';
import {
  AgGridReact,
  CheckboxColumn,
  GrcNotify,
  NotifyType
} from '@grc/ui-package';
import { useI18nState } from '../../stores/settings/language-context';
import {
  useSetStore,
  useStore
} from '../../stores/invoice-charge-details/invoice-charge-details-store';
import InvoiceDetailsPopup from './invoice-data/invoice-details-popup';
import { ILocations } from '../../models/invoice-creation/invoice-details-popup/invoice-tab/invoice-locations.interface';
import { getShipmentDetailsUrl } from '../../common/constants/url-constants';
import notify from '../common/notify';
import { shipmentService } from '../../common/constants/constants';
import { chargesList } from '../../data/data';

export default function useInvoiceCreation() {
  const gridRef = useRef<AgGridReact>(null);
  const { localeData } = useI18nState();
  const { fetchData } = useGetApiData();
  const setGlobalStore = useSetStore();
  const [shipmentDetailsStore] = useStore(store => store['shipmentDetails']);
  const [filterDetailsStore] = useStore(store => store['filterDetails']);
  const [shipmentIds] = useStore(store => store['shipmentIds']);
  const [selectedAccountItem, setSelectedAccountItem] = useState<any>();
  const [selectedLocation, setSelectedLocation] = useState<ILocations>();
  const [isCreateInvoiceVisible, setIsCreateInvoiceVisible] = useState(true);
  const [isSendInvoicePopupVisible, setIsSendInvoicePopupVisible] =
    useState(false);
  const [isInCreation, setIsInvoiceCreation] = useState<boolean>(false);

  const handleGetShipmentDetails = useCallback(() => {
    const accountId = filterDetailsStore
      ? filterDetailsStore.accountFilter?.id
      : null;
    const billTo = filterDetailsStore
      ? filterDetailsStore.billToFilter?.id
      : null;
    const shpCreatedFromDate = filterDetailsStore.fromDate ?? '';
    const shpCreatedToDate = filterDetailsStore.toDate ?? '';
    var inputData = { accountId, billTo, shpCreatedFromDate, shpCreatedToDate };
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
  }, [fetchData, filterDetailsStore, setGlobalStore]);

  const handleLocationClick = useCallback(
    (e: any) => {
      const selectedLocation = e.itemData;
      const locationExists = filterDetailsStore.locations?.some(
        (location: any) => location?.id === selectedLocation?.id
      );

      const updatedLocations = locationExists
        ? filterDetailsStore.locations.filter(
            (location: any) => location.id !== selectedLocation?.id
          )
        : [
            ...filterDetailsStore.locations,
            {
              id: selectedLocation?.id,
              name: selectedLocation?.name
            }
          ];

      setGlobalStore({
        filterDetails: {
          ...filterDetailsStore,
          locations: updatedLocations
        }
      });
    },
    [filterDetailsStore, setGlobalStore]
  );

  const handleAddDateChange = useCallback(
    (fromDate: string, toDate: string) => {
      setGlobalStore({
        filterDetails: {
          ...filterDetailsStore,
          fromDate: fromDate,
          toDate: toDate
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterDetailsStore]
  );

  const readyToInvoiceColumnsDef = [
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
      minWidth: 120,
      valueFormatter: (params: any) => {
        return `$ ${parseFloat(params.value).toFixed(2)}`;
      }
    },
    {
      headerName: `${localeData.Fuel} ($)`,
      field: 'fuel',
      hide: true,
      cellStyle: { textAlign: 'right' },
      minWidth: 120,
      valueFormatter: (params: any) => {
        return `$ ${parseFloat(params.value).toFixed(2)}`;
      }
    },
    {
      headerName: `${localeData.Accessorial} ($)`,
      field: 'accessorial',
      hide: true,
      cellStyle: { textAlign: 'right' },
      minWidth: 120,
      valueFormatter: (params: any) => {
        return `$ ${parseFloat(params.value).toFixed(2)}`;
      }
    },
    {
      headerName: `${localeData.Total} ($)`,
      field: 'total',
      hide: true,
      cellStyle: { textAlign: 'right', fontWeight: 'bold' },
      minWidth: 120,
      valueFormatter: (params: any) => {
        return `$ ${parseFloat(params.value).toFixed(2)}`;
      }
    }
  ];

  return {
    selectedAccountItem,
    setSelectedAccountItem,
    selectedLocation,
    setSelectedLocation,
    gridRef,
    handleGetShipmentDetails,
    isCreateInvoiceVisible,
    setIsCreateInvoiceVisible,
    isSendInvoicePopupVisible,
    setIsSendInvoicePopupVisible,
    isInCreation,
    setIsInvoiceCreation,
    readyToInvoiceColumnsDef,
    shipmentDetailsStore,
    filterDetailsStore,
    shipmentIds,
    setGlobalStore,
    handleAddDateChange,
    handleLocationClick
  };
}
