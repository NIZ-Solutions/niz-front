import { Route, Routes, useLocation } from "react-router-dom";
import Error from "../pages/Error";
import Main from "../main/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Mypage from "../pages/Mypage";
import Subscription from "../pages/Subscription";
import Complete from "../pages/Complete";
import Niz from "../landingpages/Niz";
import Loading from "../pages/Loading";
import SubscriptionLoading from "../pages/SubscriptionLoading";
import Analytics from "../api/ga4/setAnalytics";

export default function router() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  Analytics(location.pathname);

  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/loading" element={<Loading />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/subscription/loading" element={<SubscriptionLoading />} />
      <Route path="/subscription/complete" element={<Complete />} />
      <Route path="/landingpages/niz" element={<Niz />} />
    </Routes>
  );
}
