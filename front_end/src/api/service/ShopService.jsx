import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const GET_FIND_SHOP_BY_ID = async (shopId) => {
  let response = instance().get(`/api/v1/shop/${shopId}`);
  return response;
};

export const GET_FIND_BY_USER_ID = async (userId) => {
  let response = instance(new Cookie().get("token")).get(
    `/api/v1/shop/user/${userId}`
  );
  return response;
};

export const POST_SAVE_NEW_SHOP = async (createShopForm) => {
  let response = instance(new Cookie().get("token")).post(
    "/api/v1/shop",
    createShopForm
  );
  return response;
};

export const POST_SAVE_NEW_FOLLOWER = async ({ shopId, userId }) => {
  let response = instance(new Cookie().get("token")).post(
    `/api/v1/shop/follower/${shopId}/${userId}`
  );
  return response;
};

export const PATCH_UPDATE_SHOP_PROFILE = async ({ shopId, updateShopForm }) => {
  let response = instance(new Cookie().get("token")).patch(
    `/api/v1/shop/${shopId}`,
    updateShopForm
  );
  return response;
};

export const GET_SHOP_REVENUE_MANAGEMENT = async ({ shopId, year }) => {
  let response = instance(new Cookie().get("token")).get(
    `/api/v1/shop/revenue-management/${shopId}/${year}`
  );
  return response;
};

export const GET_SHOP_SALE_MANAGEMENT = async (shopId) => {
  let response = instance(new Cookie().get("token")).get(
    `/api/v1/shop/sale-management/${shopId}`
  );
  return response;
};
