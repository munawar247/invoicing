import { IProduct } from '../../../../../../models/invoice-creation/invoice-details-popup/details-tab/product.interface';

export interface IManageProductDetails {
  productDetails: IProduct[] | undefined;
}
