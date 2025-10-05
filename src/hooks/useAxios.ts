import { useState, useEffect, useCallback } from "react";

type Status = "Idle" | "Loading" | "Success" | "Error";
interface UseAxiosReturn<T> {
  axiosData: () => void;
  responseData: T | null;
  status: Status;
  sendData: any;
}

const useAxios = <T = any>(
  callback: () => any,
  deps: any[] = [],
  skip = false,
): UseAxiosReturn<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("Idle");

  const axiosData = useCallback(async () => {
    setStatus("Loading");
    try {
      const data = await callback();
      setResponseData(data);
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
      throw error;
    }
  }, deps);

  useEffect(() => {
    if (skip) return;
    axiosData();
  }, deps);

  const sendData = () => {
    axiosData();
  };

  return { axiosData, responseData, status, sendData };
};

export default useAxios;
