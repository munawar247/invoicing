import { convertToShortDate } from '@grc/ui-utility';
import { useI18nState } from '../../../stores/settings/language-context';
import { ChargesData, InvoiceData } from '../../../data/data';

//Styles
import './shipment-data.scss';

export default function GetShipmentsData({ invoiceId }: { invoiceId: string }) {
  const { localeData } = useI18nState();

  return (
    <div className="shipment-details-main-div">
      <div className="shipment-details">
        <div>
          <div className="grc-label">
            <label>{localeData.InvoiceNumber}</label>
          </div>
          <div className="fw-bold">
            <label>{invoiceId}</label>
          </div>
        </div>
        <div>
          <div className="grc-label">
            <label>{localeData.ShipmentDateRange}</label>
          </div>
          <div className="fw-bold">
            <label>
              {InvoiceData.shipmentFromDate instanceof Date &&
                convertToShortDate(InvoiceData.shipmentFromDate)}
              <label className="mr-1 ml-1">-</label>
              {InvoiceData.shipmentToDate instanceof Date &&
                convertToShortDate(InvoiceData.shipmentToDate)}
            </label>
          </div>
        </div>
        <div>
          <div className="grc-label">
            <label>{localeData.NoOfPages}</label>
          </div>
          <div className="fw-bold justify-content-center">
            <label>{InvoiceData.noOfPages}</label>
          </div>
        </div>
        <div>
          <div className="grc-label">
            <label>{localeData.NoOfExceptions}</label>
          </div>
          <div className="fw-bold justify-content-center">
            <label>{InvoiceData.noOfException}</label>
          </div>
        </div>
        <div>
          <div className="grc-label">
            <label>{localeData.TotalShipments}</label>
          </div>
          <div className="fw-bold justify-content-center">
            <label>{InvoiceData.totalShipments}</label>
          </div>
        </div>
        <div>
          <div className="grc-label">
            <label>{localeData.ShipmentsOnInvoice}</label>
          </div>
          <div className="fw-bold justify-content-center">
            <label>{InvoiceData.shipmentsOnInvoice}</label>
          </div>
        </div>
        <div>
          <div className="grc-label">
            <label>{localeData.TotalAmount}</label>
          </div>
          <div className="fw-bold">{`USD ${Number(ChargesData.total).toFixed(2)}`}</div>
        </div>
      </div>
    </div>
  );
}
