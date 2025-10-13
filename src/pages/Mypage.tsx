import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";

export default function Mypage() {
  const name = "박미현";
  const money = "5000";
  const textMoney = money.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="flex min-h-screen w-full flex-col overflow-auto text-black-000 dark:text-gray-001">
      {/* 내 정보 컨테이너 */}
      {/* <div className="flex min-h-fit w-full min-w-[280px] max-w-screen-lg flex-col justify-center gap-3 self-center px-7 pt-[120px] md:mb-auto md:h-fit md:justify-start md:text-center">
        <h1 className="text-4xl font-extrabold leading-[50px] md:mr-0 md:min-w-[50%]">
          내 정보
        </h1>
        <p className="text-2xl font-medium md:pb-5">
          사용 가능 금액&nbsp;:&nbsp;
          <p className="inline text-blue-001">{textMoney}</p>
          <p className="inline text-blue-001">&nbsp;원</p>
        </p>
        // {/* 계좌 정보 컨테이너 */}
      {/* <div className="relative flex flex-col gap-5 rounded-lg bg-gray-000 p-5 text-gray-003 md:text-left">
          <h1 className="">{name}님 충전 가상계좌 안내</h1>
          <p className="text-xl font-medium">
            하나은행 <br />
            222 - 910254 - 17907
          </p>
          <p className="text-xs">* 환불은 고객센터를 통해 접수 가능합니다.</p>
          <FontAwesomeIcon
            icon={faClipboard}
            className="w-fitmain-gradient absolute right-[20px] h-[24px]"
            color="#126DD7"
          />
        </div>
      </div>  */}
      {/* 신청내역 컨테이너 */}
      <div className="flex min-h-fit w-full min-w-[280px] max-w-screen-lg flex-col justify-center gap-3 self-center px-7 pb-[120px] pt-[120px] md:min-h-screen md:justify-start md:overflow-scroll md:overflow-x-hidden md:text-center">
        <h1 className="mr-auto text-4xl font-extrabold leading-[50px] md:mr-0 md:min-w-[50%] dark:text-white-000">
          신청내역
        </h1>
        <p className="pb-5 text-sm text-gray-003 dark:text-gray-001">
          상담 변경은 고객센터를 통해 부탁드립니다.
        </p>
        {/* 신청내역 리스트*/}
        <div className="flex flex-col gap-12 md:text-left">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row text-lg">
              <p className="font-medium">상태 :&nbsp;</p>
              <p className="font-semibold text-blue-001">상담 진행 완료</p>
            </div>
            <div className="flex flex-row text-lg font-medium">
              <p className="">주문번호 :&nbsp;</p>
              <p className="">EsTMGzIeLH</p>
            </div>
            <div className="dark:bg-gray-005 relative mt-2 flex flex-col gap-2 rounded-lg bg-gray-000 p-5 md:text-left">
              <p className="">이름 :&nbsp;{name}</p>
              <p className="">이메일 주소 :&nbsp;pmh3853@naver.com</p>
              <p className="">연락처 :&nbsp;010-4104-3853</p>
              <p className="">아이디어 분류 :&nbsp;의료기기</p>
              <p className="">
                기타 요청사항 및 전달사항 :&nbsp;
                <br />뭐 이렇게 해주시고 저렇게해주시고 이런이런 아이디어가
                있는데 이건 이렇게 ㅐ주실수있는지 궁금하고 이걸
                이렇게해주십사...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
