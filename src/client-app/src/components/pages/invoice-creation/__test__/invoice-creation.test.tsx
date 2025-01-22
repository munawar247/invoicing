/* eslint-disable */
import { Suspense } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
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
import { ReadyToInvoiceProvider } from '../../../stores/ready-to-invoice/ready-to-invoice-store';
import { InvoiceChargeDetailsProvider } from '../../../stores/invoice-charge-details/invoice-charge-details-store';
import InvoiceCreation from '../invoice-creation';
import ReadyToInvoices from '../invoice-data/ready-to-invoices';
import NotReadyToInvoices from '../invoice-data/not-ready-to-invoices';
import InvoiceDetailsPopup from '../invoice-data/invoice-details-popup';
import InvoiceLocationsDetails from '../invoice-data/invoice-details-popup/invoices-tab/invoice-locations';
import ChargeTypes from '../invoice-data/invoice-details-popup/invoices-tab/charge-types';
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
const mockSetInvoiceHoldOrPreview = jest.fn();
const mockSetOnHoldData = jest.fn();

const waitForGetAccount = async (fetchData: jest.Mock) => {
  await waitFor(() => {
    expect(fetchData).toHaveBeenCalled();
    expect(fetchData).toHaveBeenCalledTimes(1);
  });
};
const renderComponent = async () => {
  return render(
    <MemoryRouter initialEntries={['/invoicing/create']}>
      <I18nProvider languageKey={languageKey}>
        <Routes>
          <Route
            path="/invoicing/create"
            element={
              <Suspense fallback={<Loader />}>
                <InvoiceChargeDetailsProvider>
                  <InvoiceCreation />
                </InvoiceChargeDetailsProvider>
              </Suspense>
            }
          />
        </Routes>
      </I18nProvider>
    </MemoryRouter>
  );
};

