import {
  GET_ROOM_BY_USER_ID,
  PATCH_UPDATE_LAST_ACCESS_ROOM,
  POST_CREATE_ROOM,
} from "../api/service/UserRoomService";
import {
  setRoom,
  setSelectRoom,
  setSpecificRoom,
} from "../redux/reducers/RoomSlice";
import {
  findUserRoomIndexInRoomList,
  updateSpecificRoom,
} from "../utils/Utils";

export const get_room_by_user_id = () => {
  return async function get_room_by_user_id_thunk(dispatch, getState) {
    let userId = getState().user.id;
    let response = await GET_ROOM_BY_USER_ID(userId);

    if (response.status === 200 || response.status === 204) {
      dispatch(setRoom(response.data.data));
      return response.data.data;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const post_create_room = (shopId) => {
  return async function post_create_room_thunk(dispatch, getState) {
    let roomCreateForm = {
      userId: getState().user.id,
      shopId,
    };
    let response = await POST_CREATE_ROOM(roomCreateForm);
    if (response.status === 200) {
      let res = await dispatch(get_room_by_user_id());
      if (res) {
        dispatch(setSelectRoom(res[0]));
        return true;
      }
    } else {
      console.log(response);
      return false;
    }
  };
};

export const patch_update_last_access = (userRoomId) => {
  return async function patch_update_last_access_thunk(dispatch, getState) {
    let response = await PATCH_UPDATE_LAST_ACCESS_ROOM(userRoomId);
    if (response.status === 200) {
      let roomTemp = updateSpecificRoom(
        response.data.data,
        getState().room.roomList
      );
      dispatch(
        setSpecificRoom({ roomList: roomTemp, selectRoom: response.data.data })
      );
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

export const update_with_socket = (receivedValue) => {
  return async function update_with_socket_thunk(dispatch, getState) {
    let roomList = getState().room.roomList;
    let currentSelectUserRoom = getState().room.selectRoom;
    if (currentSelectUserRoom && currentSelectUserRoom.id == receivedValue.id) {
      let roomTemp = updateSpecificRoom(receivedValue, roomList);
      dispatch(
        setSpecificRoom({ roomList: roomTemp, selectRoom: receivedValue })
      );
      dispatch(patch_update_last_access(receivedValue.id));
    } else {
      let userRoomIndex = findUserRoomIndexInRoomList(roomList, receivedValue);
      if (userRoomIndex >= 0) {
        let roomTemp = updateSpecificRoom(receivedValue, roomList);
        dispatch(
          setSpecificRoom({
            roomList: roomTemp,
            selectRoom: currentSelectUserRoom,
          })
        );
      } else {
        let newListRoom = [receivedValue, ...roomList];
        dispatch(
          setSpecificRoom({
            roomList: newListRoom,
            selectRoom: currentSelectUserRoom,
          })
        );
      }
    }
  };
};
