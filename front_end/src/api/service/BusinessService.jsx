import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const FIND_ALL_BUSINESS = async () => {
  let response = await instance(new Cookie().get("token")).get(
    "/api/v1/business"
  );
  return response;
};
