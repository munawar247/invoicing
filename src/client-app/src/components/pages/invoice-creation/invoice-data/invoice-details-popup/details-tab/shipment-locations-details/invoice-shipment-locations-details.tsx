import {
  FontAwesomeIcon,
  IconProp,
  faenvelopeclassicregular,
  falocationdotclassicregular,
  faphoneclassicregular
} from '@grc/ui-package';
import { dateFormatterCellRenderer, formatAddress } from '@grc/ui-utility';
import { useI18nState } from '../../../../../../stores/settings/language-context';
import useShipmentLocations from './useShipmentLocations';
import AccessorialDetails from '../accessorial-details/accessorial-details';
import ProductDetails from '../product-details/product-details';
import ReferenceDocuments from '../reference-documents/reference-and-documents';
import LocationDetails from '../location-details';
import HandlingUnitDetails from '../handling-units-details';
import { InvoiceShipmentLocationsDetailsProps } from './invoice-shipment-locations-details.interface';

//Styles
import './invoice-shipment-location-details.scss';

export default function InvoiceShipmentLocationsDetails(
  props: InvoiceShipmentLocationsDetailsProps
) {
  const { localeData } = useI18nState();
  const { lengthUnits, massUnits } = useShipmentLocations(props);

  return (
    <div className="create-invoice-charges-popup-main-div">
      <div className="row m-0 pt-3 h-100">
        <div className="col-6">
          <div className="section-card-div shipper-consignee-background h-100">
            <div className="d-flex p-2">
              <div className="row m-0" data-testid="invoice_details_origin">
                <div className="col-md-12 mb-2">
                  <label
                    id="carrier_details_label_manage_carrier"
                    className="grc-value"
                  >
                    {localeData.Origin}
                  </label>
                </div>
                <div
                  className="col-md-12 mb-2"
                  data-testid="origin_location_name"
                >
                  <span id="carrier_name_value_manage" className="grc-value">
                    {props.shipments?.shipper?.name}
                  </span>
                </div>
                <div
                  className="col-md-12 mb-2 d-flex"
                  data-testid="origin_address"
                >
                  <span>
                    <FontAwesomeIcon
                      icon={falocationdotclassicregular as IconProp}
                    />
                  </span>
                  {props.shipments?.shipper?.address && (
                    <span className="ml-2">
                      {formatAddress(props.shipments?.shipper?.address)}
                    </span>
                  )}
                </div>
                <div
                  className="col-md-12 mb-2 d-flex align-items-center"
                  data-testid="origin_phone"
                >
                  <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
                  <span id="mobile_number_value_manage" className="ml-2">
                    {props?.shipments?.shipper?.mobileNumber}
                  </span>
                  <span className="ml-4">
                    <FontAwesomeIcon
                      icon={faenvelopeclassicregular as IconProp}
                    />
                  </span>
                  <span id="email_address_value_manage" className="ml-2">
                    {props.shipments?.shipper?.emailAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <LocationDetails
            title={localeData.BillToDetails}
            data={props.billTo}
          />
        </div>
      </div>
      <div className="row m-0 pt-3 h-100">
        <div className="col-6">
          <div className="section-card-div shipper-consignee-background h-100">
            <div className="d-flex p-2">
              <div
                className="row m-0"
                data-testid="invoice_details_destination"
              >
                <div className="col-md-12 mb-2">
                  <label
                    id="carrier_details_label_manage_carrier"
                    className="grc-value"
                  >
                    {localeData.Destination}
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
                  {props.shipments?.consignee?.address && (
                    <span className="ml-2">
                      {formatAddress(props.shipments?.consignee?.address)}
                    </span>
                  )}
                </div>
                <div
                  className="col-md-12 mb-2 d-flex align-items-center"
                  data-testid="destination_phone"
                >
                  <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
                  <span id="mobile_number_value_manage" className="ml-2">
                    {props.shipments?.consignee?.mobileNumber}
                  </span>
                  <span className="ml-4">
                    <FontAwesomeIcon
                      icon={faenvelopeclassicregular as IconProp}
                    />
                  </span>
                  <span id="email_address_value_manage" className="ml-2">
                    {props.shipments?.consignee?.emailAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="section-card-div shipper-consignee-background h-100">
            <div className="d-flex p-2">
              <div className="row m-0" data-testid="invoice_details_origin">
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
                    {!!props?.customer?.accountName &&
                      props?.customer?.accountName}
                  </span>
                </div>
                <div
                  className="col-md-12 mb-2 d-flex"
                  data-testid="origin_address"
                >
                  <span>
                    <FontAwesomeIcon
                      icon={falocationdotclassicregular as IconProp}
                    />
                  </span>
                  {props?.customer?.address && (
                    <span className="ml-2">
                      {formatAddress(props?.customer?.address)}
                    </span>
                  )}
                </div>
                <div
                  className="col-md-12 mb-2 d-flex align-items-center"
                  data-testid="origin_phone"
                >
                  <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
                  <span className="ml-2">
                    {!!props?.customer?.telephoneNos &&
                      !!props?.customer?.telephoneNos[0].contactValue &&
                      props?.customer?.telephoneNos[0].contactValue}
                  </span>
                  <span className="ml-4">
                    <FontAwesomeIcon
                      icon={faenvelopeclassicregular as IconProp}
                    />
                  </span>
                  <span className="ml-2">
                    {!!props?.customer?.accountEmail &&
                      props?.customer?.accountEmail}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2 p-2">
        <div className="col d-flex">
          <div className="pickup-due-date ml-2 col-10">
            <div className="row">
              <div className="col-3">{localeData.PickUpReadyDateTime}</div>
              <div className="col-3">{localeData.PickUpCloseDateTime}</div>
              <div className="col-3">
                <label>{localeData.DeliveryReadyDateTime}</label>
              </div>
              <div className="col-3">
                <label>{localeData.DeliveryCloseDateTime}</label>
              </div>
            </div>
            <div className="row plain-value mt-2">
              <div className="col-3 grc-value">
                <label>
                  {!!props.shipments?.pickupInfo?.readyDate &&
                    dateFormatterCellRenderer(
                      props.shipments?.pickupInfo?.readyDate
                    )}
                </label>
              </div>
              <div className="col-3 grc-value">
                <label>
                  {!!props.shipments?.pickupInfo?.closeDate &&
                    dateFormatterCellRenderer(
                      props.shipments?.pickupInfo?.closeDate
                    )}
                </label>
              </div>
              <div className="col-3 grc-value">
                <label>
                  {!!props.shipments?.deliveryInfo?.readyDate &&
                    dateFormatterCellRenderer(
                      props.shipments?.deliveryInfo?.readyDate
                    )}
                </label>
              </div>
              <div className="col-3 grc-value">
                <label>
                  {!!props.shipments?.deliveryInfo?.closeDate &&
                    dateFormatterCellRenderer(
                      props.shipments?.deliveryInfo?.closeDate
                    )}
                </label>
              </div>
            </div>
          </div>
          <div className="col-4 d-flex">
            <div className="col-4">
              <div>{localeData.Mode}</div>
              <div className="mt-2 grc-value">
                {props.shipments?.transportationMode?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mt-2 p-2" data-testid="handling_unit_details">
        <HandlingUnitDetails
          handlingUnitDetails={props.shipments?.handlingUnits}
          lengthUnits={lengthUnits}
          massUnits={massUnits}
        />
      </div>
      <hr className="mt-1" />
      <div className="row mt-2 p-2" data-testid="accessorial_details">
        <AccessorialDetails accessorials={props?.shipments?.accessorials} />
      </div>
      <hr className="mt-1" />
      <div className="row mt-2 p-2" data-testid="product_details">
        <ProductDetails productDetails={props?.shipments?.productDetails} />
      </div>
      <div className="row mt-2 p-2" data-testid="reference_documents">
        <ReferenceDocuments
          referenceAndDocument={props?.shipments?.references}
        />
      </div>
    </div>
  );
}
