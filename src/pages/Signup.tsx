import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
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

  const handleOnInput = (v: string, maxlength: number) => {
    if (v.length > maxlength) {
      alert("최대 10자리까지 입력 가능합니다 !");
      const idInput = document.getElementById("id_Input") as HTMLInputElement;
      idInput.value = v.slice(0, maxlength);
    }
  };

  const isSamePassword = (v: string) => {
    if (passwordCheck.length === 0) return;
    const checkPwDiv = document.getElementById("check-password") as HTMLElement;
    if (v === passwordCheck || v === password) {
      checkPwDiv.classList.remove("border-red-000");
      checkPwDiv.classList.add("border-gray-001");
      checkPwDiv.classList.add("focus-within:border-blue-001");
    } else {
      checkPwDiv.classList.remove("border-gray-001");
      checkPwDiv.classList.remove("focus-within:border-blue-001");
      checkPwDiv.classList.add("border-red-000");
    }
  };

  const navigate = useNavigate();
  const callSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 요청:", { name, phone, id, password });
    ////////// 회원가입 API 연동
    ////////// 로그인 상태 변경
    navigate("/");
  };

  return (
    <div className="flex w-full flex-col items-center px-7">
      <div className="flex h-screen min-h-fit w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-12 self-center pt-[60px] md:flex-row md:justify-between lg:px-0">
        {/* 회원가입 타이틀 */}
        <h1 className="mr-auto text-4xl font-extrabold leading-[50px] md:min-w-[50%]">
          회원가입
        </h1>
        <div className="flex w-full flex-col items-center gap-4 md:max-w-[40%]">
          <form
            className="flex h-fit w-full min-w-[280px] flex-col gap-12"
            onSubmit={callSignup}
          >
            <div className="flex flex-col gap-6">
              <input
                id="name_Input"
                className="sign-input"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                required
              />
              <input
                id="phone_Input"
                className="sign-input"
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="연락처"
                required
              />
              <input
                id="id_Input"
                className="sign-input"
                type="text"
                defaultValue={id}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnInput(e.target.value, 10)
                }
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디"
                required
              />
              <div className="sign-input relative focus-within:border-blue-001">
                <input
                  className="w-full"
                  type={passwordVisible.type}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    isSamePassword(e.target.value);
                  }}
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
              <div
                id="check-password"
                className="relative border-b-[1.5px] border-gray-001 py-[6px] text-xl focus-within:border-blue-001 focus:border-blue-001"
              >
                <input
                  className="w-full"
                  type={passwordCheckVisible.type}
                  onChange={(e) => {
                    setPasswordCheck(e.target.value);
                    isSamePassword(e.target.value);
                  }}
                  placeholder="패스워드 확인"
                  required
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
            </div>
            {/* 버튼 - 회원가입 */}
            <div className="flex flex-col gap-3">
              <input
                className="w-full rounded-xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] py-3 text-xl font-extrabold text-white-000"
                type="submit"
                value="계정 만들기"
              />
            </div>
          </form>
          {/* 로그인 */}
          <Link to="/login" className="text-gray-002">
            이미 계정이 있으신가요 ?
          </Link>
        </div>
      </div>
    </div>
  );
}
