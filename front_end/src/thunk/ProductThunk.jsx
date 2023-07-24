import {
  PATCH_UPDATE_PRODUCT,
  PATCH_UPDATE_PRODUCT_OPTION,
  POST_ADD_PRODUCT,
} from "../api/service/ProductService";
import { setShop } from "../redux/reducers/ShopSlice";
import { get_shop_by_user_id } from "./ShopThunk";

export const post_create_new_product = (form) => {
  return async function post_create_new_product(dispatch, getState) {
    const { shop, business } = getState();
    const { businessList, selectBusiness } = business;
    const { businessIndex, subBusinessIndex, childrenBusinessIndex } =
      selectBusiness;
    let businessId;
    let businessSelected = businessList[businessIndex];

    if (childrenBusinessIndex) {
      businessId =
        businessSelected.subBusiness[subBusinessIndex].subBusiness[
          childrenBusinessIndex
        ].id;
    } else {
      businessId = businessSelected.subBusiness[subBusinessIndex].id;
    }

    let createProductForm = {
      ...form,
      shopId: shop.id,
      businessId,
    };

    let response = await POST_ADD_PRODUCT(createProductForm);
    console.log(response);
    if (response.status === 200) {
      dispatch(get_shop_by_user_id()).then((res) => {
        return true;
      });
    } else {
      console.log(response);
      return false;
    }
  };
};

export const patch_update_product_option = (payload) => {
  return async function patch_update_product_option_thunk(dispatch, getState) {
    const { shop } = getState();
    let response = await PATCH_UPDATE_PRODUCT_OPTION(payload);
    if (response.status === 200) {
      dispatch(setShop({ ...shop, products: response.data.data }));
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const patch_update_product = (payload) => {

  return async function patch_update_product_thunk(dispatch, getState) {
    const { shop } = getState();
    let response = await PATCH_UPDATE_PRODUCT(payload);
    if (response.status === 200) {
      dispatch(setShop({ ...shop, products: response.data.data }));
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};
