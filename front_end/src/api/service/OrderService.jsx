import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const POST_CREATE_NEW_ORDER = async (createOrderForm) => {
  let response = await instance(new Cookie().get("token")).post(
    "/api/v1/order",
    createOrderForm
  );
  return response;
};
