import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const POST_SAVE_NEW_SHOP = async (createShopForm) => {
  let response = instance(new Cookie().get("token")).post(
    "/api/v1/shop",
    createShopForm
  );
  return response;
};
