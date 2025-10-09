import { useNavigate } from "react-router-dom";
import useDidMountEffect from "./../hooks/useDidMountEffect";
import { useAppDispatch } from "../hooks/useDispatch";
import { login } from "../store/userSlice";

export default function Loading() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useDidMountEffect(() => {
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
      <div className="flex min-h-screen flex-col items-center justify-center gap-20 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-black-000">
          잠시만 기다려주세요
        </h2>
        <div className="dots-container">
          <div className="dot bg-purple-500 dark:bg-purple-400"></div>
          <div className="dot bg-purple-500 dark:bg-purple-400"></div>
          <div className="dot bg-purple-500 dark:bg-purple-400"></div>
        </div>
        <button className="rounded-lg bg-purple-500 px-4 py-2 text-white transition hover:bg-purple-600">
          Processing...
        </button>
      </div>
    </>
  );
}
