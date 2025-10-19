import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useDispatch";
import { login } from "../store/userSlice";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { postKakaoLogin } from "../api/user/userAxios";
import Footer from "../components/layout/Footer";

export default function Loading() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const code = new URL(window.location.href).searchParams.get("code");
  const resKakaoLogin = useAxios(() => postKakaoLogin(code!), [code], true);
  useEffect(() => {
    if (!code) return;
    resKakaoLogin.axiosData();
  }, [code]);

  useEffect(() => {
    if (resKakaoLogin.status !== "Success" || !resKakaoLogin.responseData)
      return;

    dispatch(login(resKakaoLogin.responseData.data));
    console.log(resKakaoLogin.responseData.data);
    navigate("/", { replace: true });
  }, [resKakaoLogin.status, resKakaoLogin.responseData, dispatch, navigate]);

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
