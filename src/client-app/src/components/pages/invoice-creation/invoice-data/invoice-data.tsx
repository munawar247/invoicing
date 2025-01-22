import { useNavigate } from 'react-router';
import {
  faarrowsrotateclassicregular,
  faarrowuptolineclassicregular,
  FontAwesomeIcon,
  GrcButton,
  GrcButtonType,
  GrcTabPanel,
  GrcTabPanelItem,
  IconProp
} from '@grc/ui-package';
import { useI18nState } from '../../../stores/settings/language-context';
import useInvoiceData from './useInvoiceData';
import useInvoiceCreation from '../useInvoiceCreation';
import { ReadyToInvoiceProvider } from '../../../stores/ready-to-invoice/ready-to-invoice-store';
import ReadyToInvoices from './ready-to-invoices/ready-to-invoices';
import NotReadyToInvoices from './not-ready-to-invoices/not-ready-to-invoices';
import OnHoldInvoices from './on-hold-invoices/on-hold-invoices';
import OnHoldInvoicePopup from './on-hold-invoices/on-hold-invoice-popup';
import EmptySearch from '../../common/empty-search';
import {
  invoiceCreateUrl,
  invoicePreviewUrl
} from '../../../common/constants/url-constants';
import { invoiceTabsMenu } from '../../../data/data';

//Styles
import './invoice-data.scss';

export default function InvoiceData() {
  const navigate = useNavigate();
  const { localeData } = useI18nState();
  const {
    setInvoiceHoldOrPreview,
    setIsOnHoldPopupVisible,
    setOnHoldData,
    movetoHoldData,
    onHoldData,
    setMovetoHoldData,
    isOnHoldPopupVisible,
    setSelectedTabItem,
    invoiceHoldOrPreview,
    activeTabIndex,
    handleTabChange
  } = useInvoiceData();
  const { shipmentDetailsStore, handleGetShipmentDetails } =
    useInvoiceCreation();

  return (
    <>
      <div className="invoice-data-main-div">
        {shipmentDetailsStore.length === 0 ? (
          <div className="grc-empty-state">
            <EmptySearch message={localeData.EmptySearchMessage} />
          </div>
        ) : (
          <>
            <div className="preview-hold-buttons-div">
              {activeTabIndex === 0 && (
                <div className="d-flex align-items-center">
                  <div className="mr-1">
                    <GrcButton
                      text={localeData.OnHold}
                      id="invoice_data_btn_on_hold"
                      disabled={invoiceHoldOrPreview}
                      onClick={() => {
                        setIsOnHoldPopupVisible(true);
                        setSelectedTabItem(invoiceTabsMenu[2]);
                      }}
                      className="grc-btn-primary-bordered"
                    />
                  </div>
                  <div className="mr-2">
                    <GrcButton
                      text={localeData.Preview}
                      id="invoice_data_btn_preview"
                      disabled={invoiceHoldOrPreview}
                      onClick={() => {
                        navigate(invoicePreviewUrl, {
                          state: {
                            breadCrumbLinks: [
                              {
                                title: localeData.InvoiceCreation,
                                path: invoiceCreateUrl
                              },
                              {
                                title: localeData.Preview
                              }
                            ]
                          }
                        });
                      }}
                      className="grc-btn-primary"
                    />
                  </div>
                  <div className="mr-2">
                    <GrcButton
                      id="export_button_ready_to_invoice"
                      type={GrcButtonType.Normal}
                    >
                      <FontAwesomeIcon
                        icon={faarrowuptolineclassicregular as IconProp}
                        className="mr-2"
                      />
                      {localeData.Export}
                    </GrcButton>
                  </div>
                  <div
                    className={`refresh-icon`}
                    title="Refresh"
                    onClick={() => {
                      handleGetShipmentDetails();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faarrowsrotateclassicregular as IconProp}
                    />
                  </div>
                </div>
              )}
              {activeTabIndex === 1 && (
                <div className="d-flex align-items-center">
                  <div className="mr-2">
                    <GrcButton
                      text={localeData.MoveToReadyInvoice}
                      id="invoice_data_btn_move_to_ready_invoice"
                      className="grc-btn-primary-bordered"
                    />
                  </div>
                  <div className="mr-2">
                    <GrcButton
                      id="export_button_not_ready_to_invoice"
                      type={GrcButtonType.Normal}
                    >
                      <FontAwesomeIcon
                        icon={faarrowuptolineclassicregular as IconProp}
                        className="mr-2"
                      />
                      {localeData.Export}
                    </GrcButton>
                  </div>
                  <div className={`refresh-icon`} title="Refresh">
                    <FontAwesomeIcon
                      icon={faarrowsrotateclassicregular as IconProp}
                    />
                  </div>
                </div>
              )}
              {activeTabIndex === 2 && (
                <div className="d-flex align-items-center">
                  <div className="mr-2">
                    <GrcButton
                      text={localeData.ReadyToInvoice}
                      id="invoice_data_btn_ready_to_invoice"
                      className="grc-btn-primary-bordered"
                    />
                  </div>
                  <div className="mr-2">
                    <GrcButton
                      id="export_button_on_hold_invoice"
                      type={GrcButtonType.Normal}
                    >
                      <FontAwesomeIcon
                        icon={faarrowuptolineclassicregular as IconProp}
                        className="mr-2"
                      />
                      {localeData.Export}
                    </GrcButton>
                  </div>
                  <div className={`refresh-icon`} title="Refresh">
                    <FontAwesomeIcon
                      icon={faarrowsrotateclassicregular as IconProp}
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <GrcTabPanel
                onSelectionChanged={handleTabChange}
                selectedIndex={activeTabIndex}
              >
                <GrcTabPanelItem title={localeData.ReadyToInvoice}>
                  <ReadyToInvoiceProvider>
                    <ReadyToInvoices
                      setInvoiceHoldOrPreview={setInvoiceHoldOrPreview}
                      setOnHoldInvoiceData={setOnHoldData}
                    />
                  </ReadyToInvoiceProvider>
                </GrcTabPanelItem>
                <GrcTabPanelItem title={localeData.NotReadyToInvoice}>
                  <NotReadyToInvoices />
                </GrcTabPanelItem>
                <GrcTabPanelItem title={localeData.OnHoldInvoices}>
                  <OnHoldInvoices
                    onHoldInvoiceData={movetoHoldData ? onHoldData : []}
                  />
                </GrcTabPanelItem>
              </GrcTabPanel>
            </div>
          </>
        )}
      </div>
      <OnHoldInvoicePopup
        setIsHoldData={setMovetoHoldData}
        isOnHoldPopupVisible={isOnHoldPopupVisible}
        setIsOnHoldPopupVisible={setIsOnHoldPopupVisible}
      />
    </>
  );
}
