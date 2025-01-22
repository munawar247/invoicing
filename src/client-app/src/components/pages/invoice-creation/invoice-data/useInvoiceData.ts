import { useState, useCallback } from 'react';
import { IOrdersRowDataItem } from './orders-data.interface';
import { invoiceTabsMenu } from '../../../data/data';

export default function useInvoiceData(
  onCheckboxSelected?: (arg0: boolean) => void
) {
  const [isOnHoldPopupVisible, setIsOnHoldPopupVisible] =
    useState<boolean>(false);
  const [selectedTabItem, setSelectedTabItem] = useState(invoiceTabsMenu[0]);
  const [onHoldData, setOnHoldData] = useState<IOrdersRowDataItem[]>([]);
  const [movetoHoldData, setMovetoHoldData] = useState<boolean>(false);
  const [invoiceHoldOrPreview, setInvoiceHoldOrPreview] =
    useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onSelectionChanged = useCallback(
    (args: any) => {
      if (args) {
        setSelectedTabItem(args?.selectedItem || args?.addedItems[0]);
      }
    },
    [setSelectedTabItem]
  );

  const selectionChanged = useCallback(
    (event: any) => {
      const selectedRows = event.api.getSelectedRows();
      setSelectedRows(selectedRows);
      if (selectedRows.length > 0 && onCheckboxSelected) {
        onCheckboxSelected(true);
      }
    },
    [onCheckboxSelected]
  );

  const handleTabChange = useCallback(
    (e: any) => {
      const selectedIndex = e.component.option('selectedIndex');
      setActiveTabIndex(selectedIndex);
    },
    [setActiveTabIndex]
  );

  return {
    selectedTabItem,
    setSelectedTabItem,
    onSelectionChanged,
    selectedRows,
    selectionChanged,
    onHoldData,
    movetoHoldData,
    setOnHoldData,
    setMovetoHoldData,
    setInvoiceHoldOrPreview,
    isOnHoldPopupVisible,
    setIsOnHoldPopupVisible,
    invoiceHoldOrPreview,
    activeTabIndex,
    setActiveTabIndex,
    handleTabChange
  };
}
