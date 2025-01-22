import { useCallback, useEffect, useState } from 'react';
import { useGetApiData, useNonInitialEffect } from '@grc/ui-utility';
import { GrcNotify, NotifyType } from '@grc/ui-package';
import { useI18nState } from '../../../stores/settings/language-context';
import {
  useSetStore,
  useStore
} from '../../../stores/invoice-charge-details/invoice-charge-details-store';
import {
  LocationType,
  Status
} from '../../../models/invoice-creation/invoice-details-popup/invoice-tab/invoice-locations.interface';
import { fetchLocations } from '../../../common/constants/url-constants';
import { tenantService } from '../../../common/constants/constants';

export default function UseInvoiceFilterCard() {
  const { fetchData } = useGetApiData();
  const { localeData } = useI18nState();
  const setGlobalStore = useSetStore();
  const [filterDetailsStore] = useStore(store => store['filterDetails']);
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [selectedAccount, setSelectedAccount] = useState<any>();
  const [accounts, setAccounts] = useState<Array<any>>([]);

  const GetLocations = useCallback(
    async (fetchData: any, data: any) => {
      const queryParams = new URLSearchParams();
      queryParams.append('status', Status.Active.toString());
      if (data.accountId) {
        queryParams.append('accountId', data.accountId);
      }
      if (data.accountLocationTypes && data.accountLocationTypes.length > 0) {
        data.accountLocationTypes.forEach((type: LocationType) => {
          queryParams.append('accountLocationTypes', type.toString());
        });
      }

      const queryString = queryParams.toString();
      const urlWithParams = `${fetchLocations}?${queryString}`;

      try {
        const response = await fetchData(
          urlWithParams,
          (message: any) => GrcNotify({ message, status: NotifyType.Error }),
          tenantService
        );
        return response?.data;
      } catch (error: any) {
        GrcNotify({
          message: error.message,
          status: NotifyType.Error
        });
        return undefined;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchData]
  );

  const GetBillTos = useCallback(
    async (accountId: any) => {
      const accountLocationTypes = [LocationType.BillTo];
      const fetchedLocationDetails = await GetLocations(fetchData, {
        accountId: accountId?.id
      });
      let billToLocations: any[] = [];
      if (fetchedLocationDetails && Array.isArray(fetchedLocationDetails)) {
        billToLocations = fetchedLocationDetails.filter(location => {
          return location.accountTypes.some((accountType: any) =>
            accountType.types.some((type: any) =>
              accountLocationTypes.includes(type)
            )
          );
        });
      }

      if (fetchedLocationDetails) {
        setGlobalStore({
          filterDetails: {
            ...filterDetailsStore,
            billTos: billToLocations,
            locations: fetchedLocationDetails,
            accountFilter: accountId,
            billToFilter: undefined,
            locationFilter: undefined
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchData, filterDetailsStore]
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

  const handleLocationClick = useCallback(
    (e: any) => {
      const selectedLocation = e.itemData;
      if (
        !filterDetailsStore.locations.some(
          (location: any) => location.id === selectedLocation.id
        )
      ) {
        setGlobalStore({
          filterDetails: {
            ...filterDetailsStore,
            locationFilter: [...filterDetailsStore.locations, selectedLocation]
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterDetailsStore]
  );

  const handleToDate = useCallback(
    (e: string) => {
      if (fromDate && e < fromDate) {
        setToDate('');
        GrcNotify({
          message: localeData.ToDateShouldBeGreaterThanFromDate,
          status: NotifyType.Warning
        });
      } else {
        setToDate(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fromDate]
  );

  const handleFromDate = useCallback(
    (e: string) => {
      if (toDate && e > toDate) {
        setFromDate('');
        GrcNotify({
          message: localeData.FromDateShouldBeLessThanToDate,
          status: NotifyType.Warning
        });
      } else {
        setFromDate(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toDate]
  );

  const handleClearFilters = useCallback(() => {
    setGlobalStore({
      filterDetails: {
        ...filterDetailsStore,
        accountFilter: undefined,
        billToFilter: undefined,
        locationFilter: undefined,
        billTos: undefined,
        locations: undefined,
        fromDate: '',
        toDate: ''
      },
      shipmentDetails: []
    });
    setSelectedAccount('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDetailsStore]);

  const onAccountSelectionHandler = useCallback(() => {
    if (selectedAccount) {
      GetBillTos(selectedAccount);
    }
  }, [GetBillTos, selectedAccount]);

  useNonInitialEffect(() => {
    onAccountSelectionHandler();
  }, [selectedAccount]);

  useEffect(() => {
    if (filterDetailsStore?.fromDate) {
      setFromDate(filterDetailsStore.fromDate);
    }
    if (filterDetailsStore?.toDate) {
      setToDate(filterDetailsStore.toDate);
    }
  }, [filterDetailsStore]);

  return {
    setGlobalStore,
    filterDetailsStore,
    handleClearFilters,
    GetBillTos,
    handleAddDateChange,
    handleLocationClick,
    handleToDate,
    handleFromDate,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    GetLocations,
    selectedAccount,
    setSelectedAccount,
    accounts,
    setAccounts
  };
}
