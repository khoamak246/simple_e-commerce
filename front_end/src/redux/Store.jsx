import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import UserSlice from "./reducers/UserSlice";
import ToggleSlice from "./reducers/ToggleSlice";
import AddressSlice from "./reducers/AddressSlice";
import ShopSlice from "./reducers/ShopSlice";
import BusinessSlice from "./reducers/BusinessSlice";

const Store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
    toggle: ToggleSlice,
    address: AddressSlice,
    shop: ShopSlice,
    business: BusinessSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default Store;
