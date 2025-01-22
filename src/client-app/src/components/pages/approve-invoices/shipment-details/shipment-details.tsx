import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { DomLayout, GrcButton, GrcGrid, gridOptions } from '@grc/ui-package';
import { useI18nState } from '../../../stores/settings/language-context';
import useShipmentDetails from './useShipmentDetails';

//Styles
import './shipment-data.scss';

export default function GetShipmentDetails() {
  const { localeData } = useI18nState();
  const gridRef = useRef<AgGridReact>(null);
  const isPagination: boolean = true;
  const { shipmentDetailsStore, approveInvoiceShipmentsColumnDefs } =
    useShipmentDetails();

  return (
    <div className="shipment-details-main-div">
      <div className="d-flex justify-content-between pt-2 mb-2">
        <div className="widget-title">
          <label>{localeData.AllShipments}</label>
        </div>
        <div>
          <GrcButton
            id="reject_all_exceptions_get_shipment_details"
            text={localeData.RejectAllExceptions}
            className="btn-reject-all"
            onClick={() => {}}
          />
          <GrcButton
            id="approve_all_exceptions_get_shipment_details"
            text={localeData.ApproveAllExceptions}
            className="grc-btn-primary"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="all-shipments-grid-div">
        <GrcGrid
          gridRef={gridRef}
          colDefs={approveInvoiceShipmentsColumnDefs}
          gridOptions={gridOptions}
          rowData={shipmentDetailsStore}
          domLayout={DomLayout.Height}
          isPagination={isPagination}
        />
      </div>
    </div>
  );
}
