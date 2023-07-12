import { POST_LOGIN, POST_REGISTER } from "../api/service/AuthService";
import { setAuth } from "../redux/reducers/AuthSlice";
import { setUser } from "../redux/reducers/UserSlice";

export const post_register = (registerForm) => {
  return async function post_register_thunk(dispatch) {
    let response = await POST_REGISTER(registerForm);
    if (response.status == 200) {
      return true;
    } else {
      console.log(response);
      return response.data.message;
    }
  };
};

export const post_login = (loginForm) => {
  return async function post_login_thunk(dispatch) {
    let response = await POST_LOGIN(loginForm);
    if (response.status == 200) {
      const { token, type, expiredTime, roles, user } = response.data;
      delete user.roles;
      dispatch(setAuth({ token, type, expiredTime, roles }));
      dispatch(setUser(user));
      return response.data;
    } else {
      console.log(response);
      return null;
    }
  };
};
