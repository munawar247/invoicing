import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { DomLayout, GrcGrid, gridOptions } from '@grc/ui-package';
import { convertToShortDate } from '@grc/ui-utility';
import { useI18nState } from '../../../../stores/settings/language-context';
import useInvoiceCreation from '../../useInvoiceCreation';
import {
  isPagination,
  notReadyToInvoiceStaticData
} from '../../../../data/data';

//Styles
import './not-ready-to-invoices.scss';

export default function NotReadyToInvoices() {
  const gridRef = useRef<AgGridReact>(null);
  const { localeData } = useI18nState();
  const { filterDetailsStore } = useInvoiceCreation();

  const notReadyToInvoiceColumnsDef = [
    {
      headerName: localeData.ShipmentNo,
      field: 'shipmentId',
      cellStyle: { color: '#1099e7' }
    },
    {
      headerName: localeData.ExceptionReason,
      field: 'exceptionReason'
    },
    {
      headerName: localeData.Mode,
      field: 'transportationMode'
    },
    {
      headerName: localeData.CreatedDate,
      field: 'createdDate',
      minWidth: 200
    },
    {
      headerName: localeData.Actions,
      field: 'action',
      cellStyle: {
        textAlign: 'center',
        color: '#1099e7',
        textDecoration: 'underline'
      }
    }
  ];

  return (
    <div
      className="not-ready-to-invoice-main-div"
      data-testid="not_ready_to_invoice_grid"
    >
      <div className="row update-note py-1 mx-0">
        <span>{localeData.NoteRequired}</span>
      </div>
      <div className="mb-2 d-flex justify-content-between">
        <div className="grc-label-value">
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
        <div className="grc-label-value">
          {localeData.TotalNoOfShipments}
          <label className="ml-1 mr-1">-</label>
          {notReadyToInvoiceStaticData?.length}
        </div>
      </div>
      <GrcGrid
        gridRef={gridRef}
        gridOptions={gridOptions}
        colDefs={notReadyToInvoiceColumnsDef}
        domLayout={DomLayout.Normal}
        rowData={notReadyToInvoiceStaticData}
        isPagination={isPagination}
      />
    </div>
  );
}
