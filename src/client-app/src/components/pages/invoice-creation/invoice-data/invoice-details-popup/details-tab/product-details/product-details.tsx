import { useRef } from 'react';
import { AgGridReact, GrcGrid, gridOptions, DomLayout } from '@grc/ui-package';
import { useI18nState } from '../../../../../../stores/settings/language-context';
import useProductDetails from './useProductDetails';
import { IManageProductDetails } from './product-details.interface';

//Styles
import './product-details.scss';

export default function ProductDetails(props: IManageProductDetails) {
  const gridRef = useRef<AgGridReact>(null);
  const { localeData } = useI18nState();
  const { productDetailsColumnDefs } = useProductDetails();

  return (
    <>
      <label className="grc-card-title">{localeData.ProductDetails}</label>
      <div className="main-product-unit-div p-2 pt-2 product-grid-height grc-grid-no-col-filters">
        <GrcGrid
          gridRef={gridRef}
          gridOptions={gridOptions}
          colDefs={productDetailsColumnDefs}
          domLayout={DomLayout.AutoHeight}
          rowData={props.productDetails}
        />
      </div>
    </>
  );
}
