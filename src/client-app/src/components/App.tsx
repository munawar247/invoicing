import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import ErrorBoundary from './pages/error-boundary/error-boundary';
import { useAppState } from 'StoreApp/Store';
import { I18nProvider } from './stores/settings/language-context';
import { InvoiceChargeDetailsProvider } from './stores/invoice-charge-details/invoice-charge-details-store';
import { ApproveInvoicesProvider } from './stores/approve-invoices/invoice-details-store';
import Loader from './common/loader';

//Styles
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App() {
  const { language } = useAppState();
  const [languageKey, setLanguageKey] = useState('en');

  useEffect(() => {
    setLanguageKey(language.selectedLanguage);
  }, [language]);

  // lazy loading components
  const InvoiceCreation = React.lazy(() => import('./pages/invoice-creation'));
  const InvoiceHistory = React.lazy(() => import('./pages/invoice-history'));
  const ApproveInvoices = React.lazy(() => import('./pages/approve-invoices'));
  const GetInvoiceDetails = React.lazy(
    () => import('./pages/approve-invoices/invoice-details')
  );
  const ViewAllShipmentsData = React.lazy(
    () => import('./pages/invoice-creation/invoice-data/all-shipment-details')
  );

  return (
    <>
      <ErrorBoundary componentName="invoices">
        <I18nProvider languageKey={languageKey}>
          <Routes>
            <Route
              path="/create"
              element={
                <InvoiceChargeDetailsProvider>
                  <Suspense fallback={<Loader />}>
                    <InvoiceCreation />
                  </Suspense>
                </InvoiceChargeDetailsProvider>
              }
            />
            <Route
              path="/preview"
              element={
                <InvoiceChargeDetailsProvider>
                  <Suspense fallback={<Loader />}>
                    <ViewAllShipmentsData />
                  </Suspense>
                </InvoiceChargeDetailsProvider>
              }
            />
            <Route
              path="/history"
              element={
                <InvoiceChargeDetailsProvider>
                  <Suspense fallback={<Loader />}>
                    <InvoiceHistory />
                  </Suspense>
                </InvoiceChargeDetailsProvider>
              }
            />
            <Route
              path="/approve"
              element={
                <ApproveInvoicesProvider>
                  <Suspense fallback={<Loader />}>
                    <ApproveInvoices />
                  </Suspense>
                </ApproveInvoicesProvider>
              }
            />
            <Route
              path="/details"
              element={
                <ApproveInvoicesProvider>
                  <Suspense fallback={<Loader />}>
                    <GetInvoiceDetails />
                  </Suspense>
                </ApproveInvoicesProvider>
              }
            />
          </Routes>
        </I18nProvider>
      </ErrorBoundary>
    </>
  );
}
