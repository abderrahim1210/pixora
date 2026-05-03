import { AuthProvider } from './components/context/AuthProvider';
import { ModalProvider } from './components/context/ModalProvider';
import { Provider } from "react-redux";
import store from "./components/Store/store";
import React, { Suspense, useEffect } from 'react';
import axios from 'axios';
import Spinner from './components/Pages/Spinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './components/context/ThemeProvider';
const AppRoutes = React.lazy(() => import('./components/routes/AppRoutes'));
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider>
            <AuthProvider>
              <ModalProvider>
                <Suspense fallback={<Spinner />}>
                  <AppRoutes />
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
