import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { DomLayout, GrcGrid, gridOptions } from '@grc/ui-package';
import { convertToShortDate } from '@grc/ui-utility';
import { useI18nState } from '../../../../stores/settings/language-context';
import useInvoiceCreation from '../../useInvoiceCreation';
import useOnHoldInvoice from './useOnHoldInvoice';
import { onHoldInvoice } from './on-hold-invoices.interface copy';
import {
  isPagination,
  onHoldInvoicesStaticData,
  pageSizeSelectorOptions
} from '../../../../data/data';

export default function OnHoldInvoices({ onHoldInvoiceData }: onHoldInvoice) {
  const gridRef = useRef<AgGridReact>(null);
  const { localeData } = useI18nState();
  const { onHoldInvoiceColumnsDef } = useOnHoldInvoice();
  const { filterDetailsStore } = useInvoiceCreation();

  return (
    <>
      <div>
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
            {onHoldInvoicesStaticData?.length}
          </div>
        </div>
        <GrcGrid
          gridRef={gridRef}
          gridOptions={gridOptions}
          colDefs={onHoldInvoiceColumnsDef}
          domLayout={DomLayout.Normal}
          isPagination={isPagination}
          rowData={onHoldInvoicesStaticData}
          otherProps={{
            pageSizeSelecterOptions: pageSizeSelectorOptions
          }}
        />
      </div>
    </>
  );
}
