import { POST_SAVE_NEW_SHOP } from "../api/service/ShopService";

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

    let reponse = await POST_SAVE_NEW_SHOP(createShopForm);
    if (reponse.status === 200) {
      return true;
    } else {
      console.log(reponse);
      return false;
    }
  };
};
