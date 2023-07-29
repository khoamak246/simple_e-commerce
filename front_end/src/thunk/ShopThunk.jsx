import {
  GET_FIND_BY_USER_ID,
  GET_FIND_SHOP_BY_ID,
  GET_SHOP_REVENUE_MANAGEMENT,
  GET_SHOP_SALE_MANAGEMENT,
  PATCH_UPDATE_SHOP_PROFILE,
  POST_SAVE_NEW_FOLLOWER,
  POST_SAVE_NEW_SHOP,
} from "../api/service/ShopService";
import { setShop } from "../redux/reducers/ShopSlice";
import { handleTakeIdFromSelectAddress } from "../utils/Utils";

export const get_shop_by_id = (shopId) => {
  return async function get_shop_by_id_thunk(dispatch, getState) {
    let response = await GET_FIND_SHOP_BY_ID(shopId);
    if (response.status === 200) {
      return response.data.data;
    } else {
      return false;
    }
  };
};

export const get_shop_by_user_id = () => {
  return async function get_shop_by_user_id_thunk(dispatch, getState) {
    let { user } = getState();
    let response = await GET_FIND_BY_USER_ID(user.id);
    if (response.status === 200) {
      dispatch(setShop(response.data.data));
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const post_save_new_shop = (createInfoForm) => {
  return async function post_save_new_shop_thunk(dispatch, getState) {
    const { user, address } = getState();

    let selectAddress = handleTakeIdFromSelectAddress(address);
    let createShopForm = {
      name: createInfoForm.shopName,
      streetDetail: createInfoForm.streetDetail,
      userId: user.id,
      ...selectAddress,
    };

    let response = await POST_SAVE_NEW_SHOP(createShopForm);
    if (response.status === 200) {
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const post_save_new_follower = (shopId) => {
  return async function post_save_new_follower_thunk(dispatch, getState) {
    const { user } = getState();

    let response = await POST_SAVE_NEW_FOLLOWER({ shopId, userId: user.id });
    if (response.status === 200) {
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const patch_update_shop_profile = (updateShopForm) => {
  return async function patch_update_shop_profile_thunk(dispatch, getState) {
    const { shop } = getState();
    let response = await PATCH_UPDATE_SHOP_PROFILE({
      shopId: shop.id,
      updateShopForm,
    });
    if (response.status == 200) {
      dispatch(setShop(response.data.data));
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const get_shop_revenue_management = (payload) => {
  return async function get_shop_revenue_management_thunk(dispatch, getState) {
    const { shop } = getState();
    let response = await GET_SHOP_REVENUE_MANAGEMENT({
      shopId: shop.id,
      year: payload,
    });
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const get_shop_sale_management = () => {
  return async function get_shop_sale_management_thunk(dispatch, getState) {
    const { shop } = getState();
    let response = await GET_SHOP_SALE_MANAGEMENT(shop.id);
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log(response);
      return false;
    }
  };
};
