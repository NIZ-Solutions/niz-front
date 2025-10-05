import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { postLogin } from "../api/user/userAxios";
import { ReactComponent as KakaoLogo } from "../assets/kakao-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BalloonLogo from "../assets/logo-balloon-x1.png";

export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState({
    type: "password",
    visible: false,
  });

  const handlePasswordVisible = () => {
    setPasswordVisible(() => {
      if (!passwordVisible.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const handleOnInput = (v: string, maxlength: number) => {
    if (v.length > maxlength) {
      alert("최대 10자리까지 입력 가능합니다 !");
      const idInput = document.getElementById("id_Input") as HTMLInputElement;
      idInput.value = v.slice(0, maxlength);
    }
  };

  const navigate = useNavigate();
  const { responseData, sendData } = useAxios(
    () => postLogin(id, password),
    [id, password],
    true,
  );

  const handleLogin = (e: any) => {
    e.preventDefault();
    console.log("로그인 요청:", { id, password });
    const ID = document.getElementById("id_Input") as HTMLInputElement;
    const PW = document.getElementById("pw_Input") as HTMLInputElement;
    setId(ID.value);
    setPassword(PW.value);
    sendData();
    responseData.length !== 0 ? navigate("/") : alert("실패");
  };

  return (
    <>
      <div className="flex w-full flex-col items-center px-7 text-black-000">
        <div className="flex h-screen min-h-fit w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-12 self-center pb-[120px] pt-[120px] md:flex-row md:justify-between md:text-center lg:px-0">
          {/* 로그인 타이틀 */}
          <div className="flex w-full flex-col items-center gap-12">
            <h1 className="mr-auto text-4xl font-extrabold leading-[50px] md:mr-0 md:hidden">
              로그인
            </h1>
            <img
              alt="로고"
              src={BalloonLogo}
              className="hidden w-[50%] md:block"
            />
          </div>
          {/* 로그인 & 회원가입 컨테이너 */}
          <div className="flex w-full flex-col items-center gap-12 md:max-w-[40%]">
            {/* 로그인 컨테이너 */}
            <form className="flex h-fit w-full min-w-[280px] flex-col gap-12">
              <div className="flex flex-col gap-6">
                <input
                  id="id_Input"
                  className="sign-input"
                  type="text"
                  defaultValue={id}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnInput(e.target.value, 10)
                  }
                  placeholder="아이디"
                  required
                />
                <div className="sign-input relative focus-within:border-blue-001">
                  <input
                    id="pw_Input"
                    className="w-full"
                    type={passwordVisible.type}
                    placeholder="패스워드"
                    required
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
                  className="w-full rounded-xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] py-3 text-xl font-extrabold text-white-000"
                  onClick={handleLogin}
                >
                  로그인
                </button>
                <button className="flex flex-row items-center justify-center gap-2 rounded-xl bg-kakao-yellow">
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
    </>
  );
}
