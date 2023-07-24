import {
  GET_FIND_ALL_ADDRESS,
  POST_CREATE_NEW_USER_ADDRESS,
} from "../api/service/AddressService";
import { setAddress } from "../redux/reducers/AddressSlice";
import { setUser } from "../redux/reducers/UserSlice";

export const get_address = () => {
  return async function get_address_thunk(dispatch) {
    let response = await GET_FIND_ALL_ADDRESS();
    if (response.status === 200) {
      dispatch(setAddress(response.data.data));
    } else {
      console.log(response);
    }
  };
};

export const post_create_new_user_address = (payload) => {
  return async function post_create_new_user_address_thunk(dispatch, getState) {
    const { user } = getState();
    let createUserAddressForm = {
      ...payload,
      userId: user.id,
    };
    let response = await POST_CREATE_NEW_USER_ADDRESS(createUserAddressForm);
    if (response.status === 200) {
      dispatch(
        setUser({
          ...user,
          userInfo: { ...user.userInfo, userAddresses: response.data.data },
        })
      );
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};
