import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const GET_FIND_ALL_ADDRESS = async () => {
  let response = await instance(new Cookie().get("token")).get(
    "/api/v1/address"
  );
  return response;
};

export const POST_CREATE_NEW_USER_ADDRESS = async (createUserAddressForm) => {
  let response = await instance(new Cookie().get("token")).post(
    "/api/v1/address/user-address",
    createUserAddressForm
  );
  return response;
};

export const PATCH_UPDATE_USER_ADDRESS = async ({
  userAddressId,
  createUserAddressForm,
}) => {
  let response = await instance(new Cookie().get("token")).patch(
    `/api/v1/address/user-address/${userAddressId}`,
    createUserAddressForm
  );
  return response;
};
