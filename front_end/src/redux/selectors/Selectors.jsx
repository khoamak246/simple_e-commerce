// ? AuthSlice
export const AUTH_STATE_SELECTOR = (state) => state.auth;

// ? UserSlice
export const USER_STATE_SELECTOR = (state) => state.user;

// ? Toggle
export const TOGGLE_STATE_SELECTOR = (state) => state.toggle;

// ? Address
export const ADDRESS_STATE_SELECTOR = (state) => state.address;

// ? Shop
export const SHOP_STATE_SELECTOR = (state) => state.shop;

// ? Business
export const BUSINESS_STATE_SELECTOR = (state) => state.business;
export const BUSINESS_LIST_SELECTOR = (state) => state.business.businessList;
export const BUSINESS_SELECTED_SELECTOR = (state) =>
  state.business.selectBusiness;
