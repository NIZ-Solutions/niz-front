import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import DateDropdown from "../components/DateDropdown";
import TimeDropdown from "../components/TimeDropdown";
import { nanoid } from "nanoid";
import { useAppDispatch } from "../hooks/useDispatch";
import { subscription } from "../store/orderSlice";
import * as PortOne from "@portone/browser-sdk/v2";
import Footer from "../components/layout/Footer";

export default function Submit() {
  const location = useLocation();

  const explanationText = location.state?.explanationText;
  const nanoId = nanoid();

  const price = "80000";
  const textPrice = price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  const [visibleDatePicker, setVisibleDatePicker] = useState<Boolean>(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState<Boolean>(false);
  const [promiseTime, setPromiseTime] = useState<string>("09:00");
  let nowDate = new Date();
  const year = nowDate.getFullYear(); // 년도
  const month = nowDate.getMonth() + 1; // 월
  const day = nowDate.getDate(); // 날짜
  const [date, setDate] = useState({
    year: year,
    month: month,
    day: day,
  });

  // 이름 입력 수정
  const handleName = (v: string) => {
    const nameInput = document.getElementById("name-input") as HTMLInputElement;
    let pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    if (pattern.test(v)) alert("공백 없이 한글만 입력 가능합니다.");
    nameInput.value = v.replace(pattern, "");
  };

  // 전화번호 유효성 검증
  const [passPhone, setPhone] = useState<Boolean>(false);
  const handlePhone = (v: string) => {
    const phoneInput = document.getElementById(
      "phone-input",
    ) as HTMLInputElement;
    let numbers = phoneInput.value.replace(/[^0-9]/g, "");
    phoneInput.value = numbers;
    let phoneReg = /^0([0-9]{1,2})([0-9]{3,4})([0-9]{4})$/;
    const phoneDiv = document.getElementById("phone-div") as HTMLElement;

    if (!phoneReg.test(v)) {
      setPhone(false);
      phoneDiv.classList.remove("back-glass");
      phoneDiv.classList.add("back-glass-red");
      setPhone(false);
    } else {
      phoneDiv.classList.add("back-glass");
      phoneDiv.classList.remove("back-glass-red");
      setPhone(true);
    }
  };

  // 이메일 유효성 검증
  const [passEmail, setEmail] = useState<Boolean>(false);
  const handleEmail = (v: string) => {
    let emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const emailDiv = document.getElementById("email-div") as HTMLElement;

    if (!emailReg.test(v)) {
      setEmail(false);
      emailDiv.classList.remove("back-glass");
      emailDiv.classList.add("back-glass-red");
      setEmail(false);
    } else {
      emailDiv.classList.add("back-glass");
      emailDiv.classList.remove("back-glass-red");
      setEmail(true);
    }
  };

  // Dropdown Date Click 함수
  const handleClickDate = (el: number, type: string) => {
    if (type === "year") {
      setDate((prev) => {
        return { ...prev, year: el };
      });
    } else if (type === "month") {
      setDate((prev) => {
        return { ...prev, month: el };
      });
    } else if (type === "day") {
      setDate((prev) => {
        return { ...prev, day: el };
      });
      setVisibleDatePicker(false);
      return;
    }
  };

  // Dropdown Time Click 함수
  const handleClickTime = (el: string) => {
    setPromiseTime(el);
    setVisibleTimePicker(false);
    return;
  };

  // Dropdown 외부 클릭시 닫기
  const dateRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const targetNode = e.target as Node;
      if (
        targetNode.parentElement?.parentElement?.classList.contains("dropdown")
      )
        return;
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setVisibleDatePicker(false);
      }
      if (timeRef.current && !timeRef.current.contains(e.target as Node)) {
        setVisibleTimePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visibleDatePicker, visibleTimePicker]);

  // 모든 input 정상 입력 확인
  const [name, setName] = useState<string>("");
  useEffect(() => {
    const payBtn = document.getElementById("pay-Btn") as HTMLButtonElement;
    const payBtnText = document.getElementById("sub-btn-text") as HTMLElement;
    if (name !== "" && passPhone && passEmail) {
      payBtnText.classList.remove("btn-glass-span");
      payBtnText.classList.add("btn-glass-span-active");
      payBtn.disabled = false;
    } else {
      payBtnText.classList.remove("btn-glass-span-active");
      payBtnText.classList.add("btn-glass-span");
      payBtn.disabled = true;
    }
  }, [name, passPhone, passEmail]);

  // 결제
  const [paymentsComplement, setPaymentsComplement] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  async function requestPayment() {
    const nameInput = document.getElementById("name-input") as HTMLInputElement;
    const phoneInput = document.getElementById(
      "phone-input",
    ) as HTMLInputElement;
    const emailInput = document.getElementById(
      "email-input",
    ) as HTMLInputElement;
    const textareaInput = document.getElementById(
      "sub-textarea",
    ) as HTMLTextAreaElement;
    const advicedAt = `${date.year}-${
      String(date.month).length === 1 ? `0${date.month}` : date.month
    }-${
      String(date.day).length === 1 ? `0${date.day}` : date.day
    }T${promiseTime}:00Z`;

    try {
      const res = await PortOne.requestPayment({
        storeId: process.env.REACT_APP_KG_STORE_ID as string,
        channelKey: process.env.REACT_APP_KG_CHANNEL_KEY,
        paymentId: nanoId,
        orderName: `NIZ ${nameInput.value} 랜딩페이지`,
        totalAmount: 2,
        currency: "CURRENCY_KRW",
        windowType: {
          pc: "IFRAME",
          mobile: "REDIRECTION",
        },
        payMethod: "CARD",
        customer: {
          fullName: nameInput.value,
          firstName: nameInput.value.slice(0, 1),
          lastName: nameInput.value.slice(1),
          phoneNumber: phoneInput.value,
          email: emailInput.value,
        },
        bypass: {
          inicis_v2: {
            logo_url: "",
            logo_2nd:
              "https://s3.us-east-2.amazonaws.com/nizkr.com/NIZ-PG-2ND.png",
            Ini_SSGPAY_MDN: `${phoneInput.value}`,
            acceptmethod: ["SKIN(#126DD7)", "below1000"],
            P_MNAME: "니즈 NIZ",
            P_RESERVED: ["below1000=Y", "apprun_check=Y"],
          },
        },
        redirectUrl: `${process.env.REACT_APP_BASE}/subscription/loading`,
      });
      if (res?.code === undefined) {
        dispatch(
          subscription({
            email: emailInput.value,
            paymentId: nanoId,
            advicedAt: advicedAt,
            otherText: textareaInput.value,
            amount: "2",
            phone: phoneInput.value,
            name: nameInput.value,
          }),
        );
        setPaymentsComplement(true);
      } else {
        setPaymentsComplement(false);
      }
    } catch (e) {
      console.error(e);
    }
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentsComplement) {
      navigate("/subscription/loading", { replace: true });
    }
  }, [paymentsComplement, navigate]);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between pb-[120px] pl-4 pr-5 text-gray-000 min-[340px]:px-7 md:pb-0">
        <div className="flex min-h-screen w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-8 pt-[120px] text-center md:flex-row md:justify-between md:pb-[120px] lg:px-0">
          <div className="flex flex-col gap-8 md:min-w-[50%]">
            <p className="text-lg font-semibold text-blue-000 md:text-xl">
              금액 : {textPrice}원
            </p>
            <h1 className="text-xl font-bold md:text-2xl">
              아이디어에 맞는 시장조사를 위해,
              <br />
              전문가의 상담을 받아보세요.
            </h1>
          </div>
          <div className="flex w-full flex-col gap-4 md:max-w-[50%]">
            {/* 상담 희망일 */}
            <div className="relative flex w-full flex-col gap-1 text-left font-medium">
              <h2 className="">상담 희망일</h2>
              <div className="relative rounded-md back-glass">
                <input
                  className="w-full min-w-[280px] rounded-[5px] bg-transparent px-2 py-1"
                  value={`${date.year}년 ${date.month}월 ${date.day}일`}
                  readOnly
                />
                <span
                  className="dropdown absolute bottom-[4px] right-[10px] text-gray-002"
                  id="image-parent"
                  onClick={() => setVisibleDatePicker(!visibleDatePicker)}
                >
                  <FontAwesomeIcon icon={faCalendarDays} color="#ffffffd0" />
                </span>
              </div>
              <div
                ref={dateRef}
                className={`absolute top-16 z-50 flex h-[20svh] min-w-full flex-row text-center ${visibleDatePicker ? `block` : `hidden`}`}
              >
                <DateDropdown handleClickDate={handleClickDate} />
              </div>
            </div>
            {/* 상담 희망 시간 */}
            <div className="relative flex w-full flex-col gap-1 text-left font-medium">
              <h2 className="">상담 희망 시간</h2>
              <div className="relative rounded-md back-glass">
                <input
                  className="w-full min-w-[280px] rounded-[5px] bg-transparent px-2 py-1"
                  value={promiseTime}
                  readOnly
                />
                <span
                  className="dropdown absolute bottom-[4px] right-[10px] text-gray-002"
                  onClick={() => setVisibleTimePicker(!visibleTimePicker)}
                >
                  <FontAwesomeIcon icon={faAngleDown} color="#ffffffd0" />
                </span>
              </div>
              <div
                ref={timeRef}
                className={`absolute top-16 z-50 flex h-[20svh] min-w-full flex-row text-center ${visibleTimePicker ? `block` : `hidden`}`}
              >
                <TimeDropdown handleClickTime={handleClickTime} />
              </div>
            </div>
            {/* 이름 */}
            <div className="flex w-full flex-col gap-1 text-left font-medium">
              <h2 className="">이름</h2>
              <div className="relative rounded-md back-glass">
                <input
                  id="name-input"
                  className="w-full min-w-[280px] rounded-[5px] bg-transparent px-2 py-1"
                  placeholder="ex. 박니즈"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleName(e.target.value)
                  }
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {/* 전화번호 */}
            <div className="flex w-full flex-col gap-1 text-left font-medium">
              <h2 className="">전화번호</h2>
              <div id="phone-div" className="relative rounded-md back-glass">
                <input
                  id="phone-input"
                  className="w-full min-w-[280px] rounded-[5px] bg-transparent px-2 py-1"
                  placeholder="ex. 01012345678"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePhone(e.target.value)
                  }
                />
              </div>
            </div>
            {/* 이메일 */}
            <div className="flex w-full flex-col gap-1 text-left font-medium">
              <h2 className="">이메일</h2>
              <div id="email-div" className="relative rounded-md back-glass">
                <input
                  id="email-input"
                  className="w-full min-w-[280px] rounded-[5px] bg-transparent px-2 py-1"
                  placeholder="ex. nizhelp@gmail.com"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleEmail(e.target.value)
                  }
                />
              </div>
            </div>
            {/* 아이디어 설명 */}
            <div className="flex w-full flex-col gap-1 text-left font-medium">
              <h2 className="">아이디어 설명</h2>
              <div className="min-h-[18svh] content-center rounded-md back-glass">
                <div className="rounded-md p-2">
                  <textarea
                    id="sub-textarea"
                    className="min-h-[18svh] w-full resize-none bg-transparent"
                    placeholder="상담시 필요한 내용들을 작성해주세요.&#13;&#10;
                              ㅤ&#13;&#10;
                              ex _ &#13;&#10;
                              아이디어에 대한 구체적인 내용&#13;&#10;
                              받고싶은 설문조사 종류 및 내용&#13;&#10;
                              디자인 수정 요청"
                  >
                    {explanationText}
                  </textarea>
                </div>
              </div>
            </div>
            {/* 버튼 - 결제하기 */}
            <div className="flex flex-col gap-3 pt-9">
              <button
                id="pay-Btn"
                type="button"
                onClick={() => requestPayment()}
                className="w-full btn-glass"
              >
                <span
                  id="sub-btn-text"
                  className="rounded-xl text-xl btn-glass-span"
                >
                  결제하기
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
