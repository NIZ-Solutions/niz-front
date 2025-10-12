import { Link } from "react-router-dom";

export default function Submit() {
  const price = "49900";
  // const orderNum = paymentId;
  const infoDate = "2025-10-26 , 11 : 00";
  const textPrice = price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="flex w-full flex-col items-center justify-between pl-4 pr-5 text-black-000 min-[340px]:px-7 md:pb-0">
      <div className="flex min-h-screen w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-20 pb-[180px] pt-[180px] text-center lg:px-0">
        <div className="flex flex-col gap-8 text-3xl font-bold text-blue-001 md:min-w-[50%]">
          <div className="flex flex-col gap-2">
            <h1>결제완료</h1>
            <p>금액 : {textPrice}원</p>
          </div>
          <p className="text-base font-normal text-black-000">주문번호 : {}</p>
        </div>
        <div className="flex min-w-full flex-col gap-5 text-xl md:min-w-[40%]">
          <p className="font-extrabold text-blue-001">{infoDate}</p>
          <p>상담을 위해 연락 드리겠습니다</p>
          <div></div>
          <p>감사합니다</p>
          <div className="flex w-full flex-col gap-4">
            {/* 버튼 - 마이페이지 */}
            <div className="flex flex-col gap-3 pt-9">
              <Link
                to="/mypage"
                className="w-full rounded-xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] py-3 text-xl font-extrabold text-white-000"
                type="submit"
              >
                마이페이지
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
