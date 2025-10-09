import { Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import Main from "../main/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Mypage from "../pages/Mypage";
import Subscription from "../pages/Subscription";
import Complete from "../pages/Complete";
import Niz from "../landingpages/Niz";
import Loading from "../pages/Loading";

export default function router() {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/loading" element={<Loading />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/subscription/complete" element={<Complete />} />
      <Route path="/landingpages/niz" element={<Niz />} />
    </Routes>
  );
}
