import { BrowserRouter, useLocation } from "react-router-dom";
import Router from "./router/router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Modal from "./components/modal/ModalContainer";
import Nav from "./components/layout/Nav";
import { store, persistor } from "./store/index";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./pages/Error";
import BackgroundPortal from "./components/BackgroundLayerPortal";

function App() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
              edgeMode="duplicate"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
            <feGaussianBlur in="gooblend" stdDeviation="40" result="final" />
            <feBlend in="final" in2="final" />
          </filter>
        </defs>
      </svg>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary fallback={<Error />}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Nav />
              <Modal />
              <BackgroundPortal />
              <Router />
            </PersistGate>
          </Provider>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
