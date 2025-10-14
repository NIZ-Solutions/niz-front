import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useDispatch";
import { useEffect } from "react";
import { subscriptionComplete } from "../store/orderSlice";
import useAxios from "../hooks/useAxios";
import { postPaymoentsComplete } from "../api/user/subAxios";
import { useAppSelector } from "../hooks/useSelector";

export default function SubscriptionLoading() {
  const user = useAppSelector((state) => state.user).data;
  const order = useAppSelector((state) => state.order).data;
  const urlSearch = new URLSearchParams(window.location.search);
  const paymentIdFromUrl = urlSearch.get("paymentId");
  const errorMessage = urlSearch.get("message");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resSubComplete = useAxios(
    () =>
      postPaymoentsComplete(
        order?.paymentId!,
        user?.name!,
        user?.phone!,
        order?.email!,
        order?.advicedAt!,
        order?.otherText!,
        user?.userid!,
      ),
    [
      order?.paymentId!,
      user?.name!,
      user?.phone!,
      order?.email!,
      order?.advicedAt!,
      order?.otherText!,
      user?.userid!,
    ],
    true,
  );

  useEffect(() => {
    if (errorMessage) {
      alert("처리중 오류가 발생했습니다");
      navigate("/", { replace: true });
    }
  }, [errorMessage, navigate]);

  useEffect(() => {
    if (errorMessage) return;
    if (
      (paymentIdFromUrl || order?.paymentId) &&
      user?.name &&
      user?.phone &&
      order?.email &&
      order?.advicedAt
    ) {
      resSubComplete.axiosData();
    } else {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentIdFromUrl, user, order, errorMessage]);

  useEffect(() => {
    if (resSubComplete.status === "Success" && resSubComplete.responseData) {
      dispatch(subscriptionComplete());
      navigate("/subscription/complete", { replace: true });
    } else if (resSubComplete.status === "Error") {
      navigate("/");
    } else if (resSubComplete.status === "Refresh") {
      resSubComplete.axiosData();
    }
  }, [resSubComplete.status, resSubComplete.responseData, dispatch, navigate]);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-20 rounded-xl bg-white p-8 shadow-lg dark:bg-black-001">
        <h2 className="text-lg font-semibold text-black-000 dark:text-gray-000">
          잠시만 기다려주세요
        </h2>
        <div className="dots-container">
          <div className="dot main-gradient"></div>
          <div className="dot main-gradient"></div>
          <div className="dot main-gradient"></div>
        </div>
        <button className="rounded-lg px-4 py-2 text-white transition main-gradient dark:text-black-000">
          Processing...
        </button>
      </div>
    </>
  );
}
