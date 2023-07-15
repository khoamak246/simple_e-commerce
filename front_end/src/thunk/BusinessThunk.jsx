import { FIND_ALL_BUSINESS } from "../api/service/BusinessService";
import { setBusiness } from "../redux/reducers/BusinessSlice";

export const get_business = () => {
  return async function get_business_thunk(dispatch) {
    let response = await FIND_ALL_BUSINESS();
    if (response.status === 200) {
      dispatch(setBusiness(response.data.data));
    } else {
      console.log(response);
    }
  };
};
