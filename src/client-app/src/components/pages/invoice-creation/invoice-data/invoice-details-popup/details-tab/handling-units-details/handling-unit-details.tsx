import { useRef } from 'react';
import { AgGridReact, GrcGrid, gridOptions, DomLayout } from '@grc/ui-package';
import { useI18nState } from '../../../../../../stores/settings/language-context';
import useHandlingUnitDetails from './useHandlingUnitDetails';
import { IManageHandlingUnitDetails } from './handling-unit-details.interface';

import './handling-unit-details.scss';

export default function HandlingUnitDetails(props: IManageHandlingUnitDetails) {
  const gridRef = useRef<AgGridReact>(null);
  const { localeData } = useI18nState();
  const { handleUnitDetailsColumnDefs, totalQty, totalWeight, weightUnit } =
    useHandlingUnitDetails(props);

  return (
    <>
      <div className="main-handling-details-header">
        <label className="grc-card-title">
          {localeData.HandlingUnitDetails}
        </label>
      </div>
      <div className="main-handling-unit-div p-2 pt-2 grc-grid-no-col-filters">
        <GrcGrid
          gridRef={gridRef}
          gridOptions={gridOptions}
          colDefs={handleUnitDetailsColumnDefs}
          domLayout={DomLayout.AutoHeight}
          rowData={props.handlingUnitDetails}
        />
      </div>
      <div className="main-handling-unit-totals">
        <label id="total_quantity_label_manage" className="mr-4">
          {localeData.TotalQuantity} :
          <span
            id="total_quantity_value_manage"
            className="ml-2 handling-value-txt"
          >
            {totalQty}
          </span>
        </label>
        <label id="total_quantity_label_manage" className="mr-4">
          {localeData.TotalWeight} :
          <span
            id="total_quantity_value_manage"
            className="ml-2 handling-value-txt"
          >
            {totalWeight}
          </span>
          <span id="lb_label_manage" className="ml-2 ">
            {weightUnit}
          </span>
        </label>
      </div>
    </>
  );
}
