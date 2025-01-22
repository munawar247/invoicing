import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../../../../../../stores/invoice-charge-details/invoice-charge-details-store';
import { InvoiceShipmentLocationsDetailsProps } from './invoice-shipment-locations-details.interface';

export default function useShipmentLocations(
  props: InvoiceShipmentLocationsDetailsProps
) {
  const [lengthUnits, setLengthUnitsState] = useState<{
    [key: string]: string;
  }>({});
  const [massUnits, setMassUnitsState] = useState<{ [key: string]: string }>(
    {}
  );
  const [locationDetails] = useStore(store => store['locationDetails']);

  const setLengthUnits = useCallback(() => {
    const lengthUnits: { [key: string]: string } = {};
    if (!!props.unitOfMeasures) {
      props.unitOfMeasures.forEach((item: any) => {
        if (item.category === 'Length') {
          const unitKey = `${item.category}Unit.${item.unit}`;
          lengthUnits[unitKey] = item.symbol.toUpperCase();
        }
      });
      return lengthUnits;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.unitOfMeasures]);

  const setMassUnits = useCallback(() => {
    const massUnits: { [key: string]: string } = {};
    if (!!props.unitOfMeasures) {
      props.unitOfMeasures.forEach((item: any) => {
        if (item.category === 'Mass') {
          const unitKey = `${item.category}Unit.${item.unit}`;
          massUnits[unitKey] = item.symbol.toUpperCase();
        }
      });
      return massUnits;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.unitOfMeasures]);

  useEffect(() => {
    const lengthUnits = setLengthUnits();
    const massUnits = setMassUnits();
    setLengthUnitsState(lengthUnits || {});
    setMassUnitsState(massUnits || {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.unitOfMeasures]);

  return {
    lengthUnits,
    setLengthUnitsState,
    massUnits,
    setMassUnitsState,
    locationDetails
  };
}
