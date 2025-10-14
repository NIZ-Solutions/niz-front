import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAppSelector } from "./useSelector";
import { useAppDispatch } from "./useDispatch";
import { login, logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Login from "./../pages/Login";

type Status = "Idle" | "Loading" | "Success" | "Error" | "Refresh";
interface UseAxiosReturn<T> {
  axiosData: () => Promise<void>;
  responseData: T | null;
  status: Status;
  error: unknown | null;
}
const getErrorMessage = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    const srvMsg =
      (e.response?.data as any)?.error?.message ??
      (e.response?.data as any)?.message;
    return srvMsg || e.message || "알 수 없는 오류가 발생했습니다.";
  }
  if (e instanceof Error) return e.message;
  return String(e);
};

const useAxios = <T>(
  callback: (accessToken?: string) => Promise<T>,
  deps: any[] = [],
  skip = false,
): UseAxiosReturn<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("Idle");
  const [error, setError] = useState<unknown | null>(null);
  const user = useAppSelector((state) => state.user).data;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const axiosData = useCallback(async () => {
    setStatus("Loading");
    setError(null);
    try {
      const curAccess = user?.accessToken;
      const data = await callback(curAccess);
      setResponseData(data);
      setStatus("Success");
    } catch (err) {
      console.error("request failed:", err);
      const isAuthError =
        (axios.isAxiosError(err) && err.response?.status === 401) ||
        getErrorMessage(err) === "인증 실패";
      if (isAuthError) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
            { refreshToken: user?.refreshToken },
            { headers: { "Content-Type": "application/json" } },
          );
          dispatch(
            login({
              refreshToken: res.data.data.refreshToken,
              accessToken: res.data.data.accessToken,
              id: user?.id!,
              userId: user?.userId!,
              name: user?.name!,
              phone: user?.phone!,
              createdAt: user?.createdAt!,
            }),
          );
          console.log(res.data.data?.accessToken, "newAcc");
          setStatus("Refresh");
        } catch (e) {
          setStatus("Error");
          setError(e);
          dispatch(logout());
          navigate("/");
          alert("재로그인이 필요합니다!");
        }
      } else {
        setStatus("Error");
        setError(err);
        alert(getErrorMessage(err));
        navigate("/");
      }
    }
  }, [callback, dispatch, navigate, user?.refreshToken]);

  useEffect(() => {
    if (skip) return;
    void axiosData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosData, skip, ...deps]);

  return { axiosData, responseData, status, error };
};

export default useAxios;
