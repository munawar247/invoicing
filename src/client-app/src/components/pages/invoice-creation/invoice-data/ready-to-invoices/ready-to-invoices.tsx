import { useRef } from 'react';
import { AgGridReact, DomLayout, GrcGrid, gridOptions } from '@grc/ui-package';
import { convertToShortDate } from '@grc/ui-utility';
import { useI18nState } from '../../../../stores/settings/language-context';
import useInvoiceCreation from '../../useInvoiceCreation';
import { IInvoiceReady } from './ready-to-invoice.interface';
import { isPagination } from '../../../../data/data';

//Styles
import '../invoice-data.scss';

export default function ReadyToInvoices(props: IInvoiceReady) {
  const gridRef = useRef<AgGridReact>(null);
  const { localeData } = useI18nState();
  const {
    readyToInvoiceColumnsDef,
    shipmentDetailsStore,
    filterDetailsStore,
    setGlobalStore
  } = useInvoiceCreation();

  return (
    <>
      <div data-testid="ready_to_invoice_grid">
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
            <label className="mr-1 ml-1">-</label>
            {shipmentDetailsStore?.length}
          </div>
        </div>
        <GrcGrid
          gridRef={gridRef}
          gridOptions={{
            ...gridOptions,
            rowSelection: 'multiple'
          }}
          colDefs={readyToInvoiceColumnsDef}
          domLayout={DomLayout.Normal}
          isPagination={isPagination}
          rowData={shipmentDetailsStore}
          otherProps={{
            onSelectionChanged: () => {
              if (gridRef.current) {
                const selectedNodes = gridRef.current.api.getSelectedNodes();
                if (selectedNodes.length > 0) {
                  const selectedData = selectedNodes.map(node => node.data);
                  props.setInvoiceHoldOrPreview(false);
                  props.setOnHoldInvoiceData(selectedData);
                  const shipmentIds = selectedData.map(item => item.shipmentId);
                  setGlobalStore({ shipmentIds: shipmentIds });
                } else {
                  props.setInvoiceHoldOrPreview(true);
                }
              }
            }
          }}
        />
      </div>
    </>
  );
}
