import {
  PATCH_UPDATE_ORDER_ITEM,
  POST_CREATE_NEW_ORDER,
} from "../api/service/OrderService";
import { get_shop_by_user_id } from "./ShopThunk";
import { get_user_by_id } from "./UserThunk";

export const post_create_new_order = (payload) => {
  return async function post_create_new_order_thunk(dispatch, getState) {
    const { user } = getState();
    let userId = user.id;

    let createOrderForm = { userId, ...payload };
    let response = await POST_CREATE_NEW_ORDER(createOrderForm);
    if (response.status === 200) {
      let res = await dispatch(get_user_by_id());
      if (res) {
        return true;
      }
    } else {
      console.log(response);
      return false;
    }
  };
};

export const patch_update_order_item_status = (payload) => {
  return async function patch_update_order_item_status_thunk(
    dispatch,
    getState
  ) {
    let response = await PATCH_UPDATE_ORDER_ITEM(payload);
    if (response.status === 200) {
      await dispatch(get_shop_by_user_id());
      await dispatch(get_user_by_id());
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};
