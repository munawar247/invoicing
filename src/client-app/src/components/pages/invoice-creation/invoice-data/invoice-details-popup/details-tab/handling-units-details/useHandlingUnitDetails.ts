import { useMemo, useState } from 'react';
import { ColDef } from '@grc/ui-package';
import { useI18nState } from '../../../../../../stores/settings/language-context';
import { IManageHandlingUnitDetails } from './handling-unit-details.interface';

export default function useHandlingUnitDetails(
  props: IManageHandlingUnitDetails
) {
  const [weightUnit, setWeightUnitSymbol] = useState<string>('');
  const { localeData } = useI18nState();
  const handleUnitDetailsColumnDefs: ColDef<any>[] = [
    {
      headerName: localeData.HUType,
      field: 'handlingUnitType',
      floatingFilter: false
    },
    {
      headerName: localeData.Qty,
      field: 'quantity',
      floatingFilter: false,
      flex: 0.5
    },
    {
      headerName: `${localeData.Dimensions}(LxWxH)`,
      field: 'dimension',
      flex: 1.5,
      floatingFilter: false,
      valueGetter: (params: any) => {
        if (!!params.data.dimensions) {
          const { length, width, height, diameter, shape } =
            params.data.dimensions;

          if (shape === 1) {
            const lengthUnit = params.data.dimensions.length.Unit;
            const lengthUnitSymbol = props.lengthUnits[lengthUnit] || '';

            if (length?.Value && width?.Value && height?.Value) {
              return `${lengthUnitSymbol} L ${length.Value} x W ${width.Value} x H ${height.Value}`;
            } else return '-';
          } else if (shape === 2) {
            const lengthUnit = params.data.dimensions.length.Unit;
            const lengthUnitSymbol = props.lengthUnits[lengthUnit] || '';

            if (diameter?.Value && length?.Value) {
              return `${lengthUnitSymbol} D ${diameter.Value} x L ${length.Value}`;
            } else return '-';
          }
        }
        return '-';
      }
    },
    {
      headerName: localeData.Weight,
      field: 'weight',
      floatingFilter: false,
      valueGetter: (params: any) => {
        if (!!params.data.weight.Value) {
          const weightUnit = params.data.weight.Unit;
          const weightUnitSymbol = props.massUnits[weightUnit] || '';
          setWeightUnitSymbol(weightUnitSymbol.toUpperCase());
          return `${weightUnitSymbol}  ${params.data.weight.Value}`;
        }
        return '-';
      }
    },
    {
      headerName: localeData.NMFC,
      field: 'nmfc',
      floatingFilter: false
    },
    {
      headerName: localeData.NMFCclass,
      field: 'nmfcClassName',
      floatingFilter: false
    },
    {
      headerName: localeData.Type,
      floatingFilter: false,
      valueGetter: (params: any) => {
        if (params.data.isHazmat && params.data.isNonStackable) {
          return `${localeData.Hazmat}, ${localeData.NonStackable}`;
        } else if (params.data.isHazmat) {
          return localeData.Hazmat;
        } else if (params.data.isNonStackable) {
          return localeData.NonStackable;
        } else return '-';
      }
    }
  ];

  const totalQty = useMemo(() => {
    return props.handlingUnitDetails?.reduce(
      (acc, itm) => acc + itm.quantity,
      0
    );
  }, [props.handlingUnitDetails]);

  const totalWeight = useMemo(() => {
    return props.handlingUnitDetails?.reduce(
      (acc, itm) => acc + itm.weight.Value,
      0
    );
  }, [props.handlingUnitDetails]);

  return {
    handleUnitDetailsColumnDefs,
    totalQty,
    totalWeight,
    weightUnit
  };
}
