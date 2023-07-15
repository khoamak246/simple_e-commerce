import { PATCH_UPDATE_USER } from "../api/service/UserService";
import { setUser } from "../redux/reducers/UserSlice";

export const patch_update_user = (updateUserForm) => {
  return async function patch_update_user_thunk(dispatch, getState) {
    const { user } = getState();
    let response = await PATCH_UPDATE_USER({
      userId: user.id,
      updateUserForm,
    });

    if (response.status === 200) {
      dispatch(setUser(response.data.data));
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};
