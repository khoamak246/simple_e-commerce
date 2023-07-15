import { instance } from "../Axios";
import Cookie from "universal-cookie";


export const POST_ADD_PRODUCT = async (createProductForm) => {
  let response = await instance(new Cookie().get("token")).post(
    "/api/v1/product",
    createProductForm
  );
  return response;
};
