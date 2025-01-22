import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  GrcButton,
  GrcTagBox,
  GrcPopup,
  FontAwesomeIcon,
  IconProp,
  fapaperplaneclassicregular
} from '@grc/ui-package';
import { useI18nState } from '../../../stores/settings/language-context';
import { IProps } from './send-for-approval-popup.interface';
import {
  approveInvoicesUrl,
  invoiceCreateUrl
} from '../../../common/constants/url-constants';
import { emailData } from '../../../data/data';

//Styles
import './send-for-approval-popup.scss';

export default function SendInvoiceForApproval(props: IProps) {
  const navigate = useNavigate();
  const { localeData } = useI18nState();
  const [selectedEmails, setSelectedEmails] = useState<any[]>([]);

  return (
    <>
      <GrcPopup
        visible={props.isSendInvoicePopupVisible}
        onHiding={() => {
          props.setIsSendInvoicePopupVisible(false);
        }}
        dragEnabled={false}
        hideOnOutsideClick={false}
        showCloseButton={true}
        showTitle={true}
        width="25rem"
        height="18rem"
      >
        <div className="send-for-approval-popup-main-div">
          <div className="invoice-send-text">
            <FontAwesomeIcon
              icon={fapaperplaneclassicregular as IconProp}
              className="send-icon"
            />
          </div>
          <div className="widget-title invoice-send-text">
            {localeData.ApproverEmail}
          </div>
          <div className="grc-label mr-2 mt-2">{localeData.Approver}</div>
          <div>
            <GrcTagBox
              id="account_data_invoice_filter_card"
              items={emailData}
              searchEnabled={true}
              displayExpr="name"
              valueExpr="id"
              showSelectionControls={true}
              placeholder="Select"
              onValueChanged={e => setSelectedEmails(e.value)}
            />
          </div>
          <div>
            <GrcButton
              text={localeData.Send}
              className="grc-btn-primary"
              disabled={selectedEmails.length === 0}
              onClick={() => {
                props.setIsSendInvoicePopupVisible(false);
                if (props.isInCreation) {
                  navigate(invoiceCreateUrl, {
                    state: {
                      breadCrumbLinks: [
                        {
                          title: localeData.InvoiceCreation
                        }
                      ]
                    }
                  });
                } else {
                  navigate(approveInvoicesUrl, {
                    state: {
                      breadCrumbLinks: [
                        {
                          title: localeData.ApproveInvoices
                        }
                      ]
                    }
                  });
                }
              }}
            />
          </div>
        </div>
      </GrcPopup>
    </>
  );
}
