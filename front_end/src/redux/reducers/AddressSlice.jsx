import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const AddressSlice = createSlice({
  initialState,
  name: "address",
  reducers: {
    setNewAddressState: (state, action) => {
      return action.payload;
    },
    setAddress: (state, action) => {
      return {
        address: action.payload,
        selectAddress: { provinceCity: 0, district: 0, ward: 0 },
      };
    },
    resetAddress: (state, action) => {
      return null;
    },
  },
});

export const { setNewAddressState, setAddress, resetAddress } =
  AddressSlice.actions;
export default AddressSlice.reducer;
