import axios from "axios";
const BASE = process.env.REACT_APP_API_BASE_URL as string;

export async function postPaymoentsComplete(
  paymentId: string,
  name: string,
  phone: string,
  email: string,
  advicedAt: string,
  otherText: string,
  accessToken: string,
) {
  const res = await axios.post(
    `${BASE}/payments/complete`,
    {
      paymentId,
      name,
      phone,
      email,
      advicedAt,
      otherText,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );
  return res.data;
}
