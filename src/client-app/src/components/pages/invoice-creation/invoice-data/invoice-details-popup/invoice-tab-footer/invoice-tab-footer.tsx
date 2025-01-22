import { GrcButton, GrcButtonType } from '@grc/ui-package';
import { useI18nState } from '../../../../../stores/settings/language-context';
import { params } from './invoice-tab-footer.interface';

//Styles
import './invoice-tab-footer.scss';

export default function InvoiceTabFooter({ setShowPopup }: params) {
  const { localeData } = useI18nState();

  return (
    <>
      <div className="row tab-footer-main-div">
        <div className="d-flex justify-content-end my-3 m-3">
          <div className="grc-action-card">
            <GrcButton
              id="clear_button_create_transport_footer"
              text={localeData.Cancel}
              onClick={() => {
                setShowPopup(false);
              }}
              type={GrcButtonType.Normal}
            />
            <GrcButton
              id="save_button_create_transport_footer"
              type={GrcButtonType.Default}
              text={localeData.Save}
              className="grc-btn-primary"
              onClick={() => {
                setShowPopup(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
