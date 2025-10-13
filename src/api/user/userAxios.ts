// userAxios.ts
import axios from "axios";

const BASE = process.env.REACT_APP_API_BASE_URL as string;

export async function postSignup(
  userId: string,
  password: string,
  name: string,
  phone: string,
  termsOfService: boolean,
  privacyPolicy: boolean,
  paymentPolicy: boolean,
  // marketingOptIn: boolean,
) {
  const res = await axios.post(
    `${BASE}/auth/signup`,
    {
      userId,
      password,
      name,
      phone,
      termsOfService,
      privacyPolicy,
      paymentPolicy,
      // marketingOptIn,
    },
    { headers: { "Content-Type": "application/json" } },
  );
  return res.data;
}

export async function postLogin(userId: string, password: string) {
  const res = await axios.post(
    `${BASE}/auth/login`,
    { userId, password },
    { headers: { "Content-Type": "application/json" } },
  );
  return res.data;
}

export async function postLoginWithHandledError(
  userId: string,
  password: string,
) {
  try {
    const res = await axios.post(
      `${BASE}/auth/login`,
      { userId, password },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      const msg = e.response?.data?.error?.message ?? e.message;
      throw new Error(msg);
    }
    throw e;
  }
}

export async function postRefresh(refreshToken: string) {
  const res = await axios.post(
    `${BASE}/auth/refresh`,
    { refreshToken },
    { headers: { "Content-Type": "application/json" } },
  );
  return res.data;
}

export async function postKakaoLogin(code: string) {
  const res = await axios.post(
    `${BASE}/auth/kakao/redirect`,
    { code },
    { headers: { "Content-Type": "application/json" } },
  );
  return res.data;
}

export async function postLogout(accessToken: string, refreshToken: string) {
  const res = await axios.post(
    `${BASE}/auth/logout`,
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
}
