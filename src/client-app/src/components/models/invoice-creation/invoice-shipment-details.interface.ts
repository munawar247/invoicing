import { IAccessorial } from './invoice-details-popup/details-tab/accessorial.interface';
import { IShipmentDetails } from './invoice-details-popup/details-tab/details-tab.interface';
import { IHandlingUnit } from './invoice-details-popup/details-tab/handling-unit.interface';
import { IProductDetails } from './invoice-details-popup/details-tab/product-details.interface';
import { IReferenceAndDocuments } from './invoice-details-popup/details-tab/references-documents.interface';
import IChargeType from './invoice-details-popup/invoice-tab/chrage-type.interface';
import IInvoiceLocations from './invoice-details-popup/invoice-tab/invoice-locations.interface';
import IFilterDetails from './invoice-filters.interface';

export default interface IInvoiceShipmentDetails {
  shipmentDetails: IShipmentDetails[] | [];
  accessorialDetails: IAccessorial[];
  handlingUnitDetails: IHandlingUnit[];
  productDetails: IProductDetails[];
  referenceAndDocuments: IReferenceAndDocuments[];
  chargeDetails: IChargeType[];
  locationDetails: IInvoiceLocations;
  reasonCode: string;
  shipmentIds: string[];
  filterDetails: IFilterDetails;
}
