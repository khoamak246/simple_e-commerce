import { POST_CREATE_NEW_ORDER } from "../api/service/OrderService";
import { get_user_by_id } from "./UserThunk";

export const post_create_new_order = (payload) => {
  return async function post_create_new_order_thunk(dispatch, getState) {
    const { user } = getState();
    let userId = user.id;

    let createOrderForm = { userId, ...payload };
    let response = await POST_CREATE_NEW_ORDER(createOrderForm);
    if (response.status === 200) {
      dispatch(get_user_by_id()).then((res) => {
        if (res) {
          return true;
        }
      });
    } else {
      console.log(response);
      return false;
    }
  };
};
