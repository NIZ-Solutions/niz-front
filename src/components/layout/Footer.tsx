import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex h-fit w-full snap-start snap-always flex-col justify-center border border-white/10 bg-black/30 px-10 pb-24 pt-16 shadow-lg ring-1 ring-black/5 drop-shadow-lg backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col justify-between gap-10">
        {/* 팀 */}
        <div className="team-container flex w-full flex-col gap-[10px]">
          <p className="font-semibold text-gray-000">팀</p>
          <div className="flex max-w-fit flex-col gap-2 text-sm font-medium text-gray-001">
            <p>회사소개</p>
            <Link to="https://www.instagram.com/niz.kr">인스타그램</Link>
          </div>
        </div>
        {/* 고객센터 */}
        <div className="agent-container flex w-full flex-col gap-[10px]">
          <p className="ext-gray-000 font-semibold">고객센터</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-001">
            <p>전화 : 1234-5678</p>
            <p>이메일 : nizkrhelp@gmail.com</p>
          </div>
        </div>
        {/* Copyright */}
        <div className="agent-container flex w-full flex-col gap-[10px]">
          <p className="font-semibold text-gray-000">
            Copyright ⓒ NIZ. All Rights Reserved
          </p>
          <div className=":text-gray-001 flex flex-col gap-2 text-sm font-medium">
            <p>사업자등록번호 : 123-45-67890 ｜ 통신판매업번호 : 125161</p>
            <p>대표 : 김송하</p>
            <p>서울특별시 금천구 독산로28길 24-11, 101</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
