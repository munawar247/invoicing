import { useCallback, useRef, useState } from 'react';
import {
  AgGridReact,
  CheckboxColumn,
  GrcNotify,
  NotifyType
} from '@grc/ui-package';
import { useGetApiData, useNonInitialEffect } from '@grc/ui-utility';
import { useI18nState } from '../../stores/settings/language-context';
import {
  LocationType,
  Status
} from '../../models/invoice-creation/invoice-details-popup/invoice-tab/invoice-locations.interface';
import { fetchLocations } from '../../common/constants/url-constants';
import { tenantService } from '../../common/constants/constants';
import { invoiceHistoryData } from '../../data/data';

export default function useInvoiceHistory() {
  const gridRef = useRef<AgGridReact>(null);
  const { localeData } = useI18nState();
  const { fetchData } = useGetApiData();
  const [accountState, setAccountState] = useState<any>('');
  const [billToState, setBillToState] = useState<any>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [accounts, setAccounts] = useState<Array<any>>([]);
  const [billToLocations, setBillToLocations] = useState<any>();
  const [invoiceDetails, setInvoiceDetails] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>();

  const GetLocations = useCallback(
    async (fetchData: any, data: any) => {
      const queryParams = new URLSearchParams();
      queryParams.append('status', Status.Active.toString());
      if (data.name) {
        queryParams.append('name', data.name);
      }
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
        let latestFetchedLocations: any = [];
        if (response?.data?.length > 0) {
          response?.data?.forEach((location: any, index: number) => {
            let newLocation = {
              id: location?.id,
              tenantId: location?.tenantId,
              name: location?.name,
              address: {
                address: location?.address?.street,
                city: location?.address?.city,
                state: location?.address?.state,
                zip: location?.address?.zipCode,
                countryId: location?.address?.countryId,
                country: location?.address?.country,
                latitude: location?.address?.latitude,
                longitude: location?.address?.longitude
              },
              communicationDetails: location?.communicationDetails,
              email: location?.email,
              displayId: location?.displayId
            };
            latestFetchedLocations = [...latestFetchedLocations, newLocation];
          });
        }
        return latestFetchedLocations;
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
        accountId: accountId?.id,
        accountLocationTypes: accountLocationTypes
      });
      if (fetchedLocationDetails) {
        setBillToLocations(fetchedLocationDetails);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchData]
  );

  const handleGetInvoices = useCallback(() => {
    if (!accountState?.accountName) {
      setInvoiceDetails(invoiceHistoryData);
    } else {
      const filteredInvoices = invoiceHistoryData.filter(
        invoice => invoice?.account === accountState.accountName
      );
      setInvoiceDetails(filteredInvoices);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceHistoryData, accountState?.accountName]);

  const handleToDateChange = useCallback(
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

  const handleFromDateChange = useCallback(
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
    setAccountState('');
    setBillToState('');
    setFromDate('');
    setToDate('');
    setInvoiceDetails([]);
    setSelectedAccount('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const invoiceHistoryColumnsDef = [
    {
      ...CheckboxColumn,
      checkboxSelection: true,
      headerName: localeData.InvoiceNo,
      field: 'invoiceNo',
      cellStyle: { color: '#1099e7' },
      pinned: 'left',
      maxWidth: 140
    },
    {
      headerName: localeData.InvoiceDate,
      field: 'invoiceDate',
      minWidth: 150
    },
    {
      headerName: localeData.InvoiceSentDate,
      field: 'invoiceSentDate',
      minWidth: 180
    },
    {
      headerName: localeData.InvoiceDueDate,
      field: 'invoiceDueDate',
      minWidth: 180
    },
    {
      headerName: localeData.ReferenceNo,
      field: 'referenceNo',
      minWidth: 150
    },
    {
      headerName: localeData.Account,
      field: 'account',
      minWidth: 120
    },
    {
      headerName: localeData.BillTo,
      field: 'billToAddress',
      minWidth: 350,
      autoHeight: true,
      hide: true,
      valueGetter: (params: any) => {
        const { billToName, billToAddress } = params.data;
        return `${billToName}\n${billToAddress}`;
      },
      cellStyle: {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        lineHeight: '1'
      }
    }
  ];

  const onAccountSelectionHandler = useCallback(() => {
    if (selectedAccount) {
      setAccountState(selectedAccount);
      setBillToState('');
      GetBillTos(selectedAccount);
    }
  }, [GetBillTos, selectedAccount]);

  useNonInitialEffect(() => {
    onAccountSelectionHandler();
  }, [selectedAccount]);

  return {
    gridRef,
    handleGetInvoices,
    accountState,
    setAccountState,
    billToState,
    setBillToState,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    accounts,
    setAccounts,
    billToLocations,
    GetBillTos,
    handleClearFilters,
    handleToDateChange,
    handleFromDateChange,
    invoiceHistoryColumnsDef,
    invoiceDetails,
    selectedAccount,
    setSelectedAccount
  };
}
