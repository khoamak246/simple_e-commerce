import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const PUT_UPDATE_USER = async ({ userId, updateUserForm }) => {
  let response = instance(new Cookie().get("token")).put(
    `http://localhost:8080/api/v1/user/${userId}`,
    updateUserForm
  );
  return response;
};

export const PATCH_UPDATE_USER = async ({ userId, updateUserForm }) => {
    let response = instance(new Cookie().get("token")).patch(
      `http://localhost:8080/api/v1/user/${userId}`,
      updateUserForm
    );
    return response;
  };
