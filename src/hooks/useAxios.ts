// useAxios.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

type Status = "Idle" | "Loading" | "Success" | "Error";
interface UseAxiosReturn<T> {
  axiosData: () => Promise<void>;
  responseData: T | null;
  status: Status;
  error: unknown | null;
}
const getErrorMessage = (e: unknown) => {
  // AxiosError인지 확인하고 서버 메시지 우선 추출
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
  callback: () => Promise<T>,
  deps: any[] = [],
  skip = false,
): UseAxiosReturn<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("Idle");
  const [error, setError] = useState<unknown | null>(null);

  const axiosData = useCallback(async () => {
    setStatus("Loading");
    setError(null);
    try {
      const data = await callback();
      setResponseData(data);
      setStatus("Success");
    } catch (e) {
      setStatus("Error");
      setError(e);
      alert(getErrorMessage(e));
    }
  }, [callback]);

  useEffect(() => {
    if (skip) return;
    void axiosData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosData, skip, ...deps]);

  return { axiosData, responseData, status, error };
};

export default useAxios;
