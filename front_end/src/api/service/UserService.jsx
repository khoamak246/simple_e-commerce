import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const GET_USER_BY_ID = async (userId) => {
  let response = instance(new Cookie().get("token")).get(
    `/api/v1/user/${userId}`
  );
  return response;
};

export const PUT_UPDATE_USER = async ({ userId, updateUserForm }) => {
  let response = instance(new Cookie().get("token")).put(
    `/api/v1/user/${userId}`,
    updateUserForm
  );
  return response;
};

export const PATCH_UPDATE_USER = async ({ userId, updateUserForm }) => {
  let response = instance(new Cookie().get("token")).patch(
    `/api/v1/user/${userId}`,
    updateUserForm
  );
  return response;
};
