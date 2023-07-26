import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const POST_ADD_PRODUCT = async (createProductForm) => {
  let response = await instance(new Cookie().get("token")).post(
    "/api/v1/product",
    createProductForm
  );
  return response;
};

export const PATCH_UPDATE_PRODUCT_OPTION = async ({
  productOptionId,
  updateProductOptionForm,
}) => {
  let response = instance(new Cookie().get("token")).patch(
    `/api/v1/productOptions/${productOptionId}`,
    updateProductOptionForm
  );
  return response;
};

export const PATCH_UPDATE_PRODUCT = async ({
  productId,
  updateProductForm,
}) => {
  let response = instance(new Cookie().get("token")).patch(
    `/api/v1/product/${productId}`,
    updateProductForm
  );
  return response;
};

export const GET_FIND_PRODUCT_BY_ID = async (productId) => {
  let response = instance(new Cookie().get("token")).get(
    `/api/v1/product/${productId}`
  );
  return response;
};

export const POST_SAVE_FAVORITES = async ({ productId, userId }) => {
  let response = instance(new Cookie().get("token")).post(
    `/api/v1/product/${productId}/favorites/${userId}`
  );
  return response;
};
