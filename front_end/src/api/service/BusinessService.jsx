import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const GET_CATEGORIES_PRODUCT = async (categoriesSearchForm) => {
  let response = await instance().post(
    `/api/v1/business/search-product-business`,
    categoriesSearchForm
  );
  return response;
};

export const GET_FIND_RELATIVE_BUSINESS_BY_NAME = async (keyword) => {
  console.log(keyword);
  let response = await instance().get(
    `/api/v1/business/search?keyword=${keyword}`
  );
  return response;
};

export const FIND_ALL_BUSINESS = async () => {
  let response = await instance().get("/api/v1/business");
  return response;
};

export const GET_FIND_BUSINESS_BY_ID = async (businessId) => {
  let response = await instance().get(`/api/v1/business/${businessId}`);
  return response;
};

export const GET_FIND_PRODUCT_BY_BUSINESS_ID = async (businessId) => {
  let response = await instance().get(`/api/v1/business/product/${businessId}`);
  return response;
};
