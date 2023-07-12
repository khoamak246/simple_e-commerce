import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const ToggleSlice = createSlice({
  initialState,
  name: "toggle",
  reducers: {
    setToggle: (state, action) => {
      return action.payload;
    },
    resetToggle: (state, action) => {
      return null;
    },
  },
});

export const { setToggle, resetToggle } = ToggleSlice.actions;
export default ToggleSlice.reducer;
