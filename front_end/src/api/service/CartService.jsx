import { v1 } from "uuid";
import { instance } from "../Axios";
import Cookie from "universal-cookie";
export const POST_CREATE_NEW_CART_ITEM = async ({
  cartId,
  createCartItemForm,
}) => {
  let response = await instance(new Cookie().get("token")).post(
    `/api/v1/cart/${cartId}/cartItems`,
    createCartItemForm
  );
  return response;
};

export const PATCH_UPDATE_ALL_CART_ITEM_STATUS = async ({ cartId, status }) => {
  let response = await instance(new Cookie().get("token")).patch(
    `/api/v1/cart/cartItems/${cartId}/all-status/${status}`
  );
  return response;
};

export const PATCH_UPDATE_CART_ITEM_STATUS = async (cartItemId) => {
  let response = await instance(new Cookie().get("token")).patch(
    `/api/v1/cart/cartItems/${cartItemId}/status`
  );
  return response;
};

export const PATCH_MINUS_QUANTITY_CART_ITEM_QUANTITY = async (cartItemId) => {
  let response = await instance(new Cookie().get("token")).patch(
    `/api/v1/cart/cartItems/${cartItemId}`
  );
  return response;
};

export const DELETE_CART_ITEM = async (cartItemId) => {
  let response = await instance(new Cookie().get("token")).delete(
    `/api/v1/cart/cartItems/${cartItemId}`
  );
  return response;
};
