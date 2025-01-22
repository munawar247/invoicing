/* eslint-disable */
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetApiData } from '@grc/ui-utility';
import { I18nProvider } from '../../../stores/settings/language-context';
import InvoiceHistory from '../../invoice-history/invoice-history';
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

const waitForGetAccount = async (fetchData: jest.Mock) => {
  await waitFor(() => {
    expect(fetchData).toHaveBeenCalled();
    expect(fetchData).toHaveBeenCalledTimes(1);
  });
};

const account: any[] = [
  { id: 'dbc5fa4c-46c8-42b2-ab93-e9c519d753fd', accountName: 'Account 1' }
];

const mockFetchData = jest.fn();
beforeEach(() => {
  (useAuth0 as jest.Mock).mockReturnValue({
    getAccessTokenSilently: jest.fn().mockResolvedValue('test-token')
  });

  (useGetApiData as jest.Mock).mockReturnValue({
    fetchData: mockFetchData
  });
  mockFetchData.mockResolvedValue({ data: account });
});

afterEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = async () => {
  return render(
    <I18nProvider languageKey={languageKey}>
      <InvoiceHistory />
    </I18nProvider>
  );
};
describe('approve Invoice Component', () => {
  test('account mockFetchData', async () => {
    await renderComponent();
    await waitFor(async () => {
      waitForGetAccount(mockFetchData);
    });
  });

  test('renders  Invoice History Component Filters', async () => {
    await renderComponent();
    await waitFor(async () => {
      const accountLabel = screen.getAllByText(lang.Account);
      accountLabel.forEach(element => {
        expect(element).toBeInTheDocument();
      });
      const accountInputElement = screen.getByTestId(
        'account_select_invoice_history'
      );
      const accountSelectBox =
        within(accountInputElement).getByRole('combobox');
      fireEvent.change(accountSelectBox, {
        target: { value: 'Tesla' }
      });
      expect(accountSelectBox).toHaveValue('Tesla');
      expect(accountSelectBox).toBeInTheDocument();
      const billToLabel = screen.getAllByText(lang.BillTo);
      billToLabel.forEach(element => {
        expect(element).toBeInTheDocument();
      });
      const billToInputElement = screen.getByTestId(
        'bill_to_select_invoice_history'
      );
      const billToSelectBox = within(billToInputElement).getByRole('combobox');
      fireEvent.change(billToSelectBox, {
        target: { value: 'Tenant' }
      });
      expect(billToSelectBox).toHaveValue('Tenant');
      expect(billToSelectBox).toBeInTheDocument();
      const fromDateElement = screen.getByTestId('from_date_invoice_history');
      within(fromDateElement).getByRole('combobox');
      const fromDateLabel = screen.getByText(lang.FromDate);
      expect(fromDateLabel).toBeInTheDocument();

      const toDateElement = screen.getByTestId('to_date_invoice_history');
      within(toDateElement).getByRole('combobox');
      const toDateLabel = screen.getByText(lang.ToDate);
      expect(toDateLabel).toBeInTheDocument();

      const showInvoicesButton = screen.getByTestId(
        'invoice_history_btn_show_invoices'
      );
      expect(showInvoicesButton).toBeInTheDocument();

      const clearFilterButton = screen.getByTestId('invoice_history_btn_clear');
      expect(clearFilterButton).toBeInTheDocument();
    });
  });
});
/* eslint-disable */
