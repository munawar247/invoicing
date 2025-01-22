/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { Suspense } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetApiData } from '@grc/ui-utility';
import { I18nProvider } from '../../../stores/settings/language-context';
import ApproveInvoices from '../../approve-invoices';
import { ApproveInvoicesProvider } from '../../../stores/approve-invoices/invoice-details-store';
import Loader from '../../../common/loader';
import en from '../../../i18n/en';
import es from '../../../i18n/es';

jest.mock('@auth0/auth0-react');
jest.mock('@grc/ui-utility');

const getLanguageData = (languageKey: string) => {
  switch (languageKey) {
    case 'es':
      return es;
    case 'en':
    default:
      return en;
  }
};

const languageKey = 'en';
const lang = getLanguageData(languageKey);

const invoiceDetails = {
  invoiceNo: 'INV1234',
  accountName: 'Tesla',
  requestDate: 'Jan 23,2024 14:20 EST',
  requestedBy: 'Maren Mango',
  location: 'U.S.',
  noOfCorrections: 20,
  noOfShipments: 40,
  totalAmount: 100.5
};

const mockFetchData = jest.fn();

beforeEach(() => {
  (useAuth0 as jest.Mock).mockReturnValue({
    getAccessTokenSilently: jest.fn().mockResolvedValue('test-token')
  });

  (useGetApiData as jest.Mock).mockReturnValue({
    fetchData: mockFetchData
  });
  mockFetchData.mockResolvedValue({ status: 200, data: [] });
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = async () => {
  return render(
    <MemoryRouter initialEntries={['/invoicing/approve']}>
      <I18nProvider languageKey={languageKey}>
        <Routes>
          <Route
            path="/invoicing/approve"
            element={
              <ApproveInvoicesProvider>
                <Suspense fallback={<Loader />}>
                  <ApproveInvoices />
                </Suspense>
              </ApproveInvoicesProvider>
            }
          />
        </Routes>
      </I18nProvider>
    </MemoryRouter>
  );
};
describe('approve Invoice Component', () => {
  test('renders approve Invoice Component', async () => {
    await renderComponent();
    await waitFor(async () => {
      const btnRejectInvoice = screen.getByTestId(
        'approve_invoice_reject_invoice_btn'
      );
      expect(btnRejectInvoice).toBeInTheDocument();

      const btnSendForApproval = screen.getByTestId('send_for_approval_btn');
      expect(btnSendForApproval).toBeInTheDocument();

      const btnApproveInvoice = screen.getByTestId(
        'approve_invoice_approve_invoice_btn'
      );
      expect(btnApproveInvoice).toBeInTheDocument();
      const btnRejectInvoiceText = screen.getAllByText(lang.RejectInvoice);
      btnRejectInvoiceText.forEach(element => {
        expect(element).toBeInTheDocument();
      });

      mockFetchData.mockResolvedValue({ status: 200, data: invoiceDetails });

      const requestedByColumnHeader = screen.getByRole('columnheader', {
        name: lang.RequestedBy
      });
      expect(requestedByColumnHeader).toBeInTheDocument();
      const locationColumnHeader = screen.getByRole('columnheader', {
        name: lang.Location
      });
      expect(locationColumnHeader).toBeInTheDocument();

      const totalAmountColumnHeader = screen.getByRole('columnheader', {
        name: lang.TotalAmount
      });
      expect(totalAmountColumnHeader).toBeInTheDocument();
    });
  });
});
