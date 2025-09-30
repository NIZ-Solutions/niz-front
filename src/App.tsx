import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Modal from "./components/modal/ModalContainer";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <section className="flex w-full min-w-[280px] flex-col justify-between text-black-000">
        <Nav />
        <Router />
        <Footer />
      </section>
      <Modal />
    </BrowserRouter>
  );
}

export default App;
