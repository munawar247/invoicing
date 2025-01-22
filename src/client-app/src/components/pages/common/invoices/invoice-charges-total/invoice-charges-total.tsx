import { useI18nState } from '../../../../stores/settings/language-context';
import { IProps } from '../../../invoice-creation/invoice-data/all-shipment-details/all-shipment-details.interface';

//Styles
import '../invoice-charges-total/invoice-charges-total.scss';

export default function GetInvoiceTotal(props: IProps) {
  const { localeData } = useI18nState();

  return (
    <div className="d-grid total-div-main">
      <div className="total-div">
        <div className="total-cols">
          <div className="grc-label">{localeData.Charge}</div>
          <div className="grc-label">{localeData.Fuel}</div>
          <div className="grc-label">{localeData.Accessorial}</div>
          <div className="grc-label">{localeData.SubTotal}</div>
          <div className="grc-label">{`${localeData.Discount} (%)`}</div>
          <div className="grc-label">{localeData.Taxes}</div>
          <div className="widget-title">{localeData.Total}</div>
        </div>
        <div className="total-values">
          <div className="fw-bold">{props.chargeDetails.charge.toFixed(2)}</div>
          <div className="fw-bold">{props.chargeDetails.fuel.toFixed(2)}</div>
          <div className="fw-bold">
            {props.chargeDetails.accessorial.toFixed(2)}
          </div>
          <div className="fw-bold">
            {props.chargeDetails.subTotal.toFixed(2)}
          </div>
          <div className="fw-bold">
            {props.chargeDetails.discount.toFixed(2)}
          </div>
          <div className="fw-bold">{props.chargeDetails.taxes.toFixed(2)}</div>
          <div className="widget-title">
            {`USD ${Number(props.chargeDetails.total).toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
}
