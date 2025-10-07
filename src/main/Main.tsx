import Intro from "./Intro";
import Plan from "./Plan";
import Submit from "./Submit";
import useDidMountEffect from "./../hooks/useDidMountEffect";
import { useAppDispatch } from "../hooks/useDispatch";
import { login } from "../store/userSlice";

export default function Main() {
  const dispatch = useAppDispatch();
  const code = new URL(window.location.href).searchParams.get("code");
  useDidMountEffect(() => {
    // 카카오 인가코드 백엔드로 전송
    if (code !== null) {
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
    }
  }, []);

  return (
    <>
      <div className="flex w-full min-w-[280px] flex-col items-center justify-between text-black-000">
        <Submit />
        <Intro />
        <Plan />
      </div>
    </>
  );
}
