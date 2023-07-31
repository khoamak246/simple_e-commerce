import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const GET_ROOM_BY_USER_ID = async (userId) => {
  let response = await instance(new Cookie().get("token")).get(
    `/api/v1/userRoom/user/${userId}`
  );
  return response;
};

export const POST_CREATE_ROOM = async (roomCreateForm) => {
  let response = await instance(new Cookie().get("token")).post(
    `/api/v1/userRoom`,
    roomCreateForm
  );
  return response;
};

export const PATCH_UPDATE_LAST_ACCESS_ROOM = async (userRoomId) => {
  let response = await instance(new Cookie().get("token")).patch(
    `/api/v1/userRoom/updateLasted/${userRoomId}`
  );
  return response;
};
