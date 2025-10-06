import axios from "axios";

export const postSignup = async (
  email: String,
  password: String,
  name: String,
  phone: String,
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/auth/signup`,
    { email, password, name, phone },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const postIdCheck = async (email: String) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/auth/idcheck`,
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const postLogin = async (email: String, password: String) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
    { email, password },
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
    `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
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
