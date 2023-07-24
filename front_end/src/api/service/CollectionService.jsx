import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const POST_SAVE_NEW_COLLECTION = async (createCollectionForm) => {
  let response = await instance(new Cookie().get("token")).post(
    "/api/v1/collection",
    createCollectionForm
  );
  return response;
};

export const PATCH_UPDATE_COLLECTION = async ({
  collectionId,
  updateCollectionForm,
}) => {
  let response = await instance(new Cookie().get("token")).patch(
    `/api/v1/collection/${collectionId}`,
    updateCollectionForm
  );
  return response;
};

export const DELETE_COLLECTION = async (collectionId) => {
  let response = await instance(new Cookie().get("token")).delete(
    `/api/v1/collection/${collectionId}`
  );
  return response;
};
