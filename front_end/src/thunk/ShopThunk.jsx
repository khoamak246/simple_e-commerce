import {
  GET_FIND_BY_USER_ID,
  PATCH_UPDATE_SHOP_PROFILE,
  POST_SAVE_NEW_SHOP,
} from "../api/service/ShopService";
import { setShop } from "../redux/reducers/ShopSlice";
import { handleTakeIdFromSelectAddress } from "../utils/Utils";

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
