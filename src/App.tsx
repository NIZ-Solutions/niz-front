import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Modal from "./components/modal/ModalContainer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <section className="relative flex h-svh w-full min-w-[330px] flex-col items-center justify-between">
        <Router />
      </section>
      <Modal />
    </BrowserRouter>
  );
}

export default App;
