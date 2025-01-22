import { useState } from 'react';
import {
  GrcButton,
  GrcDateTimeFormat,
  GrcDateTimePickerWrapper,
  GrcPopup,
  GrcTextArea
} from '@grc/ui-package';
import { useI18nState } from '../../../../stores/settings/language-context';
import { OnHoldPopupVisible } from './on-hold-invoice-popup.interface';

import './on-hold-invoice-popup.scss';

export default function OnHoldInvoicePopup(props: OnHoldPopupVisible) {
  const { localeData } = useI18nState();
  const [holdDate, setHoldDate] = useState<string>('');
  const [holdReason, setHoldReason] = useState<string>('');

  return (
    <>
      <GrcPopup
        visible={props.isOnHoldPopupVisible}
        showTitle={true}
        showCloseButton={true}
        onHiding={() => {
          props.setIsOnHoldPopupVisible(false);
        }}
        title={localeData.MoveToHold}
      >
        <div className="row on-hold-invoice-popup-main-div">
          <div className="col">
            <label>{localeData.Reason}</label>
            <GrcTextArea
              placeholder="Write here"
              width="15.625rem"
              height="5rem"
              value={holdReason}
              onValueChange={e => {
                setHoldReason(e);
              }}
            />
          </div>
          <div className="mt-2">
            <label>{localeData.OnHoldUntil}</label>
            <GrcDateTimePickerWrapper
              id="pickup_and_delivery_closepickupdate_picker"
              type={GrcDateTimeFormat.Date}
              placeholder="MM-DD-YY"
              value={holdDate}
              onValueChange={e => {
                setHoldDate(e);
              }}
              width="15.625rem"
            />
          </div>
          <div className="d-flex justify-content-center gap-4 mt-2">
            <GrcButton
              text={localeData.Cancel}
              onClick={() => {
                props.setIsOnHoldPopupVisible(false);
                setHoldReason('');
                setHoldDate('');
              }}
              className="grc-btn-secondary-bordered"
            />
            <GrcButton
              text={localeData.Move}
              onClick={() => {
                props.setIsOnHoldPopupVisible(false);
                props.setIsHoldData(true);
                setHoldReason('');
                setHoldDate('');
              }}
              className="grc-btn-primary"
            />
          </div>
        </div>
      </GrcPopup>
    </>
  );
}
