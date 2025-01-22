import { ColDef } from '@grc/ui-package';
import { useI18nState } from '../../../../../../stores/settings/language-context';

export default function useProductDetails() {
  const { localeData } = useI18nState();
  const productDetailsColumnDefs: ColDef<any>[] = [
    {
      headerName: localeData.Name,
      field: 'productName',
      floatingFilter: false,
      flex: 1.2
    },
    {
      headerName: localeData.ProductNo,
      field: 'productNumber',
      floatingFilter: false
    },
    {
      headerName: localeData.Qty,
      field: 'quantity',
      floatingFilter: false,
      flex: 0.3
    },
    {
      headerName: localeData.InnerPackCode,
      field: 'innerPackCode',
      floatingFilter: false
    },
    {
      headerName: localeData.OuterPackCode,
      field: 'outerPackCode',
      floatingFilter: false
    },
    {
      headerName: localeData.ProductDescription,
      field: 'productDescription',
      floatingFilter: false,
      flex: 1.2
    }
  ];

  return {
    productDetailsColumnDefs
  };
}
