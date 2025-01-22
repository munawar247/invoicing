import { useRef } from 'react';
import {
  AgGridReact,
  DomLayout,
  faenvelopeclassicregular,
  falocationdotclassicregular,
  faphoneclassicregular,
  FontAwesomeIcon,
  GrcButton,
  GrcGrid,
  gridOptions,
  IconProp
} from '@grc/ui-package';
import { convertToShortDate, formatAddress } from '@grc/ui-utility';
import { useI18nState } from '../../../../stores/settings/language-context';
import useInvoiceCreation from '../../useInvoiceCreation';
import useViewAllShipmentDetails from './useViewAllShipmentDetails';
import SendInvoiceForApproval from '../../../common/send-for-approval';
import GetInvoiceTotal from '../../../common/invoices/invoice-charges-total/invoice-charges-total';

//Styles
import './all-shipments-details.scss';

export default function ViewAllShipmentsData() {
  const gridRef = useRef<AgGridReact>(null);
  const { localeData } = useI18nState();
  const isPagination: boolean = true;
  const paginationChildRows = true;
  const {
    isSendInvoicePopupVisible,
    setIsSendInvoicePopupVisible,
    isInCreation,
    setIsInvoiceCreation,
    shipmentDetailsStore,
    shipmentIds,
    filterDetailsStore
  } = useInvoiceCreation();
  const { customer, billTo, shipmentDetailsColumnsDef } =
    useViewAllShipmentDetails();
  const filteredShipmentData = shipmentDetailsStore.filter(shipment =>
    shipmentIds.includes(shipment.shipmentId)
  );
  const aggregatedCharges = filteredShipmentData.reduce(
    (acc, shipment) => {
      acc.charge += shipment.charge || 0;
      acc.fuel += shipment.fuel || 0;
      acc.accessorial += shipment.accessorial || 0;
      acc.total += shipment.total || 0;
      return acc;
    },
    {
      charge: 0,
      fuel: 0,
      accessorial: 0,
      subTotal: 0,
      discount: 0,
      taxes: 0,
      total: 0
    }
  );

  return (
    <>
      <div className="container-fluid grc-card preview-shipment-details-main-div">
        <div className="d-flex preview-shipment-details-div">
          <div className="section-card-div mr-2">
            <div className="d-flex customer-billto-div index-grc-card-title">
              <div
                className="row m-0 customer-div"
                data-testid="invoice_details_origin"
              >
                <div className="col-md-12 mb-2">
                  <label
                    id="carrier_details_label_manage_carrier"
                    className="grc-value"
                  >
                    {localeData.CustomerDetails}
                  </label>
                </div>
                <div
                  className="col-md-12 mb-2"
                  data-testid="origin_location_name"
                >
                  <span id="carrier_name_value_manage" className="grc-value">
                    {customer?.accountName}
                  </span>
                </div>
                <div
                  className="col-md-12 mb-2 d-flex align-items-center"
                  data-testid="origin_address"
                >
                  <FontAwesomeIcon
                    icon={falocationdotclassicregular as IconProp}
                  />
                  <span
                    id="address_value_manage_carrier"
                    className="ml-2 text-sx"
                  >
                    {customer?.address && (
                      <span>{formatAddress(customer?.address)}</span>
                    )}
                  </span>
                </div>
                <div
                  className="col-md-12 mb-2 d-flex align-items-center"
                  data-testid="origin_phone"
                >
                  <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
                  <span
                    id="mobile_number_value_manage"
                    className="ml-2 text-sx"
                  >
                    {!!customer?.telephoneNos &&
                      !!customer?.telephoneNos[0].contactValue &&
                      customer?.telephoneNos[0].contactValue}
                  </span>
                </div>
                <div
                  className="col-md-12 mb-2 d-flex align-items-center"
                  data-testid="origin_phone"
                >
                  <FontAwesomeIcon
                    icon={faenvelopeclassicregular as IconProp}
                  />
                  <span
                    id="email_address_value_manage"
                    className="ml-2 text-sx"
                  >
                    {!!customer?.accountEmail && customer?.accountEmail}
                  </span>
                </div>
              </div>
              <div
                className="row m-0 billto-div"
                data-testid="invoice_details_destination"
              >
                <div className="col-md-12 mb-2">
                  <label
                    id="carrier_details_label_manage_carrier"
                    className="grc-value"
                  >
                    {localeData.BillToDetails}
                  </label>
                </div>
                <div
                  className="col-md-12 mb-2"
                  data-testid="destination_location_name"
                >
                  <span id="carrier_name_value_manage" className="grc-value">
                    {billTo?.name}
                  </span>
                </div>
                <div
                  className="col-md-12 mb-2 d-flex align-items-center"
                  data-testid="destination_address"
                >
                  <FontAwesomeIcon
                    icon={falocationdotclassicregular as IconProp}
                  />

                  <span
                    id="address_value_manage_carrier"
                    className="ml-2 text-sx"
                  >
                    {billTo?.address && (
                      <span>{formatAddress(billTo?.address)}</span>
                    )}
                  </span>
                </div>
                <div
                  className="col-md-12 mb-2 d-flex align-items-center"
                  data-testid="destination_phone"
                >
                  <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
                  <span
                    id="mobile_number_value_manage"
                    className="ml-2 text-sx"
                  >
                    {!!billTo?.communicationDetails &&
                      !!billTo?.communicationDetails[0].contactValue &&
                      billTo?.communicationDetails[0].contactValue}
                  </span>
                </div>
                <div
                  className="col-md-12 mb-2 d-flex align-items-center"
                  data-testid="destination_phone"
                >
                  <FontAwesomeIcon
                    icon={faenvelopeclassicregular as IconProp}
                  />
                  <span
                    id="email_address_value_manage"
                    className="ml-2 text-sx"
                  >
                    {billTo?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <GetInvoiceTotal chargeDetails={aggregatedCharges} />
          </div>
        </div>
        <div className="w-100 d-flex p-3">
          <div className="col-6 pt-1 f-600">
            <span className="mr-2">
              {filterDetailsStore?.fromDate
                ? convertToShortDate(new Date(filterDetailsStore.fromDate))
                : ''}
            </span>
            {filterDetailsStore?.fromDate && filterDetailsStore?.toDate && (
              <span className="mr-2">{localeData.To}</span>
            )}
            <span>
              {filterDetailsStore?.toDate
                ? convertToShortDate(new Date(filterDetailsStore.toDate))
                : ''}
            </span>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div className="ml-3 pt-1 f-600">
              {localeData.TotalNoOfShipments}
              <label className="mr-1 ml-1">-</label>
              {filteredShipmentData.length}
            </div>
          </div>
        </div>
        <div className="mt-n-2 mb-4">
          <GrcGrid
            gridRef={gridRef}
            colDefs={shipmentDetailsColumnsDef}
            gridOptions={gridOptions}
            domLayout={DomLayout.Height}
            isPagination={isPagination}
            rowData={filteredShipmentData}
            otherProps={{
              paginationChildRows: paginationChildRows
            }}
          />
        </div>
        <div className="grc-action-card preview-buttons">
          <GrcButton
            text={localeData.SendForApproval}
            className="grc-btn-secondary"
            onClick={() => {
              setIsSendInvoicePopupVisible(true);
              setIsInvoiceCreation(true);
            }}
          />
          <GrcButton
            text={localeData.GenerateInvoice}
            className="grc-btn-primary"
            disabled={true}
            onClick={() => {}}
          />
        </div>
      </div>
      {isSendInvoicePopupVisible && (
        <SendInvoiceForApproval
          isSendInvoicePopupVisible={isSendInvoicePopupVisible}
          setIsSendInvoicePopupVisible={setIsSendInvoicePopupVisible}
          isInCreation={isInCreation}
          setIsInvoiceCreation={setIsInvoiceCreation}
        />
      )}
    </>
  );
}
