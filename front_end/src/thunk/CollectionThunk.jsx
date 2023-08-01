import {
  DELETE_COLLECTION,
  PATCH_UPDATE_COLLECTION,
  POST_SAVE_NEW_COLLECTION,
} from "../api/service/CollectionService";
import { setShop } from "../redux/reducers/ShopSlice";
import { get_shop_by_user_id } from "./ShopThunk";

export const post_save_new_collection = (name) => {
  return async function post_save_new_collection_thunk(dispatch, getState) {
    const { shop } = getState();
    let createCollectionForm = {
      name,
      shopId: shop.id,
    };
    let response = await POST_SAVE_NEW_COLLECTION(createCollectionForm);
    if (response.status == 200) {
      let res = await dispatch(get_shop_by_user_id());
      if (res) {
        return response.data.data;
      }
    } else {
      console.log(response);
      return false;
    }
  };
};

export const patch_update_collection = (payload) => {
  return async function patch_update_collection_thunk(dispatch, getState) {
    const { shop } = getState();
    let response = await PATCH_UPDATE_COLLECTION(payload);
    if (response.status === 200) {
      let res = await dispatch(get_shop_by_user_id());
      if (res) {
        return true;
      }
    } else {
      console.log(response);
      return false;
    }
  };
};

export const delete_collection = (collectionId) => {
  return async function delete_collection_thunk(dispatch, getState) {
    const { shop } = getState();
    let response = await DELETE_COLLECTION(collectionId);
    if (response.status === 200) {
      let res = await dispatch(get_shop_by_user_id());
      if (res) {
        return true;
      }
    } else {
      console.log(response);
      return false;
    }
  };
};
