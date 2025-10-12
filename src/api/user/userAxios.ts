import axios from "axios";

export const postSignup = async (
  userId: String,
  password: String,
  name: String,
  phone: String,
  termsOfService: Boolean,
  privacyPolicy: Boolean,
  paymentPolicy: Boolean,
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/auth/signup`,
    {
      userId,
      password,
      name,
      phone,
      termsOfService,
      privacyPolicy,
      paymentPolicy,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const postLogin = async (userId: String, password: String) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
    { userId, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const postRefresh = async (refreshToken: String) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
    { refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const postLogout = async (refreshToken: String) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/auth/logout`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      params: {
        refreshToken: refreshToken,
      },
    },
  );
  return response.data;
};
