import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessList: null,
  selectBusiness: {
    businessIndex: null,
    subBusinessIndex: null,
    childrenBusinessIndex: null,
  },
};

export const BusinessSlice = createSlice({
  initialState,
  name: "business",
  reducers: {
    setBusiness: (state, action) => {
      return { ...state, businessList: action.payload };
    },
    setBusinessIndex: (state, action) => {
      return {
        ...state,
        selectBusiness: {
          businessIndex: action.payload,
          subBusinessIndex: null,
          childrenBusinessIndex: null,
        },
      };
    },
    setSubinessIndex: (state, action) => {
      return {
        ...state,
        selectBusiness: {
          ...state.selectBusiness,
          subBusinessIndex: action.payload,
          childrenBusinessIndex: null,
        },
      };
    },
    setChildrenBusinessIndex: (state, action) => {
      return {
        ...state,
        selectBusiness: {
          ...state.selectBusiness,
          childrenBusinessIndex: action.payload,
        },
      };
    },
    resetSelectBusiness: (state, action) => {
      return {
        ...state,
        selectBusiness: {
          businessIndex: null,
          subBusinessIndex: null,
          childrenBusinessIndex: null,
        },
      };
    },
    resetBusiness: (state, action) => {
      return null;
    },
  },
});

export const {
  setBusiness,
  resetBusiness,
  setBusinessIndex,
  setSubinessIndex,
  setChildrenBusinessIndex,
  resetSelectBusiness,
} = BusinessSlice.actions;
export default BusinessSlice.reducer;
