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

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Modal />
        <BrowserRouter>
          <ScrollToTop />
          <Nav />
          <Router />
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
