import { GET_FIND_ALL_ADDRESS } from "../api/service/AddressService";
import { setAddress } from "../redux/reducers/AddressSlice";

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
