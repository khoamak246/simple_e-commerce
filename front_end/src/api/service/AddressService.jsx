import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const GET_FIND_ALL_ADDRESS = async () => {
  let response = await instance(new Cookie().get("token")).get(
    "/api/v1/address"
  );
  return response;
};
