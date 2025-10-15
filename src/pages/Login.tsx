import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/useDispatch";
import { login } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { postLogin } from "../api/user/userAxios";
import { ReactComponent as KakaoLogo } from "../assets/kakao-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BalloonLogo from "../assets/logo-balloon-padding.png";
import Footer from "../components/layout/Footer";

export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState({
    type: "password",
    visible: false,
  });

  // 아이디, 패스워드 글자수 제한
  const handleOnInput = (v: string, maxlength: number) => {
    const ID = document.getElementById("id_Input") as HTMLInputElement;
    const PW = document.getElementById("pw_Input") as HTMLInputElement;
    const PWDIV = document.getElementById("pw_Div") as HTMLElement;
    if (maxlength === 10) ID.classList.remove("first");
    if (maxlength !== 10) PWDIV.classList.remove("first");

    if (v.length > maxlength) {
      alert(`최대 ${maxlength}자리까지 입력 가능합니다 !`);
      if (maxlength === 10) ID.value = v.slice(0, maxlength);
      else PW.value = v.slice(0, maxlength);
    }
    setId(ID.value);
    setPassword(PW.value);
  };

  // 패스워드 보이기, 숨기기 버튼
  const handlePasswordVisible = () => {
    setPasswordVisible(() => {
      if (!passwordVisible.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  // 아이디, 패스워드 입력 확인
  useEffect(() => {
    const ID = document.getElementById("id_Input") as HTMLInputElement;
    const PW = document.getElementById("pw_Div") as HTMLElement;

    const loginBtn = document.getElementById("login_Btn") as HTMLElement;
    if (id !== "") ID.classList.remove("border-red-000");
    if (password !== "") PW.classList.remove("border-red-000");
    if (id !== "" && password !== "") {
      loginBtn.classList.add("main-gradient");
    }
    if (id === "" && password === "") {
      loginBtn.classList.remove("main-gradient");
      loginBtn.classList.add("bg-gray-000");
    }
    if (id === "" && !ID.classList.contains("first")) {
      ID.classList.add("border-red-000");
    }
    if (password === "" && !PW.classList.contains("first")) {
      PW.classList.add("border-red-000");
    }
  }, [id, password]);

  // 자체 로그인
  const resPostLogin = useAxios(
    () => postLogin(id, password),
    [id, password],
    true,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = (e: any) => {
    e.preventDefault();
    const ID = document.getElementById("id_Input") as HTMLInputElement;
    const PW = document.getElementById("pw_Input") as HTMLInputElement;
    if (id !== "" && password !== "") {
      console.log("로그인 요청:", { id, password });
      setId(ID.value);
      setPassword(PW.value);
      resPostLogin.axiosData();
      // console.log(resPostLogin.responseData);
    } else if (id === "") {
      alert("아이디를 입력해주세요");
      ID.focus();
    } else if (password === "") {
      alert("패스워드를 입력해주세요");
      PW.focus();
    }
  };
  useEffect(() => {
    if (resPostLogin.status === "Success" && resPostLogin.responseData) {
      dispatch(login(resPostLogin.responseData.data));
      navigate("/");
    }
  }, [resPostLogin.status, resPostLogin.responseData, dispatch, navigate]);

  // 카카오 로그인 인가코드 받아와 메인페이지로 보내기
  const handleKakaoLogin = (e: any) => {
    e.preventDefault();
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`;
  };

  return (
    <>
      <div className="flex w-full flex-col items-center px-7 text-black-000 dark:text-white">
        <div className="flex min-h-screen w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-12 self-center pb-[100px] pt-[140px] md:flex-row md:items-center md:justify-between md:text-center lg:px-0">
          {/* 로그인 타이틀 */}
          <div className="flex max-h-screen w-fit flex-col items-center justify-start gap-12 md:max-w-[45%] md:items-center">
            <h1 className="mr-auto text-4xl font-extrabold leading-[50px] md:mr-0 md:hidden">
              로그인
            </h1>
            <img
              alt="로고"
              src={BalloonLogo}
              className="hidden w-[80%] md:mb-auto md:block"
            />
          </div>
          {/* 로그인 & 회원가입 컨테이너 */}
          <div className="flex w-full flex-col items-center gap-12 md:max-w-[45%]">
            {/* 로그인 컨테이너 */}
            <form className="flex h-fit w-full min-w-[280px] flex-col gap-12">
              <div className="flex flex-col gap-6">
                <input
                  autoFocus
                  id="id_Input"
                  className="first border-b-[1.5px] border-gray-001 bg-transparent py-[6px] text-xl focus:border-blue-001"
                  type="text"
                  defaultValue={id}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnInput(e.target.value, 10)
                  }
                  placeholder="아이디"
                />
                <div
                  className="first relative border-b-[1.5px] border-gray-001 bg-transparent py-[6px] text-xl focus-within:border-blue-001 focus:border-blue-001"
                  id="pw_Div"
                >
                  <input
                    id="pw_Input"
                    className="w-full bg-transparent"
                    type={passwordVisible.type}
                    placeholder="패스워드"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleOnInput(e.target.value, 13)
                    }
                  />
                  <span
                    className="absolute bottom-[6px] right-[10px] text-gray-002"
                    onClick={handlePasswordVisible}
                  >
                    {passwordVisible.visible ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </span>
                </div>
              </div>
              {/* 버튼 컨테이너 - 로그인, 카카오로그인 */}
              <div className="flex flex-col gap-3">
                <button
                  id="login_Btn"
                  className="w-full rounded-xl bg-gray-001 py-3 text-xl font-extrabold text-white-000 dark:bg-gray-003"
                  onClick={handleLogin}
                >
                  로그인
                </button>
                <button
                  className="flex flex-row items-center justify-center gap-2 rounded-xl bg-kakao-yellow"
                  onClick={handleKakaoLogin}
                >
                  <KakaoLogo height={20} width={20} />
                  <p className="py-3 text-xl text-black text-opacity-85">
                    카카오 로그인
                  </p>
                </button>
              </div>
            </form>
            {/* 회원가입 */}
            <Link to="/signup" className="text-gray-002">
              회원가입
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
