import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const ShopSlice = createSlice({
  initialState,
  name: "shop",
  reducers: {
    setShop: (state, action) => {
      return action.payload;
    },
    resetShop: (state, action) => {
      return null;
    },
  },
});

export const { setShop, resetShop } = ShopSlice.actions;
export default ShopSlice.reducer;