const renderNotReadyToInvoicesComponent = async () => {
  return render(
    <I18nProvider languageKey={languageKey}>
      <InvoiceChargeDetailsProvider>
        <NotReadyToInvoices />
      </InvoiceChargeDetailsProvider>
    </I18nProvider>
  );
};
const renderInvoiceDetailsPopupComponent = async () => {
  return render(
    <I18nProvider languageKey={languageKey}>
      <InvoiceDetailsPopup />
    </I18nProvider>
  );
};
const renderInvoicePopupInvoicesTabComponent = async () => {
  return render(
    <I18nProvider languageKey={languageKey}>
      <InvoiceChargeDetailsProvider>
        <InvoiceLocationsDetails
          shipments={undefined}
          billTo={undefined}
          customer={undefined}
          unitOfMeasures={undefined}
        />
      </InvoiceChargeDetailsProvider>
    </I18nProvider>
  );
};
const renderChargeTypesComponent = async () => {
  return render(
    <I18nProvider languageKey={languageKey}>
      <InvoiceChargeDetailsProvider>
        <ChargeTypes />
      </InvoiceChargeDetailsProvider>
    </I18nProvider>
  );
};
const renderReadyToInvoicesComponent = async () => {
  return render(
    <I18nProvider languageKey={languageKey}>
      <InvoiceChargeDetailsProvider>
        <ReadyToInvoiceProvider>
          <ReadyToInvoices
            setInvoiceHoldOrPreview={mockSetInvoiceHoldOrPreview}
            setOnHoldInvoiceData={mockSetOnHoldData}
          />
        </ReadyToInvoiceProvider>
      </InvoiceChargeDetailsProvider>
    </I18nProvider>
  );
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

describe('rendering invoice creation', () => {
  test('account mockFetchData', async () => {
    await renderComponent();
    await waitFor(async () => {
      waitForGetAccount(mockFetchData);
    });
  });

  test('renders InvoiceCreation page', async () => {
    await renderComponent();
    await waitFor(async () => {
      const accountLabel = screen.getByText(lang.Account);
      expect(accountLabel).toBeInTheDocument();
      const accountInputElement = screen.getByTestId(
        'account_data_invoice_filter_card'
      );
      const accountSelectBox =
        within(accountInputElement).getByRole('combobox');
      fireEvent.change(accountSelectBox, {
        target: { value: 'Tesla' }
      });
      expect(accountSelectBox).toHaveValue('Tesla');
      expect(accountSelectBox).toBeInTheDocument();
      const billToLabel = screen.getByText(lang.BillTo);
      expect(billToLabel).toBeInTheDocument();

      const billToInputElement = screen.getByTestId(
        'bill_to_location_data_invoice_filter_card'
      );
      const billToSelectBox = within(billToInputElement).getByRole('combobox');
      fireEvent.change(billToSelectBox, {
        target: { value: 'Tenant' }
      });
      expect(billToSelectBox).toHaveValue('Tenant');
      expect(billToSelectBox).toBeInTheDocument();
      const locationLabel = screen.getByText(lang.Location);
      expect(locationLabel).toBeInTheDocument();
      const locationInputElement = screen.getByTestId(
        'add_location_tagBox_filter_card'
      );
      const locationSelectBox =
        within(locationInputElement).getByRole('combobox');
      fireEvent.change(locationSelectBox, {
        target: { value: 'usa' }
      });
      expect(locationSelectBox).toHaveValue('usa');
      expect(locationSelectBox).toBeInTheDocument();
      const fromDateElement = screen.getByTestId(
        'from_date_invoice_filter_card'
      );
      within(fromDateElement).getByRole('combobox');
      const fromDateLabel = screen.getByText(lang.ShpCreationFromDate);
      expect(fromDateLabel).toBeInTheDocument();
      const toDateElement = screen.getByTestId('from_date_invoice_filter_card');
      within(toDateElement).getByRole('combobox');
      const toDateLabel = screen.getByText(lang.ShpCreationToDate);
      expect(toDateLabel).toBeInTheDocument();
      const formElement = screen.getByTestId('invoice_filter_buttons');
      expect(formElement).toBeInTheDocument();
      const FilterDataClearButton = screen.getByTestId(
        'invoice_data_btn_clear'
      );
      expect(FilterDataClearButton).toBeInTheDocument();
      const FilterDataShowShipmentsButton = screen.getByTestId(
        'invoice_data_btn_show_shipments'
      );
      expect(FilterDataShowShipmentsButton).toBeInTheDocument();
    });
  });

  test('renders Invoice Popup Invoices Tab Component', async () => {
    await renderInvoicePopupInvoicesTabComponent();
    await waitFor(async () => {
      const BillToDetailsLabel = screen.getByText(lang.BillToDetails);
      expect(BillToDetailsLabel).toBeInTheDocument();
      const shipperDetailsLabel = screen.getByText(lang.ShipperDetails);
      expect(shipperDetailsLabel).toBeInTheDocument();
      const consigneeDetailsLabel = screen.getByText(lang.ConsigneeDetails);
      expect(consigneeDetailsLabel).toBeInTheDocument();
    });
  });

  test('renders Invoice Details Popup', async () => {
    await renderInvoiceDetailsPopupComponent();

    await waitFor(async () => {
      const invoiceDetailsPopupId = screen.getByTestId(
        'invoice_charge_details_popup'
      );
      expect(invoiceDetailsPopupId).toBeInTheDocument();
      const invoiceDetailsPopup = screen.getByRole('dialog', {});
      expect(invoiceDetailsPopup).toBeInTheDocument();
    });
  });

  test('renders Not Ready To Invoices GridComponent', async () => {
    await renderNotReadyToInvoicesComponent();
    await waitFor(async () => {
      const readyToInvoiceGridInput = screen.getByTestId(
        'not_ready_to_invoice_grid'
      );
      expect(readyToInvoiceGridInput).toBeInTheDocument();
      const shipmentNoColumnHeader = screen.getByRole('columnheader', {
        name: 'Shipment No'
      });
      expect(shipmentNoColumnHeader).toBeInTheDocument();
      const exceptionReasonColumnHeader = screen.getByRole('columnheader', {
        name: 'Exception Reason'
      });
      expect(exceptionReasonColumnHeader).toBeInTheDocument();
      const modeColumnHeader = screen.getByRole('columnheader', {
        name: 'Mode'
      });
      expect(modeColumnHeader).toBeInTheDocument();
      const createdDateColumnHeader = screen.getByRole('columnheader', {
        name: 'Created Date'
      });
      expect(createdDateColumnHeader).toBeInTheDocument();
      const actionColumnHeader = screen.getByRole('columnheader', {
        name: 'Actions'
      });
      expect(actionColumnHeader).toBeInTheDocument();
    });
  });

  test('renders renderReadyToInvoicesGridComponent', async () => {
    await renderReadyToInvoicesComponent();

    await waitFor(async () => {
      const readyToInvoiceGridInput = screen.getByTestId(
        'ready_to_invoice_grid'
      );
      expect(readyToInvoiceGridInput).toBeInTheDocument();
      const shipmentIDColumnHeader = screen.getByRole('columnheader', {
        name: lang.ShpID
      });
      expect(shipmentIDColumnHeader).toBeInTheDocument();
      const chargeColumnHeader = screen.getByRole('columnheader', {
        name: `${lang.Charge} ($)`
      });
      expect(chargeColumnHeader).toBeInTheDocument();

      const OriginColumnHeader = screen.getByRole('columnheader', {
        name: lang.Origin
      });
      expect(OriginColumnHeader).toBeInTheDocument();
      const destinationColumnHeader = screen.getByRole('columnheader', {
        name: lang.Destination
      });
      expect(destinationColumnHeader).toBeInTheDocument();
      const shipmentDateColumnHeader = screen.getByRole('columnheader', {
        name: lang.ShpCreationDate
      });
      expect(shipmentDateColumnHeader).toBeInTheDocument();
    });
  });

  test('renders ChargeTypesComponent', async () => {
    await renderChargeTypesComponent();
    await waitFor(async () => {
      const chargeTypeColumnHeader = screen.getByRole('columnheader', {
        name: 'Charge Type'
      });
      expect(chargeTypeColumnHeader).toBeInTheDocument();
      const costsColumnHeader = screen.getByRole('columnheader', {
        name: 'Costs (USD)'
      });
      expect(costsColumnHeader).toBeInTheDocument();
      const chargeColumnHeader = screen.getByRole('columnheader', {
        name: 'Charge (USD)'
      });
      expect(chargeColumnHeader).toBeInTheDocument();
    });
  });
});
/* eslint-disable */
