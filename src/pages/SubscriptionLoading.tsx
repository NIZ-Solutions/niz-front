import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useDispatch";
import { login } from "../store/userSlice";
import { useEffect } from "react";

export default function SubscriptionLoading() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const urlSearch = new URLSearchParams(window.location.search);
  const paymentId = urlSearch.get("paymentId");
  const errorMessage = urlSearch.get("message");
  useEffect(() => {
    navigate("/subscription/complete");
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-20 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-black-000">
          잠시만 기다려주세요
        </h2>
        <div className="dots-container">
          <div className="dot main-gradient"></div>
          <div className="dot main-gradient"></div>
          <div className="dot main-gradient"></div>
        </div>
        <button className="rounded-lg px-4 py-2 text-white transition main-gradient">
          Processing...
        </button>
      </div>
    </>
  );
}
