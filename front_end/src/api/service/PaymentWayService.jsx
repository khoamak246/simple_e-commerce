import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const GET_FIND_ALL_PAYMENT_WAY = async () => {
  let response = await instance(new Cookie().get("token")).get(
    "/api/v1/paymentWay"
  );
  return response;
};
