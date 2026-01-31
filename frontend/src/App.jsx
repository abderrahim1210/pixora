import { AppRoutes } from './components/Pages/routes/AppRoutes'
import { AuthProvider } from './components/context/AuthProvider';
import { ModalProvider } from './components/context/ModalProvider';
import { Provider } from "react-redux";
import  store  from "./components/Store/store";
function App() {

  return (
    <Provider store={store}>
      <AuthProvider>
        <ModalProvider>
          <AppRoutes />
        </ModalProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App
