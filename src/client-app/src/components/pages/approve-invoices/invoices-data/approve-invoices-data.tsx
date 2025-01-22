import { useRef, useState } from 'react';
import {
  AgGridReact,
  DomLayout,
  faarrowsrotateclassicregular,
  FontAwesomeIcon,
  GrcButton,
  GrcGrid,
  gridOptions,
  IconProp
} from '@grc/ui-package';
import { useI18nState } from '../../../stores/settings/language-context';
import useApproveInvoices from '../useApproveInvoices';
import SendInvoiceForApproval from '../../common/send-for-approval';
import { isPagination } from '../../../data/data';

//Styles
import './invoices-data.scss';

export default function ApproveInvoicesData() {
  const { localeData } = useI18nState();
  const gridRef = useRef<AgGridReact>(null);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(true);
  const onSelectionChanged = () => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    setAreButtonsDisabled(selectedNodes?.length === 0);
  };
  const {
    isSendInvoicePopupVisible,
    setIsSendInvoicePopupVisible,
    isInCreation,
    setIsInvoiceCreation,
    invoiceDetailsStore,
    columnDefs
  } = useApproveInvoices();

  return (
    <>
      <div className="invoice-data-main-div mt-3">
        <div className="mb-2 d-flex justify-content-end">
          <GrcButton
            id="approve_invoice_reject_invoice_btn"
            text={localeData.RejectInvoice}
            className="btn-reject mr-2"
            disabled={areButtonsDisabled}
            onClick={() => {}}
          />
          <GrcButton
            id="send_for_approval_btn"
            text={localeData.SendForApproval}
            className="grc-btn-secondary"
            disabled={areButtonsDisabled}
            onClick={() => {}}
          />
          <GrcButton
            id="approve_invoice_approve_invoice_btn"
            text={localeData.ApproveInvoice}
            className="grc-btn-primary"
            disabled={areButtonsDisabled}
            onClick={() => {}}
          />
          <div className="refresh-icon ml-2" title="Refresh">
            <FontAwesomeIcon icon={faarrowsrotateclassicregular as IconProp} />
          </div>
        </div>
        <GrcGrid
          gridRef={gridRef}
          colDefs={columnDefs}
          gridOptions={{
            ...gridOptions,
            onSelectionChanged: onSelectionChanged
          }}
          domLayout={DomLayout.Normal}
          rowData={invoiceDetailsStore}
          isPagination={isPagination}
        />
      </div>
      {isSendInvoicePopupVisible && (
        <SendInvoiceForApproval
          isSendInvoicePopupVisible={isSendInvoicePopupVisible}
          setIsSendInvoicePopupVisible={setIsSendInvoicePopupVisible}
          isInCreation={isInCreation}
          setIsInvoiceCreation={setIsInvoiceCreation}
        />
      )}
    </>
  );
}
