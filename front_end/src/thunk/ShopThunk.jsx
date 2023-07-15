import {
  GET_FIND_BY_USER_ID,
  POST_SAVE_NEW_SHOP,
} from "../api/service/ShopService";
import { setShop } from "../redux/reducers/ShopSlice";

export const post_save_new_shop = (createInfoForm) => {
  return async function post_save_new_shop_thunk(dispatch, getState) {
    const { user } = getState();
    const { address, selectAddress } = getState().address;
    const { provinceCity, district, ward } = selectAddress;
    const provinceCitySelected = address[provinceCity];
    const districtSelected = provinceCitySelected.district[district];
    const wardSelected = districtSelected.ward[ward];

    let createShopForm = {
      name: createInfoForm.shopName,
      streetDetail: createInfoForm.streetDetail,
      provinceCityId: provinceCitySelected.id,
      districtId: districtSelected.id,
      wardId: wardSelected.id,
      userId: user.id,
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
