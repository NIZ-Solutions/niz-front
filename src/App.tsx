import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Modal from "./components/modal/ModalContainer";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import { store, persistor } from "./store/index";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./pages/Error";

function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Modal />
            <ScrollToTop />
            <Nav />
            <Router />
            <Footer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
