import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useSelector";
import HeaderLogo from "../../assets/logo.png";
import { useAppDispatch } from "../../hooks/useDispatch";
import { logout } from "../../store/userSlice";
import useAxios from "../../hooks/useAxios";
import { postLogout } from "../../api/user/userAxios";
import { useEffect } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.user).data;
  const loggedIn = user !== null ? true : false;
  const isLanding = location.pathname.includes("landingpages");

  // 로그아웃
  const resPostLogout = useAxios(
    () => postLogout(user?.accessToken!, user?.refreshToken!),
    [user?.refreshToken],
    true,
  );
  const handleLogout = () => {
    resPostLogout.axiosData();
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (resPostLogout.status === "Success" && resPostLogout.responseData) {
      dispatch(logout());
      setTimeout(() => {
        window.location.replace("/");
      }, 500);
    }
    if (resPostLogout.status === "Refresh") {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resPostLogout.status, resPostLogout.responseData, dispatch, navigate]);

  return (
    <>
      {isLanding ? (
        <></>
      ) : (
        <nav className="fixed inset-x-0 top-0 z-50">
          <div className="navbar-container flex w-screen justify-center border border-white/10 bg-black/30 shadow-lg ring-1 ring-black/5 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:backdrop-blur-md">
            <div className="navbar flex w-full max-w-screen-lg flex-row items-center justify-between px-4">
              {/* 로고 */}
              <Link to="/" className="flex items-center gap-2">
                <img className="w-[30px]" src={HeaderLogo} alt="logo" />
                <div className="text-blue-001 text-logo">NIZ</div>
              </Link>

              {/* 로그인 / 마이페이지 / 로그아웃 */}
              <div className="text-base font-semibold text-blue-001">
                {loggedIn ? (
                  location.pathname.includes("/mypage") ? (
                    <button
                      onClick={handleLogout}
                      className="transition-opacity hover:opacity-80"
                    >
                      로그아웃
                    </button>
                  ) : (
                    <Link
                      to="/mypage"
                      className="transition-opacity hover:opacity-80"
                    >
                      마이페이지
                    </Link>
                  )
                ) : location.pathname.includes("/login") ? (
                  <></>
                ) : (
                  <Link
                    to="/login"
                    className="transition-opacity hover:opacity-80"
                  >
                    로그인
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
