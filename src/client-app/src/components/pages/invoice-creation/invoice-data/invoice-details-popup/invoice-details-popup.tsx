import { useState } from 'react';
import { GrcPopup, GrcTabPanel, GrcTabPanelItem } from '@grc/ui-package';
import { useI18nState } from '../../../../stores/settings/language-context';
import useInvoiceDetailsPopup from './useInvoiceDetailsPopup';
import { InvoiceChargeDetailsProvider } from '../../../../stores/invoice-charge-details/invoice-charge-details-store';
import InvoiceTabFooter from './invoice-tab-footer/invoice-tab-footer';
import InvoicePopupDetailsTab from './details-tab/details-tab';
import InvoicePopupInvoicesTab from './invoices-tab/invoices-tab';
import StaticDataIcon from '../../../common/static-data-icon';

//Styles
import './invoice-details-popup.scss';

const InvoiceDetailsPopup = (params: any) => {
  const { localeData } = useI18nState();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const value = params?.data?.charge;
  const shipmentId = params?.data?.shipmentId;
  const {
    getShipmentById,
    shipments,
    billTo,
    customer,
    unitOfMeasures,
    getShipmentSettings,
    tabIndex,
    setTabIndex
  } = useInvoiceDetailsPopup();

  return (
    <div data-testid="invoice_charge_details_popup">
      <span
        className="charges-button cursor-p"
        onClick={() => {
          getShipmentById(shipmentId);
          getShipmentSettings();
          setShowPopup(true);
        }}
        data-testid="charges_link"
      >
        {`$ ${Number(value).toFixed(2)}`}
      </span>
      <GrcPopup
        id="invoice_charge_details_popup"
        visible={showPopup}
        dragEnabled={false}
        hideOnOutsideClick={false}
        width="62.5rem"
        height="34.375rem"
        onHiding={() => setShowPopup(false)}
        showTitle={true}
        title={shipmentId}
        showCloseButton={true}
      >
        <div className="container-fluid invoice-details-popup-main-div">
          <StaticDataIcon />
          <div>
            <GrcTabPanel
              defaultSelectedIndex={tabIndex}
              onSelectedIndexChange={index => setTabIndex(index)}
            >
              <GrcTabPanelItem title={localeData.Details}>
                <InvoiceChargeDetailsProvider>
                  <InvoicePopupDetailsTab
                    shipments={shipments}
                    billTo={billTo}
                    customer={customer}
                    unitOfMeasures={unitOfMeasures}
                  />
                </InvoiceChargeDetailsProvider>
              </GrcTabPanelItem>
              <GrcTabPanelItem title={localeData.Invoices}>
                <InvoiceChargeDetailsProvider>
                  <InvoicePopupInvoicesTab
                    shipments={shipments}
                    billTo={billTo}
                    customer={customer}
                    unitOfMeasures={unitOfMeasures}
                  />
                </InvoiceChargeDetailsProvider>
              </GrcTabPanelItem>
            </GrcTabPanel>
          </div>
          {tabIndex === 1 && <InvoiceTabFooter setShowPopup={setShowPopup} />}
        </div>
      </GrcPopup>
    </div>
  );
};

export default InvoiceDetailsPopup;
