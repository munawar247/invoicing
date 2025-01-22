export interface IHandlingUnit {
  handlingUnitId: string;
  handlingUnitTypeId: string;
  handlingUnitType: string;
  quantity: number;
  dimensions: IDimension;
  weight: number;
  isHazmat: boolean;
  isNonStackable: boolean;
  nmfc: string;
  nmfcClassId: string;
  nmfcClassName: string;
  huDescription: string;
}

export interface IDimension {
  length: number;
  height: number;
  width: number;
}
