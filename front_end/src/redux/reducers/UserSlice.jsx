import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const UserSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    resetUser: (state, action) => {
      return null;
    },
  },
});

export const { setUser, resetUser } = UserSlice.actions;
export default UserSlice.reducer;
