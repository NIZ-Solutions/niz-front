import axios from "axios";

export const postSubscription = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/subscription`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
