import { InvoicePopupDetailsTabProps } from '../details-tab/details-tab.interface';
import ChargeTypes from './charge-types';
import InvoiceLocationsDetails from './invoice-locations';

export default function InvoicePopupInvoicesTab(
  props: InvoicePopupDetailsTabProps
) {
  return (
    <div>
      <InvoiceLocationsDetails
        shipments={props.shipments}
        billTo={props.billTo}
        customer={props.customer}
        unitOfMeasures={props.unitOfMeasures}
      />
      <ChargeTypes />
    </div>
  );
}
