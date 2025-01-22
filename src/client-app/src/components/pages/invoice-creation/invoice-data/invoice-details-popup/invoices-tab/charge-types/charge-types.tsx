import { useMemo, useRef } from 'react';
import {
  AgGridReact,
  ColDef,
  DomLayout,
  GrcGrid,
  GrcTextArea,
  gridOptions,
  ICellRendererParams
} from '@grc/ui-package';
import { useI18nState } from '../../../../../../stores/settings/language-context';
import useChargeType from './useChargeTypes';
import { CustomCostChargeCellRenderer } from './custom-cost-charge-cell-render';
import { CustomGroupCellRenderer } from './custom-group-cell-render';
import './charge-types.scss';

export default function ChargeTypes() {
  const { localeData } = useI18nState();
  const {
    charges,
    totalCost,
    totalCharge,
    reasonCode,
    accessorialCharges,
    setReasonCode,
    isExpanded,
    totalAccessorialCost,
    totalAccessorialCharge,
    setIsExpanded,
    handleCellValueChanged,
    handleDetailCellValueChanged
  } = useChargeType();

  const gridRef = useRef<AgGridReact>(null);
  const commonCellStyle = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }),
    []
  );

  const columnDefs: ColDef<any>[] = [
    {
      headerName: localeData.ChargeType,
      field: 'chargeType',
      minWidth: 540,
      floatingFilter: false,
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams) => (
        <CustomGroupCellRenderer
          params={params}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      )
    },
    {
      headerName: `${localeData.Costs} (USD)`,
      field: 'cost',
      editable: true,
      floatingFilter: false,
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams) => (
        <CustomCostChargeCellRenderer
          params={params}
          isExpanded={isExpanded}
          totalAccessorialCost={totalAccessorialCost}
          totalAccessorialCharge={totalAccessorialCharge}
        />
      ),
      valueFormatter: (params: any) => {
        return `$ ${parseFloat(params.value).toFixed(2)}`;
      },
      minWidth: 80,
      cellStyle: {
        ...commonCellStyle,
        padding: '0px 80px 0px 0px'
      }
    },
    {
      headerName: `${localeData.Charge} (USD)`,
      field: 'charge',
      editable: true,
      floatingFilter: false,
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams) => (
        <CustomCostChargeCellRenderer
          params={params}
          isExpanded={isExpanded}
          totalAccessorialCost={totalAccessorialCost}
          totalAccessorialCharge={totalAccessorialCharge}
        />
      ),
      valueFormatter: (params: any) => {
        return `$ ${parseFloat(params.value).toFixed(2)}`;
      },
      minWidth: 80,
      cellStyle: {
        ...commonCellStyle,
        padding: '0px 64px 0px 0px'
      }
    }
  ];

  const customGridOptions = useMemo(() => {
    return {
      onGridReady: (params: any) => {
        params.api.setHeaderHeight(0);
      },
      sideBar: false
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mergedGridOptions = useMemo(() => {
    return {
      ...gridOptions,
      ...customGridOptions
    };
  }, [customGridOptions]);

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        ...mergedGridOptions,
        columnDefs: [
          {
            field: 'chargeType',
            headerClass: 'custom-header',
            minWidth: 540
          },
          {
            field: 'cost',
            editable: true,
            valueFormatter: (params: any) => {
              return `$ ${parseFloat(params.value).toFixed(2)}`;
            },
            minWidth: 80,
            headerClass: 'custom-header',
            cellStyle: {
              ...commonCellStyle,
              padding: '0px 80px 0px 0px'
            }
          },
          {
            field: 'charge',
            editable: true,
            valueFormatter: (params: any) => {
              return `$ ${parseFloat(params.value).toFixed(2)}`;
            },
            minWidth: 80,
            headerClass: 'custom-header',
            cellStyle: {
              ...commonCellStyle,
              padding: '0px 64px 0px 0px'
            }
          }
        ],

        defaultColDef: {
          flex: 1,
          floatingFilter: false
        },
        onCellValueChanged: handleDetailCellValueChanged
      },
      getDetailRowData: (params: any) => {
        params.successCallback(accessorialCharges);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessorialCharges, mergedGridOptions]);

  return (
    <div className="charge-types-main-div mb-4 mr-2">
      <div className="grc-grid-no-col-filters charge-details-rate-tab">
        <GrcGrid
          gridRef={gridRef}
          colDefs={columnDefs}
          gridOptions={{
            ...mergedGridOptions,
            onCellValueChanged: handleCellValueChanged
          }}
          domLayout={DomLayout.AutoHeight}
          rowData={charges}
          otherProps={{
            masterDetail: true,
            detailCellRendererParams: detailCellRendererParams
          }}
        />
      </div>
      <div className="row mt-4 mb-2 mr-2">
        <div className="col-6 grc-value"></div>
        <div className="cell col grc-card-title grc-bg-light-blue p-2">
          <label
            id="total_label_manage"
            className="col-2 grc-card-title grc-bg-light-blue"
          >
            {localeData.Total}
          </label>
        </div>
        <div className="cell col grc-card-title grc-bg-light-blue p-2">
          <span id="total_cost_value_manage">${totalCost.toFixed(2)}</span>
        </div>
        <div className="cell col grc-card-title grc-bg-light-blue p-2">
          <span id="total_charge_value_manage">${totalCharge.toFixed(2)}</span>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <div className="col-6 mr-2" data-testid="reason_code_text_area">
          <span className="grc-label">{localeData.ReasonCode}</span>
          <GrcTextArea
            id="charge-type-textarea-reason-code"
            value={reasonCode}
            placeholder={localeData.WriteHere}
            height="3.75rem"
            onValueChanged={e => {
              setReasonCode(e.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
