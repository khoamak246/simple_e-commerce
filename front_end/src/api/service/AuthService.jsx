import { instance } from "../Axios";

export const POST_REGISTER = async (registerForm) => {
  let response = await instance().post("/api/auth/register", registerForm);
  return response;
};

export const POST_LOGIN = async (loginForm) => {
  let response = await instance().post("/api/auth/login", loginForm);
  return response;
};
