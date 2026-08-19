import { AuthProvider } from './components/context/AuthProvider';
import { ModalProvider } from './components/context/ModalProvider';
import { Provider } from "react-redux";
import store from "./components/Store/store";
import React, { Suspense, useEffect } from 'react';
import axios from 'axios';
import Spinner from './components/Pages/Spinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './components/context/ThemeProvider';
import { Toaster } from 'sonner';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const AppRoutes = React.lazy(() => import('./components/routes/AppRoutes'));
const queryClient = new QueryClient();
function App() {
  const initilaOptions = {
    'client-id': 'AYIfLgtwBF1H2eHIyHiwFq5QLa6iiC_CrJzos2FeVx3Vwn8rhj8a59l6FS5fn7XdLTG1gTrC5CLjDQFZ',
    currency: 'USD',
    intent: 'capture'
  };
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider>
            <AuthProvider>
              <ModalProvider>
                <Suspense fallback={<Spinner />}>
                  <PayPalScriptProvider options={initilaOptions}>
                    <AppRoutes />
                  </PayPalScriptProvider>
                  <Toaster position='top-center' />
                </Suspense>
              </ModalProvider>
            </AuthProvider>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
