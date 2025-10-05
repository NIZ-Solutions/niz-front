import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Modal from "./components/modal/ModalContainer";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Router />
      <Footer />
      <Modal />
    </BrowserRouter>
  );
}

export default App;
