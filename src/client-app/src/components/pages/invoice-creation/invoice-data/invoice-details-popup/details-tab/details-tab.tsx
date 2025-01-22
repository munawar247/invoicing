import { InvoicePopupDetailsTabProps } from './details-tab.interface';
import InvoiceShipmentLocationsDetails from './shipment-locations-details';

export default function InvoicePopupDetailsTab(
  props: InvoicePopupDetailsTabProps
) {
  return (
    <>
      <InvoiceShipmentLocationsDetails
        shipments={props.shipments}
        billTo={props.billTo}
        customer={props.customer}
        unitOfMeasures={props.unitOfMeasures}
      />
    </>
  );
}
