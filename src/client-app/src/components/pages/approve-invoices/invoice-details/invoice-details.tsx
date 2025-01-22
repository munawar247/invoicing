import { useLocation, useNavigate } from 'react-router';
import {
  faenvelopeclassicregular,
  falocationdotclassicregular,
  faphoneclassicregular,
  FontAwesomeIcon,
  GrcButton,
  IconProp
} from '@grc/ui-package';
import { convertToShortDate, formatAddress } from '@grc/ui-utility';
import { useI18nState } from '../../../stores/settings/language-context';
import { useAppState } from 'StoreApp/Store';
import UseInvoiceDetails from './useInvoiceDetails';
import useApproveInvoices from '../useApproveInvoices';
import SendInvoiceForApproval from '../../common/send-for-approval';
import GetShipmentDetails from '../shipment-details/shipment-details';
import GetInvoiceTotal from '../../common/invoices/invoice-charges-total/invoice-charges-total';
import { approveInvoicesUrl } from '../../../common/constants/url-constants';
import { amountToWords } from '../../../core/digits-to-words';
import GetShipmentsData from '../shipment-details/shipment-data';
import StaticDataIcon from '../../common/static-data-icon';
import LogoIcon from '../../../common/icons/logo-icon';
import {
  ChargesData,
  InvoiceData,
  sentForApprovalDetails
} from '../../../data/data';

//Styles
import './invoice-details.scss';

