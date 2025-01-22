import {
  faenvelopeclassicregular,
  falocationdotclassicregular,
  faphoneclassicregular,
  FontAwesomeIcon,
  IconProp
} from '@grc/ui-package';
import { formatAddress } from '@grc/ui-utility';
import { useI18nState } from '../../../../../../stores/settings/language-context';
import { InvoiceShipmentLocationsDetailsProps } from '../../details-tab/shipment-locations-details/invoice-shipment-locations-details.interface';

//Styles
import './invoice-locations-details.scss';

export default function InvoiceLocationsDetails(
  props: InvoiceShipmentLocationsDetailsProps
) {
  const { localeData } = useI18nState();

  return (
    <div className="invoice-locations-main-div d-flex  h-100">
      <div className="section-card-div mr-2">
        <div className="d-flex p-2 shipper-consignee-background-div h-100">
          <div className="row m-0" data-testid="invoice_details_origin">
            <div className="col-md-12 mb-2">
              <label
                id="carrier_details_label_manage_carrier"
                className="grc-value"
              >
                {localeData.BillToDetails}
              </label>
            </div>
            <div className="col-md-12 mb-2" data-testid="origin_location_name">
              <span id="carrier_name_value_manage" className="grc-value">
                {!!props.billTo?.name && props.billTo?.name}
              </span>
            </div>
            <div className="col-md-12 mb-2 d-flex" data-testid="origin_address">
              <span>
                <FontAwesomeIcon
                  icon={falocationdotclassicregular as IconProp}
                />
              </span>
              {props.billTo?.address && (
                <span className="ml-2">
                  {formatAddress(props.billTo?.address)}
                </span>
              )}
            </div>
            <div className="col-md-12 mb-2" data-testid="origin_phone">
              <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
              <span className="ml-2">
                {!!props.billTo?.communicationDetails &&
                  !!props.billTo?.communicationDetails[0].contactValue &&
                  props.billTo?.communicationDetails[0].contactValue}
              </span>
            </div>
            <div className="col-md-12 mb-2">
              <FontAwesomeIcon icon={faenvelopeclassicregular as IconProp} />
              <span className="ml-2">
                {!!props.billTo?.email && props.billTo?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="section-card-div mr-2">
        <div className="d-flex p-2 shipper-consignee-div shipper-consignee-background-div h-100">
          <div
            className="row m-0 shipper-div"
            data-testid="invoice_details_origin"
          >
            <div className="col-md-12 mb-2">
              <label
                id="carrier_details_label_manage_carrier"
                className="grc-value"
              >
                {localeData.ShipperDetails}
              </label>
            </div>
            <div className="col-md-12 mb-2" data-testid="origin_location_name">
              <span id="carrier_name_value_manage" className="grc-value">
                {props.shipments?.shipper?.name}
              </span>
            </div>
            <div className="col-md-12 mb-2 d-flex" data-testid="origin_address">
              <span>
                <FontAwesomeIcon
                  icon={falocationdotclassicregular as IconProp}
                />
              </span>
              <span id="address_value_manage_carrier" className="ml-2">
                {props.shipments?.shipper?.address && (
                  <span>
                    {formatAddress(props.shipments?.shipper?.address)}
                  </span>
                )}
              </span>
            </div>
            <div className="col-md-12 mb-2" data-testid="origin_phone">
              <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
              <span id="mobile_number_value_manage" className="ml-2">
                {props?.shipments?.shipper?.mobileNumber}
              </span>
            </div>
            <div className="col-md-12 mb-2">
              <FontAwesomeIcon icon={faenvelopeclassicregular as IconProp} />
              <span id="email_address_value_manage" className="ml-2">
                {props.shipments?.shipper?.emailAddress}
              </span>
            </div>
          </div>
          <div
            className="row m-0 consignee-div"
            data-testid="invoice_details_destination"
          >
            <div className="col-md-12 mb-2">
              <label
                id="carrier_details_label_manage_carrier"
                className="grc-value"
              >
                {localeData.ConsigneeDetails}
              </label>
            </div>
            <div
              className="col-md-12 mb-2"
              data-testid="destination_location_name"
            >
              <span id="carrier_name_value_manage" className="grc-value">
                {props.shipments?.consignee?.name}
              </span>
            </div>
            <div
              className="col-md-12 mb-2 d-flex"
              data-testid="destination_address"
            >
              <span>
                <FontAwesomeIcon
                  icon={falocationdotclassicregular as IconProp}
                />
              </span>
              <span id="address_value_manage_carrier" className="ml-2">
                {props.shipments?.consignee?.address && (
                  <span>
                    {formatAddress(props.shipments?.consignee?.address)}
                  </span>
                )}
              </span>
            </div>
            <div className="col-md-12 mb-2" data-testid="destination_phone">
              <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
              <span id="mobile_number_value_manage" className="ml-2">
                {props.shipments?.consignee?.mobileNumber}
              </span>
            </div>
            <div className="col-md-12 mb-2">
              <span>
                <FontAwesomeIcon icon={faenvelopeclassicregular as IconProp} />
              </span>
              <span id="email_address_value_manage" className="ml-2">
                {props.shipments?.consignee?.emailAddress}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
