import { useCallback, useState } from 'react';
import { useGetApiData } from '@grc/ui-utility';
import { GrcNotify, NotifyType } from '@grc/ui-package';
import { useI18nState } from '../../../../stores/settings/language-context';
import {
  fetchAccountByIdUrl,
  fetchLocationById,
  getShipmentDetailsByIdUrl,
  shipmentSettingUrl
} from '../../../../common/constants/url-constants';
import {
  shipmentService,
  tenantService
} from '../../../../common/constants/constants';
import notify from '../../../common/notify';

export default function useInvoiceDetailsPopup() {
  const { fetchData } = useGetApiData();
  const { localeData } = useI18nState();
  const [shipments, setShipments] = useState<any>();
  const [billTo, setBillTo] = useState<any>();
  const [customer, setCustomer] = useState<any>();
  const [unitOfMeasures, setUnitOfMeasures] = useState<any>();
  const [tabIndex, setTabIndex] = useState<number>(1);

  const getShipmentById = useCallback(
    async (shipmentId: string) => {
      fetchData(
        `${getShipmentDetailsByIdUrl}${shipmentId}`,
        notify,
        shipmentService
      )
        .then((response: any) => {
          if (response.status === 200) {
            if (!!response.data) {
              setShipments(response?.data);
              var billToId = response.data.billingInfo.billTo.id;
              var customerId = response.data.accountId;
              if (!!billToId) {
                getBillTo(billToId);
              }
              if (!!customerId) {
                getCustomer(customerId);
              }
            }
          } else {
            setShipments([]);
          }
        })
        .catch(error => {
          GrcNotify({
            message: error.message,
            status: NotifyType.Error
          });
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchData]
  );

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

  const getShipmentSettings = useCallback(async () => {
    fetchData(shipmentSettingUrl, notify, shipmentService)
      .then((res: any) => {
        const settings = res?.data;
        setUnitOfMeasures(settings?.unitsofmeasures);
      })
      .catch((error: any) => {
        GrcNotify({
          message: localeData.ShipmentLoadingFailed,
          status: NotifyType.Error
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return {
    getShipmentById,
    shipments,
    billTo,
    customer,
    unitOfMeasures,
    getShipmentSettings,
    tabIndex,
    setTabIndex
  };
}
