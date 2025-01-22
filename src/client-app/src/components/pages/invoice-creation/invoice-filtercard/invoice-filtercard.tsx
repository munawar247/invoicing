import {
  GrcPickerType,
  GrcSelectBox,
  GrcDateTimePickerWrapper,
  GrcDateTimeFormat,
  GrcButton,
  GrcTagBox
} from '@grc/ui-package';
import { AccountSelection } from '@grc/ui-shared';
import { useI18nState } from '../../../stores/settings/language-context';
import useInvoiceCreation from '../useInvoiceCreation';
import UseInvoiceFilterCard from './useInvoiceFilterCard';
import {
  fetchAccounts,
  tenants
} from '../../../common/constants/url-constants';
import { tenantService } from '../../../common/constants/constants';

//Styles
import './invoice-filtercard.scss';

export default function InvoiceFilterCard() {
  //localization
  const { localeData } = useI18nState();
  const { handleGetShipmentDetails } = useInvoiceCreation();
  const {
    setGlobalStore,
    filterDetailsStore,
    handleClearFilters,
    handleToDate,
    handleFromDate,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleAddDateChange,
    handleLocationClick,
    setSelectedAccount,
    setAccounts
  } = UseInvoiceFilterCard();

  return (
    <>
      <div className="d-flex m-0 mt-2 invoice-filter-card">
        <div className="mr-2 account-billto">
          <div className="grc-label ml-2">
            {localeData.Account}
            <span className="grc-asterisk">*</span>
          </div>
          <AccountSelection
            id="account_data_invoice_filter_card"
            isTenant={false}
            showLabel={false}
            selectedAccount={filterDetailsStore.accountFilter}
            setSelectedAccount={setSelectedAccount}
            setAllAccounts={setAccounts}
            placeholder={localeData.Select}
            accountLabel={localeData.Account}
            fetchAccountsUrl={fetchAccounts}
            fetchTenantUrl={tenants}
            service={tenantService}
          />
        </div>
        <div className="mr-2 account-billto">
          <div className="grc-label">
            {localeData.BillTo}
            <span className="grc-asterisk">*</span>
          </div>
          <div>
            <GrcSelectBox
              id="bill_to_location_data_invoice_filter_card"
              items={filterDetailsStore?.billTos}
              displayExpr="name"
              valueExpr="id"
              value={filterDetailsStore?.billToFilter?.id}
              placeholder={localeData.Select}
              onItemClick={e => {
                const selectedBillTo = {
                  id: e?.itemData?.id,
                  name: e?.itemData?.name
                };
                setGlobalStore({
                  filterDetails: {
                    ...filterDetailsStore,
                    billToFilter: selectedBillTo
                  }
                });
              }}
            />
          </div>
        </div>
        <div className="mr-2 from-to-date">
          <div className="grc-label">{localeData.Location}</div>
          <div>
            <GrcTagBox
              className="location_data_invoice_filter_card"
              id="add_location_tagBox_filter_card"
              items={filterDetailsStore?.locations}
              displayExpr="name"
              onItemClick={e => handleLocationClick(e)}
              value={filterDetailsStore?.locationFilter}
              onValueChange={e =>
                setGlobalStore({
                  filterDetails: {
                    ...filterDetailsStore,
                    locationFilter: e
                  }
                })
              }
              placeholder={localeData.Select}
              showSelectionControls={false}
              showMultiTagOnly={false}
              showDropDownButton={true}
            />
          </div>
        </div>
        <div className="mr-2 from-to-date">
          <div className="grc-label">{localeData.ShpCreationFromDate}</div>
          <div>
            <GrcDateTimePickerWrapper
              className="from-to-date"
              id="from_date_invoice_filter_card"
              type={GrcDateTimeFormat.Date}
              pickerType={GrcPickerType.Native}
              placeholder="MM-DD-YYYY"
              value={fromDate}
              onValueChange={e => {
                handleFromDate(e);
              }}
              showAnalogClock={false}
            />
          </div>
        </div>
        <div className="from-to-date">
          <div className="grc-label">{localeData.ShpCreationToDate}</div>
          <div>
            <GrcDateTimePickerWrapper
              className="from-to-date"
              id="to_date_invoice_filter_card"
              type={GrcDateTimeFormat.Date}
              pickerType={GrcPickerType.Native}
              placeholder="MM-DD-YYYY"
              value={toDate}
              onValueChange={e => {
                handleToDate(e);
              }}
              showAnalogClock={false}
            />
          </div>
        </div>
        <div
          className="filter-buttons col d-flex align-items-end justify-content-end"
          data-testid="invoice_filter_buttons"
        >
          <div>
            <GrcButton
              text={localeData.Clear}
              id="invoice_data_btn_clear"
              className="grc-btn-secondary"
              visible={
                !!(
                  filterDetailsStore?.accountFilter?.id &&
                  filterDetailsStore?.billToFilter?.id
                )
              }
              onClick={() => {
                handleClearFilters();
                setFromDate('');
                setToDate('');
              }}
            />
          </div>
          <div>
            <GrcButton
              text={localeData.ShowShipments}
              id="invoice_data_btn_show_shipments"
              onClick={() => {
                handleAddDateChange(fromDate, toDate);
                handleGetShipmentDetails();
              }}
              className="grc-btn-primary"
              disabled={
                !filterDetailsStore?.accountFilter?.id ||
                !filterDetailsStore?.billToFilter?.id ||
                (fromDate && !toDate) ||
                (toDate && !fromDate)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
