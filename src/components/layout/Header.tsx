import { Link, useLocation } from "react-router-dom";
import HeaderLogo from "../../assets/logo.png";

// import { useEffect } from "react";

export default function Header() {
  const location = useLocation();

  const loggedIn = false;

  return (
    <header className="fixed left-0 right-0 top-0 flex min-h-[60px] w-full flex-row items-center justify-between bg-white px-5 shadow-lg">
      {/* 로고 */}
      <Link to="/" className="flex gap-[10px]">
        <img className="w-[30px]" src={HeaderLogo} alt="logo" />
        <div className="text-blue-001 text-logo">NIZ</div>
      </Link>

      {/* 로그인 or 마이 페이지 or 로그아웃 텍스트 */}
      <div className="text-base font-semibold text-blue-001">
        {loggedIn ? (
          location.pathname.includes("/mypage") ? (
            <button> 로그아웃 </button>
          ) : (
            <Link to="/mypage"> 마이페이지 </Link>
          )
        ) : (
          <Link to="/login"> 로그인 </Link>
        )}
      </div>
    </header>
  );
}
