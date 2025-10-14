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
    <BrowserRouter>
      <ErrorBoundary fallback={<Error />}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Modal />
            <ScrollToTop />
            <Nav />
            <Router />
            <Footer />
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
