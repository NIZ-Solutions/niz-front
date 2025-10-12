import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useDispatch";
import { login } from "../store/userSlice";
import { useEffect } from "react";

export default function Loading() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    if (code !== null) {
      // 카카오 인가코드 백엔드로 전송
      console.log(code);
      const resData = {
        data: {
          name: "",
          accessToken: "",
          accessTokenExpiresIn: 0,
          refreshToken: "",
          refreshTokenExpiresIn: 0,
        },
      };
      dispatch(login(resData.data));
      // 성공시 main으로 redirect
      navigate("/");
    }
  }, []);

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
