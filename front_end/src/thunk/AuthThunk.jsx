import { POST_LOGIN, POST_REGISTER } from "../api/service/AuthService";
import { resetAddress } from "../redux/reducers/AddressSlice";
import { resetAuth, setAuth } from "../redux/reducers/AuthSlice";
import { resetBusiness } from "../redux/reducers/BusinessSlice";
import { resetRoom } from "../redux/reducers/RoomSlice";
import { resetShop } from "../redux/reducers/ShopSlice";
import { resetToggle } from "../redux/reducers/ToggleSlice";
import { resetUser, setUser } from "../redux/reducers/UserSlice";
import Cookie from "universal-cookie";

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

export const handle_log_out = () => {
  return async function handle_log_out_thunk(dispatch) {
    const cookies = new Cookie();
    cookies.remove("token", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.remove("password", { path: "/" });
    dispatch(resetAuth());
    dispatch(resetUser());
    dispatch(resetToggle());
    dispatch(resetShop());
    dispatch(resetRoom());

    return true;
  };
};
