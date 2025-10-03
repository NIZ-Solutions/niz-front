import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export default function Submit() {
  const price = "3800";
  const textPrice = price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  const [visibleDatePicker, setVisibleDatePicker] = useState<Boolean>(false);

  return (
    <div className="flex w-full flex-col items-center pb-[120px] pl-4 pr-5 min-[340px]:px-7 md:pb-0">
      <div className="flex min-h-screen w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-8 pt-[120px] text-center md:flex-row md:justify-between md:pb-[120px] lg:px-0">
        <div className="flex flex-col gap-8 md:min-w-[50%]">
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
                value={"2025 - 10 - 02"}
                readOnly
              />
              <span
                className="absolute bottom-[4px] right-[10px] text-gray-002"
                onClick={() => setVisibleDatePicker(!visibleDatePicker)}
              >
                <FontAwesomeIcon icon={faCalendarDays} color="#126DD7" />
              </span>
            </div>
            <div
              className={`absolute top-16 z-50 flex h-[10svh] min-w-full flex-row text-center ${visibleDatePicker ? `block` : `hidden`}`}
            >
              <div className="flex w-1/3 flex-col justify-start gap-2 bg-white-000 py-2 drop-shadow-lg">
                <p>2026</p>
                <p>2025</p>
              </div>
              <div className="flex w-1/3 flex-col justify-start gap-2 overflow-y-scroll bg-white-000 py-2 drop-shadow-lg">
                <p>1 월</p>
                <p>2 월</p>
                <p>3 월</p>
                <p>4 월</p>
                <p>5 월</p>
                <p>6 월</p>
                <p>7 월</p>
                <p>8 월</p>
                <p>9 월</p>
                <p>10 월</p>
                <p>11 월</p>
                <p>12 월</p>
              </div>
              <div className="flex w-1/3 flex-col justify-start gap-2 overflow-y-scroll bg-white-000 py-2 drop-shadow-lg">
                <p>1 일</p>
                <p>2 일</p>
                <p>3 일</p>
                <p>4 일</p>
                <p>5 일</p>
                <p>6 일</p>
                <p>7 일</p>
                <p>8 일</p>
                <p>9 일</p>
                <p>10 일</p>
                <p>11 일</p>
                <p>12 일</p>
                <p>13 일</p>
                <p>14 일</p>
                <p>15 일</p>
                <p>16 일</p>
                <p>17 일</p>
                <p>18 일</p>
                <p>19 일</p>
                <p>20 일</p>
                <p>21 일</p>
                <p>22 일</p>
                <p>23 일</p>
                <p>24 일</p>
                <p>25 일</p>
                <p>26 일</p>
                <p>27 일</p>
                <p>28 일</p>
                <p>29 일</p>
                <p>30 일</p>
                <p>31 일</p>
              </div>
            </div>
          </div>
          {/* 상담 희망 시간 */}
          <div className="relative flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">상담 희망 시간</h2>
            <div className="relative rounded-md border-[1px] border-blue-001">
              <input
                className="w-full min-w-[280px] rounded-[5px] px-2 py-1"
                value={"11 : 00"}
                readOnly
              />
              <span className="absolute bottom-[4px] right-[10px] text-gray-002">
                <FontAwesomeIcon icon={faAngleDown} color="#126DD7" />
              </span>
            </div>
          </div>
          {/* 이름 */}
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">이름</h2>
            <div className="relative rounded-md border-[1px] border-blue-001">
              <input
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
                className="w-full min-w-[280px] rounded-[5px] px-2 py-1"
                placeholder="ex. 010 - 1234 - 5678"
              />
            </div>
          </div>
          {/* 아이디어 분류 */}
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">아이디어 분류</h2>
            <div className="relative rounded-md border-[1px] border-blue-001">
              <input
                className="w-full min-w-[280px] rounded-[5px] px-2 py-1"
                value={"패션 / 뷰티"}
                readOnly
              />
              <span className="absolute bottom-[4px] right-[10px] text-gray-002">
                <FontAwesomeIcon icon={faAngleDown} color="#126DD7" />
              </span>
            </div>
          </div>
          {/* 기타 요청사항 및 전달사항 */}
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">기타 요청사항 및 전달사항</h2>
            <div className="min-h-[18svh] content-center rounded-md border-[1px] border-blue-001">
              <div className="rounded-md bg-white-000 p-2">
                <textarea
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
          <button className="flex flex-row items-center gap-2 font-normal text-gray-002">
            <FontAwesomeIcon icon={faCheck} color="#A0A0A0" />
            <p>[필수] 이용약관 동의</p>
          </button>
          {/* 버튼 - 결제하기 */}
          <div className="flex flex-col gap-3 pt-9">
            <input
              className="w-full rounded-xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] py-3 text-xl font-extrabold text-white-000"
              type="submit"
              value="결제하기"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
