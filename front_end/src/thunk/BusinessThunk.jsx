import {
  FIND_ALL_BUSINESS,
  GET_CATEGORIES_PRODUCT,
  GET_FIND_BUSINESS_BY_ID,
  GET_FIND_PRODUCT_BY_BUSINESS_ID,
  GET_FIND_RELATIVE_BUSINESS_BY_NAME,
} from "../api/service/BusinessService";
import { setBusiness } from "../redux/reducers/BusinessSlice";

export const get_business = () => {
  return async function get_business_thunk(dispatch) {
    let response = await FIND_ALL_BUSINESS();
    if (response.status === 200) {
      dispatch(setBusiness(response.data.data));
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const get_relative_busines_by_name = (keyword) => {
  return async function get_relative_busines_by_name_thunk(dispatch, getState) {
    let response = await GET_FIND_RELATIVE_BUSINESS_BY_NAME(keyword);
    if (response.status === 200) {
      return response.data.data;
    } else {
      return false;
    }
  };
};

export const get_product_by_business_id = (businessId) => {
  return async function get_product_by_business_id_thunk(dispatch) {
    let response = await GET_FIND_PRODUCT_BY_BUSINESS_ID(businessId);
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const get_business_by_id = (businessId) => {
  return async function ge_business_by_id_thunk(dispatch) {
    let response = await GET_FIND_BUSINESS_BY_ID(businessId);
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const get_categories_product = (categoriesSearchForm) => {
  return async function get_categories_product_thuk(dispatch, getState) {
    let response = await GET_CATEGORIES_PRODUCT(categoriesSearchForm);
    if (response.status === 200 || response.status === 204) {
      return response.data.data;
    } else {
      console.log(response);
      return false;
    }
  };
};
