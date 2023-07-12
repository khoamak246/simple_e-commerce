import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuth: (state, action) => {
      return action.payload;
    },
    resetAuth: (state, action) => {
      return null;
    },
  },
});

export const { setAuth, resetAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
