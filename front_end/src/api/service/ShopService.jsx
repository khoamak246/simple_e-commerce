import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const POST_SAVE_NEW_SHOP = async (createShopForm) => {
  let response = instance(new Cookie().get("token")).post(
    "/api/v1/shop",
    createShopForm
  );
  return response;
};

export const GET_FIND_BY_USER_ID = async (userId) => {
  let response = instance(new Cookie().get("token")).get(
    `/api/v1/shop/user/${userId}`
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
