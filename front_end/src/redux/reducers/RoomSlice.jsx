import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomList: [],
  selectRoom: null,
};

export const RoomSlice = createSlice({
  initialState,
  name: "room",
  reducers: {
    setRoom: (state, action) => {
      let roomTemp = action.payload;
      return { ...state, roomList: roomTemp };
    },
    setSpecificRoom: (state, action) => {
      return action.payload;
    },
    setSelectRoom: (state, action) => {
      return { ...state, selectRoom: action.payload };
    },
    resetRoom: (state, action) => {
      return {
        roomList: [],
        selectRoom: null,
      };
    },
  },
});

export const { setRoom, setSpecificRoom, setSelectRoom, resetRoom } =
  RoomSlice.actions;
export default RoomSlice.reducer;
