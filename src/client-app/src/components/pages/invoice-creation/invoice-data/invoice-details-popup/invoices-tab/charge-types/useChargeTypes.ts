import { useCallback, useEffect, useState } from 'react';
import { CellValueChangedEvent } from 'ag-grid-enterprise';
import { useStore } from '../../../../../../stores/invoice-charge-details/invoice-charge-details-store';
import { charges } from '../../../../../../data/data';

export default function useChargeType() {
  const [chargeDetails] = useStore(store => store['chargeDetails']);
  const [reasonCode, setReasonCode] = useState<string>();
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalCharge, setTotalCharge] = useState<number>(0);
  const [totalAccessorialCost, setTotalAccessorialCost] = useState<number>(0);
  const [totalAccessorialCharge, setTotalAccessorialCharge] =
    useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [accessorialCharges, setAccessorialCharges] = useState<any>();

  const calculateTotals = (charges: any[]) => {
    let cost = 0;
    let charge = 0;

    charges.forEach(item => {
      if (item?.accessorial) {
        const { cost: nestedCost, charge: nestedCharge } = calculateTotals(
          item?.accessorial
        );
        cost += nestedCost;
        charge += nestedCharge;
      } else {
        cost += Number(item?.cost || 0);
        charge += Number(item?.charge || 0);
      }
    });

    return { cost, charge };
  };

  const updateTotals = useCallback(() => {
    const { cost: mainCost, charge: mainCharge } = calculateTotals(charges);
    const { cost: accessorialCost, charge: accessorialCharge } =
      calculateTotals(charges);
    setTotalCost(mainCost);
    setTotalCharge(mainCharge);
    setTotalAccessorialCost(accessorialCost);
    setTotalAccessorialCharge(accessorialCharge);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charges, accessorialCharges, calculateTotals]);

  const handleCellValueChanged = useCallback(
    (event: CellValueChangedEvent) => {
      updateTotals();
    },
    [updateTotals]
  );

  const handleDetailCellValueChanged = useCallback(() => {
    updateTotals();
  }, [updateTotals]);

  useEffect(() => {
    updateTotals();
    const accessorialEntry = charges.find(
      charge => charge.chargeType === 'Accessorial'
    );
    const accessorialCharges =
      accessorialEntry && Array.isArray(accessorialEntry.accessorial)
        ? accessorialEntry.accessorial
        : [];
    if (accessorialCharges.length > 0) {
      let cost = 0;
      let charge = 0;
      for (let i = 0; i < accessorialCharges.length; i++) {
        if (accessorialCharges[i]) {
          cost += Number(accessorialCharges[i].cost);
          charge += Number(accessorialCharges[i].charge);
        }
      }
      setTotalAccessorialCost(cost);
      setTotalAccessorialCharge(charge);
      setAccessorialCharges(accessorialCharges);
    }
  }, [updateTotals]);

  return {
    chargeDetails,
    totalCost,
    totalCharge,
    reasonCode,
    totalAccessorialCost,
    totalAccessorialCharge,
    isExpanded,
    accessorialCharges,
    setReasonCode,
    setIsExpanded,
    charges,
    updateTotals,
    handleCellValueChanged,
    handleDetailCellValueChanged
  };
}
