import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export default function Submit() {
  const price = "3800";
  const textPrice = price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="flex w-full flex-col items-center px-7 pb-[120px]">
      <div className="flex min-h-screen w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-8 pt-[120px] text-center md:flex-row md:justify-between lg:px-0">
        <div className="flex flex-col gap-8">
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
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">상담 희망일</h2>
            <div className="relative rounded-md p-[1px] main-gradient">
              <input
                className="w-full min-w-[280px] rounded-md px-2 py-1"
                value={"2025 - 10 - 02"}
                readOnly
              />
              <span className="absolute bottom-[4px] right-[10px] text-gray-002">
                <FontAwesomeIcon icon={faCalendarDays} color="#126DD7" />
              </span>
            </div>
          </div>
          {/* 상담 희망 시간 */}
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">상담 희망 시간</h2>
            <div className="relative rounded-md p-[1px] main-gradient">
              <input
                className="w-full min-w-[280px] rounded-md px-2 py-1"
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
            <div className="relative rounded-md p-[1px] main-gradient">
              <input
                className="w-full min-w-[280px] rounded-md px-2 py-1"
                placeholder="ex. 박니즈"
              />
            </div>
          </div>
          {/* 전화번호 */}
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">전화번호</h2>
            <div className="relative rounded-md p-[1px] main-gradient">
              <input
                className="w-full min-w-[280px] rounded-md px-2 py-1"
                placeholder="ex. 010-1234-5678"
              />
            </div>
          </div>
          {/* 아이디어 분류 */}
          <div className="flex w-full flex-col gap-1 text-left font-medium">
            <h2 className="">아이디어 분류</h2>
            <div className="relative rounded-md p-[1px] main-gradient">
              <input
                className="w-full min-w-[280px] rounded-md px-2 py-1"
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
            <div className="min-h-[18svh] content-center rounded-md p-[1px] main-gradient">
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
          {/* 버튼 - 결제하기 */}
          <div className="flex flex-col gap-3">
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
