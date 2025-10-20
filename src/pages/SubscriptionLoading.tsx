import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useDispatch";
import { useEffect, useRef } from "react";
import { subscriptionComplete } from "../store/orderSlice";
import useAxios from "../hooks/useAxios";
import { postPaymoentsComplete } from "../api/user/subAxios";
import { useAppSelector } from "../hooks/useSelector";
import Footer from "../components/layout/Footer";

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
        order?.name!,
        order?.phone!,
        order?.email!,
        order?.advicedAt!,
        order?.otherText!,
        user?.accessToken!,
      ),
    [
      order?.paymentId!,
      order?.name!,
      order?.phone!,
      order?.email!,
      order?.advicedAt!,
      order?.otherText!,
      user?.accessToken!,
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
      order?.paymentId &&
      order?.name &&
      order?.phone &&
      order?.email &&
      order?.advicedAt
    ) {
      console.log("setTimeout 시작");
      setTimeout(() => {
        console.log("1초지남");
        resSubComplete.axiosData();
        console.log(resSubComplete);
      }, 1000);
    }
  }, [user, order, errorMessage]);

  useEffect(() => {
    if (resSubComplete.status === "Success" && resSubComplete.responseData) {
      console.log("complete 성공");
      window.location.replace("/subscription/complete");
      return;
    } else if (resSubComplete.status === "Error") {
      navigate("/");
    } else if (resSubComplete.status === "Refresh") {
      resSubComplete.axiosData();
    }
  }, [resSubComplete.status, resSubComplete.responseData, dispatch, navigate]);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-28 p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-001">로딩중</h2>
        <div className="dots-container">
          <div className="dot bg-gray-001"></div>
          <div className="dot bg-gray-001"></div>
          <div className="dot bg-gray-001"></div>
        </div>
      </div>
    </>
  );
}
