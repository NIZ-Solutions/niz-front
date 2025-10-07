import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import DateDropdown from "../components/DateDropdown";
import TimeDropdown from "../components/TimeDropdown";
import * as PortOne from "@portone/browser-sdk/v2";
import { nanoid } from "nanoid";

export default function Submit() {
  const price = "49900";
  const textPrice = price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  let nowDate = new Date();
  const year = nowDate.getFullYear(); // 년도
  const month = nowDate.getMonth() + 1; // 월
  const day = nowDate.getDate(); // 날짜

  const [visibleDatePicker, setVisibleDatePicker] = useState<Boolean>(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState<Boolean>(false);
  const [date, setDate] = useState({
    year: year,
    month: month,
    day: day,
  });
  const [promiseTime, setPromiseTime] = useState<string>("09:00");

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

  const handleClickTime = (el: string) => {
    setPromiseTime(el);
    setVisibleTimePicker(false);
    return;
  };

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

  const nanoId = nanoid();
  const nameInput = document.getElementById("name-input") as HTMLInputElement;
  const phoneInput = document.getElementById("phone-input") as HTMLInputElement;
  const emailInput = document.getElementById("email-input") as HTMLInputElement;

  async function requestPayment() {
    console.log(nameInput.value);
    const resPayment = await PortOne.requestPayment({
      // Store ID 설정
      storeId: process.env.REACT_APP_KG_STORE_ID
        ? process.env.REACT_APP_KG_STORE_ID
        : "123",
      // 채널 키 설정
      channelKey: "channel-key-893597d6-e62d-410f-83f9-119f530b4b11",
      paymentId: nanoId,
      orderName: `${nanoId}-${nameInput.value}`,
      totalAmount: Number(price),
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer: {
        fullName: nameInput.value,
        firstName: nameInput.value.slice(0, 1),
        lastName: nameInput.value.slice(1),
        phoneNumber: phoneInput.value,
        email: emailInput.value,
      },
      redirectUrl: `/subscription/complete`,
    });
  }

  return (
    <div className="flex w-full flex-col items-center justify-between pb-[120px] pl-4 pr-5 text-black-000 min-[340px]:px-7 md:pb-0">
      <div className="flex min-h-screen w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-8 pt-[120px] text-center md:flex-row md:justify-between md:pb-[120px] lg:px-0">
        <div className="flex flex-col gap-8 md:min-w-[50%] md:text-left">
          <p className="text-xl font-medium text-blue-001">
            금액 : {textPrice}원
          </p>
          <h1 className="text-xl font-bold">
            아이디어에 맞는 시장조사를 위해,
            <br />
            전문가의 상담을 받아보세요.
          </h1>
        </div>
        <div className="flex w-full flex-col gap-4 md:max-w-[50%]">
          {/* 상담 희망일 */}
          <div className="relative flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">상담 희망일</h2>
            <div className="relative rounded-md border-[1px] border-blue-001">
              <input
                className="w-full min-w-[280px] rounded-[5px] px-2 py-1"
                value={`${date.year}년 ${date.month}월 ${date.day}일`}
                readOnly
              />
              <span
                className="dropdown absolute bottom-[4px] right-[10px] text-gray-002"
                id="image-parent"
                onClick={() => setVisibleDatePicker(!visibleDatePicker)}
              >
                <FontAwesomeIcon icon={faCalendarDays} color="#126DD7" />
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
            <div className="relative rounded-md border-[1px] border-blue-001">
              <input
                className="w-full min-w-[280px] rounded-[5px] px-2 py-1"
                value={promiseTime}
                readOnly
              />
              <span
                className="dropdown absolute bottom-[4px] right-[10px] text-gray-002"
                onClick={() => setVisibleTimePicker(!visibleTimePicker)}
              >
                <FontAwesomeIcon icon={faAngleDown} color="#126DD7" />
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
            <div className="relative rounded-md border-[1px] border-blue-001">
              <input
                id="name-input"
                className="w-full min-w-[280px] rounded-[5px] px-2 py-1"
                placeholder="ex. 박니즈"
              />
            </div>
          </div>
          {/* 전화번호 */}
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">전화번호</h2>
            <div className="relative rounded-md border-[1px] border-blue-001">
              <input
                id="phone-input"
                className="w-full min-w-[280px] rounded-[5px] px-2 py-1"
                placeholder="ex. 01012345678"
              />
            </div>
          </div>
          {/* 전화번호 */}
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">이메일</h2>
            <div className="relative rounded-md border-[1px] border-blue-001">
              <input
                id="email-input"
                className="w-full min-w-[280px] rounded-[5px] px-2 py-1"
                placeholder="ex. nizhelp@gmail.com"
              />
            </div>
          </div>
          {/* 아이디어 설명 */}
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">아이디어 설명</h2>
            <div className="min-h-[18svh] content-center rounded-md border-[1px] border-blue-001">
              <div className="rounded-md bg-white-000 p-2">
                <textarea
                  id="sub-textarea"
                  className="min-h-[18svh] w-full resize-none bg-transparent"
                  placeholder="상담시 필요한 내용들을 작성해주세요.&#13;&#10;
                              ㅤ&#13;&#10;
                              ex _ &#13;&#10;
                              아이디어에 대한 구체적인 내용&#13;&#10;
                              받고싶은 설문조사 종류 및 내용&#13;&#10;
                              디자인 수정 요청"
                ></textarea>
              </div>
            </div>
          </div>
          {/* 버튼 - 결제하기 */}
          <div className="flex flex-col gap-3 pt-9">
            <button
              type="button"
              onClick={() => requestPayment()}
              className="w-full rounded-xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] py-3 text-xl font-extrabold text-white-000"
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
