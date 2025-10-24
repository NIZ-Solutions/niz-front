import { useEffect, useCallback, useState, useRef } from "react";
import WhiteLogo from "../../assets/logo_white.png";
import { useAppDispatch } from "../../hooks/useDispatch";
import { closeModal } from "../../store/modalSlice";
import { login } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { postLogin } from "../../api/user/userAxios";
import { ReactComponent as KakaoLogo } from "../../assets/kakao-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useScrollLock from "../../hooks/useScrollLock";

export default function LoginModal() {
  const dispatch = useAppDispatch();
  const tempRef = useRef<HTMLDivElement>(null);
  const { lock, unlock } = useScrollLock(() => null);

  // ESC로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.classList.remove("touch-none");
        unlock();
        dispatch(closeModal());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  // 뒤쪽 스크롤 방지
  lock();
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
      body.classList.add("touch-none");
    };
  }, []);

  // 배경 클릭시 닫기
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        document.body.classList.remove("touch-none");
        unlock();
        dispatch(closeModal());
      }
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
    const loginBtnText = document.getElementById(
      "login-btn-text",
    ) as HTMLElement;
    if (id !== "") ID.classList.remove("border-red-000");
    if (password !== "") PW.classList.remove("border-red-000");
    if (id !== "" && password !== "") {
      loginBtnText.classList.remove("btn-glass-span-modal");
      loginBtnText.classList.add("btn-glass-span-modal-active");
    }
    if (id === "" || password === "") {
      loginBtnText.classList.remove("btn-glass-span-modal-active");
      loginBtn.classList.add("btn-glass");
      loginBtnText.classList.add("btn-glass-span-modal");
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
  const handleLogin = (e: any) => {
    e.preventDefault();
    const ID = document.getElementById("id_Input") as HTMLInputElement;
    const PW = document.getElementById("pw_Input") as HTMLInputElement;
    if (id !== "" && password !== "") {
      console.log("로그인 요청:", { id, password });
      setId(ID.value);
      setPassword(PW.value);
      resPostLogin.axiosData();
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
      document.body.classList.remove("touch-none");
      unlock();
      dispatch(closeModal());
    }
  }, [resPostLogin.status, resPostLogin.responseData, dispatch, navigate]);

  // 카카오 로그인 인가코드 받아와 메인페이지로 보내기
  const handleKakaoLogin = (e: any) => {
    e.preventDefault();
    document.body.classList.remove("touch-none");
    unlock();
    dispatch(closeModal());
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`;
  };

  return (
    <div
      aria-modal="true"
      aria-label="경고"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex min-h-[110svh] items-center justify-center bg-black/70"
    >
      <div
        ref={tempRef}
        className="relative flex h-[min(70vh,600px)] w-[min(80vw,400px)] flex-col justify-end overflow-auto rounded-xl px-6 font-light text-gray-000 shadow-xl back-glass"
        // 내부 클릭은 닫히지 않게
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-auto rounded-t-xl text-white-000">
          <img
            alt="로고"
            src={WhiteLogo}
            className="bh:block hidden w-fit max-w-[50px]"
          />
          <div className="bh:block hidden pb-3 text-center text-xl font-medium">
            당신의 아이디어를 <br />단 3일만에, 현실로
          </div>
          <div className="w-full flex-col items-center justify-between overflow-auto rounded-t-xl text-base md:text-lg">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <form className="flex h-fit w-[90%] flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <input
                    autoFocus
                    id="id_Input"
                    className="first border-b-[1.5px] border-gray-001 bg-transparent py-[6px] focus:border-blue-001"
                    type="text"
                    defaultValue={id}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleOnInput(e.target.value, 10)
                    }
                    placeholder="아이디"
                  />
                  <div
                    className="first relative border-b-[1.5px] border-gray-001 bg-transparent py-[6px] focus-within:border-blue-001 focus:border-blue-001"
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
                      className="absolute bottom-[6px] right-[10px]"
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
                <div className="bh:flex-col flex flex-row gap-3">
                  <button
                    id="login_Btn"
                    className="bh:w-full w-[50%] btn-glass"
                    onClick={handleLogin}
                  >
                    <span
                      id="login-btn-text"
                      className="btn-glass-span-modal rounded-xl"
                    >
                      로그인
                    </span>
                  </button>
                  <button
                    className="bh:w-full flex w-[50%] flex-row items-center justify-center gap-2 rounded-xl bg-kakao-yellow"
                    onClick={handleKakaoLogin}
                  >
                    <KakaoLogo height={20} width={20} />
                    <p className="py-[9px] text-black text-opacity-85">
                      카카오 로그인
                    </p>
                  </button>
                </div>
              </form>
              <Link
                to="/signup"
                className="pt-5 text-sm text-gray-000 md:text-base"
              >
                회원가입
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