export default function GetInvoiceDetails() {
  const navigate = useNavigate();
  const { localeData } = useI18nState();
  const { tenantDetails } = useAppState();
  const { getAddressDetails, chargeDetails } = UseInvoiceDetails();
  const {
    mobileNumber: customerMobileNumber,
    emailAddress: customerEmail,
    tradingPartner: customerTradingPartner,
    careOfDetail: {
      name: customerCoName,
      email: customerCoEmail,
      mobile: customerCoMobileNumber
    }
  } = InvoiceData.customer;
  const {
    mobileNumber: billToMobileNumber,
    emailAddress: billToEmail,
    tradingPartner: billToTradingPartner,
    careOfDetail: {
      name: billToCoName,
      email: billToCoEmail,
      mobile: billToCoMobileNumber
    }
  } = InvoiceData.billTo;
  const { bankName, accountNo, branchName, swiftCode } =
    InvoiceData.bankDetails;
  const { thirdParty } = InvoiceData.thirdPartyDetail;
  const invoiceId = useLocation().state.invoiceId;
  const {
    isSendInvoicePopupVisible,
    setIsSendInvoicePopupVisible,
    isInCreation,
    setIsInvoiceCreation
  } = useApproveInvoices();

  return (
    <>
      <>
        <StaticDataIcon />
        <div className="container-fluid invoice-shipment-details-main-div mt-4">
          <div className="row">
            <div className="col-6">
              <LogoIcon />
            </div>
            <div className="col-6">
              <span className="invoice-title">{localeData.Invoice}</span>
            </div>
          </div>
          <div className="d-flex">
            <div className="col-5 from-card-body">
              <div className="grc-label">{localeData.From}</div>
              <div className="widget-title">
                {!!tenantDetails?.tenantDetails?.name &&
                  tenantDetails?.tenantDetails?.name}
              </div>
              <div className="mt-1 d-flex">
                <FontAwesomeIcon
                  icon={falocationdotclassicregular as IconProp}
                />
                {tenantDetails?.tenantDetails?.address && (
                  <span className="ml-2 grc-value">
                    {formatAddress(tenantDetails?.tenantDetails?.address)}
                  </span>
                )}
              </div>
              <div className="mt-1 d-flex ">
                <FontAwesomeIcon icon={faphoneclassicregular as IconProp} />
                <span className="ml-2 grc-value">
                  {!!tenantDetails?.tenantDetails?.phoneNumber &&
                    tenantDetails?.tenantDetails?.phoneNumber}
                </span>
              </div>
              <div className="mt-1">
                <FontAwesomeIcon icon={faenvelopeclassicregular as IconProp} />
                <span className="ml-2 grc-value">
                  {!!tenantDetails?.tenantDetails?.email &&
                    tenantDetails?.tenantDetails?.email}
                </span>
              </div>
            </div>
            <div className="col-7 mt-2 invoice-container">
              <div className="invoice-cols">
                <div className="grc-label">{localeData.InvoiceNumber}</div>
                <div className="grc-label">{localeData.InvoiceDate}</div>
                <div className="grc-label">{localeData.DueDate}</div>
                <div className="grc-label">{localeData.TotalDue}</div>
              </div>
              <div className="invoice-values">
                <div className="grc-label fw-bold">{invoiceId}</div>
                <div className="grc-label fw-bold">
                  {InvoiceData.invoiceDate instanceof Date &&
                    convertToShortDate(InvoiceData.invoiceDate)}
                </div>
                <div className="grc-label fw-bold">
                  {InvoiceData.dueDate instanceof Date &&
                    convertToShortDate(InvoiceData.dueDate)}
                </div>
                <div className="grc-label fw-bold">
                  {`USD ${chargeDetails()}`}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="col-12 customer-bill-div">
              <div className="p-2 customer-div">
                <div className="grc-label">{localeData.Customer}</div>
                <div className="fw-bold">{customerTradingPartner}</div>
                <div className="grc-value">
                  {getAddressDetails(InvoiceData.customer.addressDetail)}
                </div>
                <div className="grc-value">
                  {customerMobileNumber}
                  <label className="mr-1 ml-1">|</label>
                  {customerEmail}
                </div>
                <div className="fw-bold">{customerCoName}</div>
                <div className="grc-value">
                  {customerCoMobileNumber}
                  <label className="mr-1 ml-1">|</label>
                  {customerCoEmail}
                </div>
              </div>
              <div
                className="p-2 billTo-div"
                data-testid="invoice_details_billTo"
              >
                <div className="grc-label">{localeData.BillTo}</div>
                <div className="fw-bold">{billToTradingPartner}</div>
                <div className="grc-value">
                  {getAddressDetails(InvoiceData.billTo.addressDetail)}
                </div>
                <div className="grc-value">
                  {billToMobileNumber}
                  <label className="mr-1 ml-1">|</label>
                  {billToEmail}
                </div>
                <div className="fw-bold">{billToCoName}</div>
                <div className="grc-value">
                  {billToCoMobileNumber}
                  <label className="mr-1 ml-1">|</label>
                  {billToCoEmail}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <GetShipmentsData invoiceId={invoiceId} />
          </div>
          <div className="row mt-4">
            <div className="bank-comments-ref-div col-5">
              <div className="bank-details-div">
                <div className="grc-label">{localeData.BankDetails}</div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex-column">
                    <div className="d-flex">
                      <div className="grc-label">{localeData.BankName} :</div>
                      <div className="ml-2 fw-bold">{bankName}</div>
                    </div>
                    <div className="d-flex">
                      <div className="grc-label">{localeData.BranchName} :</div>
                      <div className="ml-2 fw-bold">{branchName}</div>
                    </div>
                  </div>
                  <div className="d-flex-column">
                    <div className="d-flex">
                      <div className="grc-label">{localeData.AccountNo} :</div>
                      <div className="ml-2 fw-bold">{accountNo}</div>
                    </div>
                    <div className="d-flex">
                      <div className="grc-label">{localeData.SwiftCode} :</div>
                      <div className="ml-2 fw-bold">{swiftCode}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-grid comments-div">
                <label className="grc-label">{localeData.Comments}</label>
                <label className="grc-value">{localeData.Thanks}</label>
              </div>
              <div className="d-grid ref-div">
                <label className="grc-label">{localeData.Reference}</label>
                <label className="grc-text-link mb-4">
                  {localeData.ChargeContract}
                </label>
              </div>
            </div>
            <div className="d-grid payment-terms-div col-3">
              <label className="grc-label">{localeData.PaymentTerms}</label>
              <label className="fw-bold">{thirdParty}</label>
            </div>
            <div className="col-4">
              <GetInvoiceTotal chargeDetails={ChargesData} />
            </div>
          </div>
          <div
            className="row approval-div"
            data-testid="invoice_details_sent_approval"
          >
            <div className="col-8 grc-label">
              <label className="mr-1">{localeData.SentForApprovalOn}</label>
              <label className="mr-1 fw-bold">
                {sentForApprovalDetails.requestedDate}
              </label>
              <label className="mr-1">{localeData.By}</label>
              <label className="fw-bold">
                {sentForApprovalDetails.requestedBy}
              </label>
            </div>
            <div className="d-grid col-4 words-div">
              <label className="grc-value">{localeData.TotalDueWords}</label>
              <label className="grc-label">
                {amountToWords(ChargesData.total)}
              </label>
            </div>
          </div>
          <hr />
          <GetShipmentDetails />
        </div>
        <div className="invoice-details-static-btns">
          <div className="btn-div mt-2">
            <GrcButton
              id="invoice_details_btn_reject_invoice"
              text={localeData.RejectInvoice}
              className="btn-reject mr-4"
              onClick={() => {
                navigate(approveInvoicesUrl, {
                  state: {
                    breadCrumbLinks: [
                      {
                        title: localeData.ApproveInvoices
                      }
                    ]
                  }
                });
                document.body.classList.remove('no-scroll');
              }}
            />
            <GrcButton
              text="Send for Approval"
              className="btn-reject-all"
              onClick={() => {
                setIsSendInvoicePopupVisible(true);
                setIsInvoiceCreation(false);
              }}
            />
            <GrcButton
              id="invoice_details_btn_approve_invoice"
              text={localeData.ApproveInvoice}
              className="grc-btn-primary"
              onClick={() => {
                navigate(approveInvoicesUrl, {
                  state: {
                    breadCrumbLinks: [
                      {
                        title: localeData.ApproveInvoices
                      }
                    ]
                  }
                });
              }}
            />
          </div>
        </div>
      </>
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
