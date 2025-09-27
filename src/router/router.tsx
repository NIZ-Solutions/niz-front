import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import Main from "../main/Main";

export default function router() {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
