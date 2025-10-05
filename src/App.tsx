import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import { Provider } from "react-redux";
import Modal from "./components/modal/ModalContainer";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import store from "./store";

import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Nav />
        <Router />
        <Footer />
        <Modal />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
