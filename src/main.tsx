import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { LandingPage } from '@/pages/LandingPage'
import { MedScribeDemo } from '@/pages/MedScribeDemo'
import { SortioDemo } from '@/pages/SortioDemo'
import { CloudClinicDemo } from '@/pages/CloudClinicDemo'
import { AnalyticsDemo } from '@/pages/AnalyticsDemo'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/medscribe",
    element: <MedScribeDemo />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/sortio",
    element: <SortioDemo />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/cloudclinic",
    element: <CloudClinicDemo />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/analytics",
    element: <AnalyticsDemo />,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </QueryClientProvider>
      </HelmetProvider>
    </I18nextProvider>
  </StrictMode>,
)