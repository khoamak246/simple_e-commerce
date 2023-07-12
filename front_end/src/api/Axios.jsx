import axios from "axios";

export const instance = (token) => {
  if (!token) {
    token = "";
  }
  const defaultOption = {
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  let instance = axios.create(defaultOption);
  instance.interceptors.response.use(
    (response) => response,
    (error) => error.response
  );
  return instance;
};
