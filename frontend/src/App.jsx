import { AuthProvider } from './components/context/AuthProvider';
import { ModalProvider } from './components/context/ModalProvider';
import { Provider } from "react-redux";
import store from "./components/Store/store";
import React, { Suspense, useEffect } from 'react';
import FullScreenLoader from './components/Pages/FullScreenLoader';
import axios from 'axios';
const AppRoutes = React.lazy(() => import('./components/Pages/routes/AppRoutes'));
function App() {
  useEffect(() => {
    axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true
    });
  }, []);
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
