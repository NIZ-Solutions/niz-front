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
  console.log(user);
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
      navigate("/");
    }
  }, [resPostLogout.status, resPostLogout.responseData, dispatch, navigate]);

  return (
    <>
      {isLanding ? (
        <></>
      ) : (
        <nav className="fixed left-0 right-0 top-0 z-50 flex min-h-[60px] flex-row justify-center bg-white px-7 shadow-lg dark:bg-black-001">
          <div className="flex w-full max-w-screen-lg items-center justify-between">
            {/* 로고 */}
            <Link to="/" className="flex gap-[10px]">
              <img className="w-[30px]" src={HeaderLogo} alt="logo" />
              <div className="text-blue-001 text-logo">NIZ</div>
            </Link>
            {/* 로그인 or 마이 페이지 or 로그아웃 텍스트 */}
            <div className="text-base font-semibold text-blue-001">
              {loggedIn ? (
                location.pathname.includes("/mypage") ? (
                  <button onClick={handleLogout}> 로그아웃 </button>
                ) : (
                  <Link to="/mypage"> 마이페이지 </Link>
                )
              ) : location.pathname.includes("/login") ? (
                <></>
              ) : (
                <Link to="/login"> 로그인 </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
