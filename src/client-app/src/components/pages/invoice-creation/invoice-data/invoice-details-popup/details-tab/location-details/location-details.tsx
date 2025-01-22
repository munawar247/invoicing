import {
  faenvelopeclassicregular,
  falocationdotclassicregular,
  faphoneclassicregular,
  FontAwesomeIcon,
  IconProp
} from '@grc/ui-package';
import { formatAddress } from '@grc/ui-utility';
import { ILocationDetailsProps } from './location-details.interface';

//Styles
import './location-details.scss';

export default function LocationDetails(props: ILocationDetailsProps) {
  const { data } = props;
  return (
    <div className="location-details-main-div h-100">
      <div className="section-card-div location-address-background h-100">
        <div className="d-flex p-2">
          <div className="row m-0" data-testid="invoice_details_origin">
            <div className="col-md-12 mb-2">
              <label
                id="carrier_details_label_manage_carrier"
                className="grc-value"
              >
                {props.title}
              </label>
            </div>
            <div className="col-md-12 mb-2" data-testid="origin_location_name">
              <span id="carrier_name_value_manage" className="grc-value">
                {!!data?.name && data?.name}
              </span>
            </div>
            <div className="col-md-12 mb-2 d-flex" data-testid="origin_address">
              <span>
                <FontAwesomeIcon
                  icon={falocationdotclassicregular as IconProp}
                />
              </span>
              {data?.address && (
                <span className="ml-2">{formatAddress(data?.address)}</span>
              )}
            </div>
            <div
              className="col-md-12 mb-2 d-flex align-items-center"
              data-testid="origin_phone"
            >
              <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
              <span className="ml-2">
                {!!data?.communicationDetails &&
                  !!data?.communicationDetails[0].contactValue &&
                  data?.communicationDetails[0].contactValue}
              </span>
              <span className="ml-4">
                <FontAwesomeIcon icon={faenvelopeclassicregular as IconProp} />
              </span>
              <span className="ml-2">{!!data?.email && data?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
