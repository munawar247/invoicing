import {
  DomLayout,
  faarrowsrotateclassicregular,
  faarrowuptolineclassicregular,
  FontAwesomeIcon,
  GrcButton,
  GrcButtonType,
  GrcDateTimeFormat,
  GrcDateTimePickerWrapper,
  GrcGrid,
  GrcPickerType,
  GrcSelectBox,
  gridOptions,
  IconProp
} from '@grc/ui-package';
import { AccountSelection } from '@grc/ui-shared';
import { useI18nState } from '../../stores/settings/language-context';
import useInvoiceHistory from './useInvoiceHistory';
import EmptySearch from '../common/empty-search';
import StaticDataIcon from '../common/static-data-icon';
import { fetchAccounts, tenants } from '../../common/constants/url-constants';
import { tenantService } from '../../common/constants/constants';
import { isPagination } from '../../data/data';

//Styles
import './invoice-history.scss';

export default function InvoiceHistory() {
  const { localeData } = useI18nState();
  const {
    gridRef,
    handleGetInvoices,
    accountState,
    billToState,
    setBillToState,
    fromDate,
    toDate,
    setAccounts,
    billToLocations,
    handleClearFilters,
    handleToDateChange,
    handleFromDateChange,
    invoiceHistoryColumnsDef,
    invoiceDetails,
    selectedAccount,
    setSelectedAccount
  } = useInvoiceHistory();

  return (
    <div className="container-fluid grc-card invoice-history-main-div">
      <StaticDataIcon />
      <div className="d-flex m-0 mt-2 invoice-history-filter-card">
        <div className="mr-2">
          <div className="grc-label ml-2">
            {localeData.Account}
            <span className="grc-asterisk">*</span>
          </div>
          <AccountSelection
            id="account_select_invoice_history"
            isTenant={false}
            showLabel={false}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
            setAllAccounts={setAccounts}
            placeholder={localeData.Select}
            accountLabel={localeData.Account}
            fetchAccountsUrl={fetchAccounts}
            fetchTenantUrl={tenants}
            service={tenantService}
          />
        </div>
        <div className="mr-2">
          <div className="grc-label">{localeData.BillTo}</div>
          <div>
            <GrcSelectBox
              id="bill_to_select_invoice_history"
              items={billToLocations}
              displayExpr="name"
              valueExpr="id"
              placeholder={localeData.Select}
              value={billToState?.id}
              onItemClick={e => {
                setBillToState(e?.itemData);
              }}
            />
          </div>
        </div>
        <div className="mr-2">
          <div className="grc-label">{localeData.FromDate}</div>
          <div>
            <GrcDateTimePickerWrapper
              id="from_date_invoice_history"
              className="from-to-date"
              type={GrcDateTimeFormat.Date}
              pickerType={GrcPickerType.Native}
              placeholder="MM-DD-YYYY"
              value={fromDate}
              onValueChange={e => {
                handleFromDateChange(e);
              }}
              showAnalogClock={false}
            />
          </div>
        </div>
        <div>
          <div className="grc-label">{localeData.ToDate}</div>
          <div>
            <GrcDateTimePickerWrapper
              className="from-to-date"
              id="to_date_invoice_history"
              type={GrcDateTimeFormat.Date}
              pickerType={GrcPickerType.Native}
              placeholder="MM-DD-YYYY"
              value={toDate}
              onValueChange={e => {
                handleToDateChange(e);
              }}
              showAnalogClock={false}
            />
          </div>
        </div>
        <div className="filter-buttons col d-flex align-items-end justify-content-end">
          <div className="ml-2">
            <GrcButton
              text={localeData.Clear}
              id="invoice_history_btn_clear"
              className="grc-btn-secondary"
              visible={!!(accountState && fromDate && toDate)}
              onClick={() => {
                handleClearFilters();
              }}
            />
          </div>
          <div className="ml-2">
            <GrcButton
              text={localeData.ShowInvoices}
              id="invoice_history_btn_show_invoices"
              onClick={() => {
                handleGetInvoices();
              }}
              className="grc-btn-primary"
              disabled={
                !!(
                  !accountState ||
                  (fromDate && !toDate) ||
                  (toDate && !fromDate)
                )
              }
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          {invoiceDetails.length === 0 ? (
            <div className="grc-empty-state">
              <EmptySearch message={localeData.EmptySearchMessage} />
            </div>
          ) : (
            <div className="mt-2">
              <div className="d-flex justify-content-end">
                <div className="mr-4">
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
              <div className="mt-2">
                <GrcGrid
                  gridRef={gridRef}
                  colDefs={invoiceHistoryColumnsDef}
                  gridOptions={gridOptions}
                  domLayout={DomLayout.Height}
                  isPagination={isPagination}
                  rowData={invoiceDetails}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
