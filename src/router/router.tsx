import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import Main from "../main/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function router() {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
