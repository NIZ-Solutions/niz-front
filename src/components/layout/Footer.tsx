import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-start justify-between bg-gray-000 px-10 pb-24 pt-16 shadow-lg dark:bg-[#1a1919]">
      <div className="flex max-w-screen-lg flex-col justify-between gap-10">
        {/* 팀 */}
        <div className="team-container flex flex-col gap-[10px]">
          <p className="font-semibold text-gray-003">팀</p>
          <div className="flex max-w-fit flex-col gap-2 text-sm font-medium text-gray-002">
            <p>회사소개</p>
            <Link to="https://www.instagram.com/niz.kr">인스타그램</Link>
          </div>
        </div>
        {/* 고객센터 */}
        <div className="agent-container flex flex-col gap-[10px]">
          <p className="font-semibold text-gray-003">고객센터</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-002">
            <p>전화 : 1234-5678</p>
            <p>이메일 : nizkrhelp@gmail.com</p>
          </div>
        </div>
        {/* Copyright */}
        <div className="agent-container flex flex-col gap-[10px]">
          <p className="font-semibold text-gray-003">
            Copyright ⓒ NIZ. All Rights Reserved
          </p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-002">
            <p>사업자등록번호 : 123-45-67890 ｜ 통신판매업번호 : 125161</p>
            <p>대표 : 김송하</p>
            <p>서울특별시 금천구 독산로28길 24-11, 101</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
