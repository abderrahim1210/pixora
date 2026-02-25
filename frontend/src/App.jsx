import { AuthProvider } from './components/context/AuthProvider';
import { ModalProvider } from './components/context/ModalProvider';
import { Provider } from "react-redux";
import store from "./components/Store/store";
import React, { Suspense } from 'react';
import FullScreenLoader from './components/Pages/FullScreenLoader';
const AppRoutes = React.lazy(() => import('./components/Pages/routes/AppRoutes'));
function App() {

  return (
    <Provider store={store}>
      <AuthProvider>
        <ModalProvider>
          <Suspense fallback={<FullScreenLoader />}>
            <AppRoutes />
          </Suspense>
        </ModalProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App
