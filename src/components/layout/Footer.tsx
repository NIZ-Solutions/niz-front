import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-between bg-gray-000 px-10 pb-24 pt-10 shadow-lg">
      <div className="flex w-full max-w-screen-xl flex-col justify-between gap-10">
        {/* 팀 */}
        <div className="team-container flex flex-col gap-[10px]">
          <p className="font-semibold text-gray-003">팀</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-002">
            <p>회사소개</p>
            <Link to="https://www.instagram.com/niz.kr">인스타그램</Link>
          </div>
        </div>
        {/* 고객센터 */}
        <div className="agent-container flex flex-col gap-[10px]">
          <p className="font-semibold text-gray-003">고객센터</p>
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-002">
            <p>이메일 : nizkrhelp@gmail.com</p>
          </div>
        </div>
        {/* Copyright */}
        <div className="agent-container flex flex-col gap-[10px]">
          <p className="font-semibold text-gray-003">
            Copyright ⓒ NIZ. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
