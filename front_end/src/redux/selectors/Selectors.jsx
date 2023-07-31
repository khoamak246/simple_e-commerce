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

// ? Room
export const ROOM_STATE_SELECTOR = (state) => state.room;
export const ROOM_ROOM_LIST_STATE_SELECTOR = (state) => state.room.roomList;
export const ROOM_SELECT_ROOM_STATE_SELECTOR = (state) => state.room.selectRoom;
