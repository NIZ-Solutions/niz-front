import axios from "axios";

export const postSignup = async (
  email: String,
  password: String,
  name: String,
  phone: String,
) => {
  const response = await axios.post(`${process.env.API_BASE_URL}/auth/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      eamil: email,
      password: password,
      name: name,
      phone: phone,
    },
  });
  return response.data;
};

export const postLogin = async (email: String, password: String) => {
  console.log("postLogin");
  const response = await axios.post(`${process.env.API_BASE_URL}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      eamil: email,
      password: password,
    },
  });
  return response.data;
};

export const postLogout = async (refreshToken: String) => {
  const response = await axios.post(`${process.env.API_BASE_URL}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    params: {
      refreshToken: refreshToken,
    },
  });
  return response.data;
};
