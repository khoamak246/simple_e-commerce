import {
  DELETE_CART_ITEM,
  PATCH_MINUS_QUANTITY_CART_ITEM_QUANTITY,
  PATCH_UPDATE_ALL_CART_ITEM_STATUS,
  PATCH_UPDATE_CART_ITEM_STATUS,
  POST_CREATE_NEW_CART_ITEM,
} from "../api/service/CartService";
import { setUser } from "../redux/reducers/UserSlice";

export const post_create_new_cart_item = (createCartItemForm) => {
  return async function post_create_new_cart_item_thunk(dispatch, getState) {
    const { user } = getState();

    let cartId = user.userInfo.cart.id;
    let response = await POST_CREATE_NEW_CART_ITEM({
      cartId,
      createCartItemForm,
    });
    if (response.status === 200) {
      dispatch(
        setUser({
          ...user,
          userInfo: { ...user.userInfo, cart: response.data.data },
        })
      );
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const patch_udpate_status_all_cart_item = (status) => {
  return async function patch_udpate_status_all_cart_item_thunk(
    dispatch,
    getState
  ) {
    const { user } = getState();
    let cartId = user.userInfo.cart.id;
    let response = await PATCH_UPDATE_ALL_CART_ITEM_STATUS({
      cartId,
      status: !status,
    });
    if (response.status === 200) {
      dispatch(
        setUser({
          ...user,
          userInfo: { ...user.userInfo, cart: response.data.data },
        })
      );
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const patch_udpate_status_cart_item = (cartItemId) => {
  return async function patch_udpate_status_cart_item_thunk(
    dispatch,
    getState
  ) {
    const { user } = getState();
    let response = await PATCH_UPDATE_CART_ITEM_STATUS(cartItemId);
    if (response.status === 200) {
      dispatch(
        setUser({
          ...user,
          userInfo: { ...user.userInfo, cart: response.data.data },
        })
      );
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const patch_minus_quantity_cart_item = (cartItemId) => {
  return async function patch_minus_quantity_cart_item_thunk(
    dispatch,
    getState
  ) {
    const { user } = getState();
    let response = await PATCH_MINUS_QUANTITY_CART_ITEM_QUANTITY(cartItemId);
    if (response.status === 200) {
      dispatch(
        setUser({
          ...user,
          userInfo: { ...user.userInfo, cart: response.data.data },
        })
      );
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const delete_cart_item = (cartItemId) => {
  return async function delete_cart_item_thunk(dispatch, getState) {
    const { user } = getState();
    let response = await DELETE_CART_ITEM(cartItemId);
    if (response.status === 200) {
      dispatch(
        setUser({
          ...user,
          userInfo: { ...user.userInfo, cart: response.data.data },
        })
      );
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};
