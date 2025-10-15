import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useDispatch";
import { login } from "../store/userSlice";
import useAxios from "../hooks/useAxios";
import { postSignup, postLogin } from "../api/user/userAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BalloonLogo from "../assets/logo-balloon-padding.png";
import useModal from "../hooks/useModal";
import Footer from "../components/layout/Footer";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState({
    type: "password",
    visible: false,
  });
  const [passwordCheckVisible, setPasswordCheckVisible] = useState({
    type: "password",
    visible: false,
  });
  const [passPw, setPassPw] = useState<Boolean>(false);
  const [passPwCheck, setPassPwCheck] = useState<Boolean>(false);
  const [termsCheck, setTermsCheck] = useState([false, false, false]);
  const [adCheck, setAdCheck] = useState<Boolean>(false);
  const { openModal, closeModal } = useModal();

  // 전화번호 하이픈 생성
  const handlePhoneHyphen = (v: string) => {
    const phoneInput = document.getElementById(
      "phone_Input",
    ) as HTMLInputElement;
    if (v.length > 13) {
      alert(`최대 11자리까지 입력 가능합니다 !`);
      phoneInput.value = v.slice(0, 13);
    }
    let numbers = phoneInput.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    phoneInput.value = numbers;
  };

  // 아이디, 패스워드 유효성 체크
  const handleOnInput = (v: string, maxlength: number, type: String) => {
    if (type === "PW") {
      let pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      const pwInput = document.getElementById("pw_Input") as HTMLInputElement;
      const pwDiv = document.getElementById("password") as HTMLElement;
      const incoDiv = document.getElementById("inco-Message") as HTMLElement;
      const hangulCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

      if (hangulCheck.test(v)) {
        alert("영문, 숫자, 특수문자만 입력 가능합니다.");
        pwInput.value = v.slice(0, v.length - 1);
        setPassPw(false);
        return;
      }
      if (!pwReg.test(v)) {
        setPassPw(false);
        if (v.length > maxlength) {
          alert(`최대 ${maxlength}자리까지 입력 가능합니다 !`);
          pwInput.value = v.slice(0, maxlength);
          return;
        }
        pwDiv.classList.remove("border-gray-001");
        pwDiv.classList.remove("focus-within:border-blue-001");
        pwDiv.classList.add("border-red-000");
        incoDiv.classList.remove("hidden");
        setPassPw(false);
      } else {
        pwDiv.classList.add("border-gray-001");
        pwDiv.classList.add("focus-within:border-blue-001");
        pwDiv.classList.remove("border-red-000");
        incoDiv.classList.add("hidden");
        setPassPw(true);
      }
    } else if (type === "ID") {
      const idInput = document.getElementById("id_Input") as HTMLInputElement;
      let idReg = /^[a-zA-Z0-9]+$/g;
      if (!idReg.test(v) && v.length !== 0) {
        alert("영문자와 숫자만 입력 가능합니다 !");
        idInput.value = idInput.value.slice(0, v.length - 1);
      }
      if (v.length > maxlength) {
        alert(`최대 ${maxlength}자리까지 입력 가능합니다 !`);
        idInput.value = v.slice(0, maxlength);
      }
    }
  };

  // 패스워드, 패스워드 확인 숨기기, 보이기
  const handlePasswordVisible = () => {
    setPasswordVisible(() => {
      if (!passwordVisible.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };
  const handlePasswordCheckVisible = () => {
    setPasswordCheckVisible(() => {
      if (!passwordCheckVisible.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  // 패스워드, 패스워드 확인 체크
  const isSamePassword = (v: string) => {
    const incoDiv = document.getElementById(
      "inco-checkpw-Message",
    ) as HTMLElement;
    const checkPwDiv = document.getElementById("check-password") as HTMLElement;
    const checkPw = document.getElementById(
      "check-password-Input",
    ) as HTMLInputElement;
    if (checkPw.value.length === 0) return;
    if (v === passwordCheck || v === password) {
      checkPwDiv.classList.remove("border-red-000");
      checkPwDiv.classList.add("border-gray-001");
      checkPwDiv.classList.add("focus-within:border-blue-001");
      incoDiv.classList.add("hidden");
      setPassPwCheck(true);
    } else {
      checkPwDiv.classList.remove("border-gray-001");
      checkPwDiv.classList.remove("focus-within:border-blue-001");
      checkPwDiv.classList.add("border-red-000");
      incoDiv.classList.remove("hidden");
      setPassPwCheck(false);
    }
  };

  // 약관 확인
  const handleTermsCheck = (number: number) => {
    const checkDocument = document.getElementById(`check-${number}`);
    const listDocument = document.getElementById(`list-${number}`);
    if (checkDocument?.getAttribute("color") === "#A0A0A0") {
      checkDocument?.setAttribute("color", "#126DD7");
      listDocument?.classList.remove("hidden");
      if (number === 4) {
        // setAdCheck(!adCheck);
      } else {
        let temp = [...termsCheck];
        temp[number - 1] = true;
        setTermsCheck(temp);
      }
    } else {
      checkDocument?.setAttribute("color", "#A0A0A0");
      listDocument?.classList.add("hidden");
      if (number === 4) {
        // setAdCheck(!adCheck);
      } else {
        let temp = [...termsCheck];
        temp[number - 1] = false;
        setTermsCheck(temp);
      }
    }
  };

  // 모든 input 정상 입력 확인
  useEffect(() => {
    const loginBtn = document.getElementById("login_Btn") as HTMLButtonElement;
    const terms = termsCheck.filter((el) => el === false).length;
    if (
      name !== "" &&
      phone !== "" &&
      id !== "" &&
      passPw &&
      passPwCheck &&
      terms === 0
    ) {
      loginBtn.classList.add("main-gradient");
      loginBtn.disabled = false;
    } else {
      loginBtn.classList.remove("main-gradient");
      loginBtn.classList.add("bg-gray-001");
      loginBtn.disabled = true;
    }
  }, [name, phone, id, password, passPw, passPwCheck, termsCheck]);

  // 계정만들기
  const resPostSignup = useAxios(
    () =>
      postSignup(
        id,
        password,
        name,
        phone.replaceAll("-", ""),
        termsCheck[0],
        termsCheck[1],
        termsCheck[2],
        // false,
      ),
    [
      id,
      password,
      name,
      phone.replaceAll("-", ""),
      termsCheck[0],
      termsCheck[1],
      termsCheck[2],
      // false,
    ],
    true,
  );

  const handleSignup = () => {
    console.log("회원가입요청");
    resPostSignup.axiosData();
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (resPostSignup.status === "Success" && resPostSignup.responseData) {
      dispatch(login(resPostSignup.responseData.data));
      navigate("/");
    }
  }, [resPostSignup.status, resPostSignup.responseData, dispatch, navigate]);

  type TermType = {
    key: number;
    title: string;
    subs: string[];
  };

  let termArr: TermType[] = [
    {
      key: 1,
      title: "[필수] 이용약관 동의",
      subs: [
        "서비스 이용에 관한 기본 규칙 (회원가입, 의무, 서비스 제공, 탈퇴 등)",
        "법령 위반, 타인 정보 도용, 부정 사용 시 서비스 이용 제한 가능",
      ],
    },
    {
      key: 2,
      title: "[필수] 개인정보 수집 및 이용 동의",
      subs: [
        "수집 항목: 이름, 이메일, 연락처, 웹로그, 설문 응답",
        "이용 목적: 서비스 개선, 사업계획 수립, 서비스 런칭 안내",
        "보관 및 폐기: 런칭 알림 후 개인정보는 즉시 폐기, 웹로그·설문은 통계 목적 활용",
        "제3자 제공 없음 (법령상 의무 제외)",
      ],
    },
    {
      key: 3,
      title: "[필수] 결제 및 환불 약관 동의",
      subs: [
        "결제는 선결제 원칙",
        "서비스 미제공, 회사 귀책 사유 시 환불 가능 (7영업일 이내 처리)",
        "서비스 이용 시작 후 원칙적으로 환불 불가",
      ],
    },
  ];

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center px-7 text-black-000 dark:text-white-000">
        <div className="flex max-h-fit w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-12 self-center pb-[100px] pt-[140px] md:flex-row md:items-start md:justify-between md:text-center lg:px-0">
          {/* 회원가입 타이틀 */}
          <div className="flex max-h-screen w-fit flex-col items-center justify-start gap-12 md:max-w-[45%] md:items-center">
            <h1 className="mr-auto text-4xl font-extrabold leading-[50px] md:mr-0 md:hidden">
              회원가입
            </h1>
            <img
              alt="로고"
              src={BalloonLogo}
              className="hidden w-[80%] md:mb-auto md:block"
            />
          </div>
          <div className="flex w-full flex-col items-center gap-4 md:max-w-[45%]">
            <form className="flex h-fit w-full min-w-[280px] flex-col gap-8">
              <div className="flex flex-col gap-6">
                <input
                  id="name_Input"
                  className="bg-transparent sign-input"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                  autoFocus
                />
                <input
                  id="phone_Input"
                  className="bg-transparent sign-input"
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="연락처"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePhoneHyphen(e.target.value)
                  }
                />
                <input
                  id="id_Input"
                  className="w-full bg-transparent sign-input"
                  type="text"
                  defaultValue={id}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnInput(e.target.value, 10, "ID")
                  }
                  onChange={(e) => setId(e.target.value)}
                  placeholder="아이디"
                />
                <div>
                  <div
                    id="password"
                    className="relative border-b-[1.5px] border-gray-001 py-[6px] text-xl focus-within:border-blue-001 focus:border-blue-001"
                  >
                    <input
                      id="pw_Input"
                      className="w-full bg-transparent"
                      type={passwordVisible.type}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        isSamePassword(e.target.value);
                      }}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOnInput(e.target.value, 16, "PW")
                      }
                      placeholder="패스워드"
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
                  <div
                    id="inco-Message"
                    className="hidden pt-2 text-left text-xs text-red-000"
                  >
                    최소 8자의 영문, 숫자, 특수문자를 입력해주세요.
                  </div>
                </div>
                <div>
                  <div
                    id="check-password"
                    className="relative border-b-[1.5px] border-gray-001 py-[6px] text-xl focus-within:border-blue-001 focus:border-blue-001"
                  >
                    <input
                      id="check-password-Input"
                      className="w-full bg-transparent"
                      type={passwordCheckVisible.type}
                      onChange={(e) => {
                        setPasswordCheck(e.target.value);
                        isSamePassword(e.target.value);
                      }}
                      placeholder="패스워드 확인"
                    />
                    <span
                      className="absolute bottom-[6px] right-[10px] text-gray-002"
                      onClick={handlePasswordCheckVisible}
                    >
                      {passwordCheckVisible.visible ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </span>
                  </div>
                  <div
                    id="inco-checkpw-Message"
                    className="hidden pt-2 text-left text-xs text-red-000"
                  >
                    비밀번호와 비밀번호 확인이 일치하지 않습니다.
                  </div>
                </div>
              </div>
              {/* 약관 */}
              <div className="flex flex-col gap-3 text-gray-002">
                {termArr.map((termObj) => (
                  <div>
                    <button
                      type="button"
                      className="flex flex-row items-center gap-2"
                      onClick={() => handleTermsCheck(Number(termObj.key))}
                    >
                      <FontAwesomeIcon
                        id={`check-${termObj.key}`}
                        icon={faCheck}
                        color="#A0A0A0"
                      />
                      <p>{termObj.title}</p>
                    </button>
                    <div
                      id={`list-${termObj.key}`}
                      className="hidden pl-7 pt-1 text-left text-xs"
                    >
                      {termObj.subs.map((el, index) => (
                        <p key={`term-${termObj.key}-${index}`}>{el}</p>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-left text-gray-001 underline"
                  onClick={() => {
                    console.log("[click] open terms");
                    openModal({ type: "terms" }); // 커스텀 훅이면 그대로 호출
                  }}
                >
                  약관 전체보기
                </button>
              </div>
              {/* 계정 만들기  */}
              <div className="flex flex-col gap-3 pt-4">
                <button
                  type="button"
                  id="login_Btn"
                  className="w-full rounded-xl bg-gray-001 py-3 text-xl font-extrabold text-white-000 dark:bg-gray-003"
                  onClick={handleSignup}
                >
                  계정 만들기
                </button>
              </div>
            </form>
            {/* 로그인 */}
            <Link to="/login" className="text-gray-002">
              이미 계정이 있으신가요 ?
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
