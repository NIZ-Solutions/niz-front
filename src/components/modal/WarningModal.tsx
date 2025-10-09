import { useEffect, useCallback, useState } from "react";
import WhiteLogo from "../../assets/logo_white.png";
import { useAppDispatch } from "../../hooks/useDispatch";
import { closeModal } from "../../store/modalSlice";
import { login } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { postLogin } from "../../api/user/userAxios";
import { ReactComponent as KakaoLogo } from "../../assets/kakao-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function TermModal() {
  const dispatch = useAppDispatch();

  // ESC로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeModal());
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  // 뒤쪽 스크롤 방지
  useEffect(() => {
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    // 스크롤바 보정
    const hasScrollbar =
      window.innerWidth > document.documentElement.clientWidth;
    const scrollbarWidth = hasScrollbar
      ? window.innerWidth - document.documentElement.clientWidth
      : 0;

    body.style.overflow = "hidden";
    if (scrollbarWidth) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  // 배경 클릭시 닫기
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) dispatch(closeModal());
    },
    [dispatch],
  );

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
  const handleLogin = (e: any) => {
    e.preventDefault();
    const ID = document.getElementById("id_Input") as HTMLInputElement;
    const PW = document.getElementById("pw_Input") as HTMLInputElement;
    if (id !== "" && password !== "") {
      console.log("로그인 요청:", { id, password });
      setId(ID.value);
      setPassword(PW.value);
      resPostLogin.axiosData();
      console.log(resPostLogin.responseData);
      if (resPostLogin.responseData.status === 200) {
        dispatch(login(resPostLogin.responseData.data));
        dispatch(closeModal());
      }
    } else if (id === "") {
      alert("아이디를 입력해주세요");
      ID.focus();
    } else if (password === "") {
      alert("패스워드를 입력해주세요");
      PW.focus();
    }
  };

  // 카카오 로그인 인가코드 받아와 메인페이지로 보내기
  const handleKakaoLogin = (e: any) => {
    e.preventDefault();
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`;
  };

  return (
    <div
      aria-modal="true"
      aria-label="경고"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
    >
      <div
        className="relative flex max-h-[60vh] min-h-[60vh] w-[min(80vw,600px)] flex-col justify-end rounded-xl bg-white text-black-000 shadow-xl"
        // 내부 클릭은 닫히지 않게
        onClick={(e) => e.stopPropagation()}
      >
        <header className="absolute top-0 flex h-[40%] w-full flex-col items-center justify-center gap-3 overflow-auto rounded-t-xl text-white-000 main-gradient">
          <img alt="로고" src={WhiteLogo} className="w-fit" />
          <div className="text-center text-3xl font-black">NIZ</div>
          <div className="text-center text-xl font-medium">
            당신의 아이디어를 <br />단 3일만에, 현실로
          </div>
        </header>
        <header className="absolute bottom-0 flex h-[60%] w-full flex-col items-center justify-between overflow-auto rounded-t-xl py-5">
          <div className="flex h-full flex-col justify-center">
            <form className="flex h-fit w-full min-w-[280px] flex-col gap-12">
              <div className="flex flex-col gap-6">
                <input
                  autoFocus
                  id="id_Input"
                  className="first border-b-[1.5px] border-gray-001 py-[6px] text-xl focus:border-blue-001"
                  type="text"
                  defaultValue={id}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnInput(e.target.value, 10)
                  }
                  placeholder="아이디"
                />
                <div
                  className="first relative border-b-[1.5px] border-gray-001 py-[6px] text-xl focus-within:border-blue-001 focus:border-blue-001"
                  id="pw_Div"
                >
                  <input
                    id="pw_Input"
                    className="w-full"
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
                  className="w-full rounded-xl bg-gray-001 py-3 text-xl font-extrabold text-white-000"
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
          </div>
        </header>
      </div>
    </div>
  );
}
