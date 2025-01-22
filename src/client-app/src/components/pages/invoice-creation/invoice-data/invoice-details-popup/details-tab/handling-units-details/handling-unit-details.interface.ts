import { HandlingUnit } from '../../../../../../models/invoice-creation/invoice-details-popup/details-tab/details-tab.interface';

export interface IManageHandlingUnitDetails {
  handlingUnitDetails: HandlingUnit[] | undefined;
  lengthUnits: { [key: string]: string };
  massUnits: { [key: string]: string };
}
