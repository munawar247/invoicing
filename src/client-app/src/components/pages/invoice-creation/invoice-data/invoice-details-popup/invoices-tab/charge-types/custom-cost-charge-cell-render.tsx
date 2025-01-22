import { ICellRendererParams } from 'ag-grid-enterprise';

export const CustomCostChargeCellRenderer: React.FC<{
  params: ICellRendererParams;
  isExpanded: boolean;
  totalAccessorialCost: number;
  totalAccessorialCharge: number;
}> = ({ params, totalAccessorialCost, totalAccessorialCharge }) => {
  let charge;

  if (params.data.chargeType === 'Accessorial') {
    charge =
      params.colDef?.field === 'cost'
        ? totalAccessorialCost.toFixed(2)
        : totalAccessorialCharge.toFixed(2);
  } else {
    charge = params.value;
  }

  return (
    <div className="custom-group-cell-renderer">
      <span>{`$ ${parseFloat(charge).toFixed(2)}`}</span>
    </div>
  );
};
