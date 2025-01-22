import { useNavigate } from 'react-router';
import { useI18nState } from '../../../stores/settings/language-context';
import {
  approveInvoicesUrl,
  invoiceDetailsUrl
} from '../../../common/constants/url-constants';

const InvoiceNoRenderer: React.FC<{ value: any }> = ({ value }) => {
  const navigate = useNavigate();
  const { localeData } = useI18nState();

  const handleClick = () => {
    navigate(invoiceDetailsUrl, {
      state: {
        invoiceId: value.invoiceNo,
        breadCrumbLinks: [
          {
            title: localeData.ApproveInvoices,
            path: approveInvoicesUrl
          },
          {
            title: value.invoiceNo
          }
        ]
      }
    });
  };

  return (
    <span onClick={handleClick} className="grc-text-link text-decoration-none">
      {value.invoiceNo}
    </span>
  );
};

export default InvoiceNoRenderer;
