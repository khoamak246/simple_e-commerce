import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const POST_CREATE_NEW_ORDER = async (createOrderForm) => {
  let response = await instance(new Cookie().get("token")).post(
    "/api/v1/order",
    createOrderForm
  );
  return response;
};

export const PATCH_UPDATE_ORDER_ITEM = async ({
  orderItemId,
  orderStatusForm,
}) => {
  let response = await instance(new Cookie().get("token")).patch(
    `/api/v1/order/orderItem/${orderItemId}/status`,
    orderStatusForm
  );
  return response;
};
