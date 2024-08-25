import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import loaderSlice from "./slices/loaderSlice";
import groupChatSlice from "./slices/groupChatSlice";


const store = configureStore({
  reducer: {
    userState: authSlice,
    loaderState: loaderSlice,
    groupChatState: groupChatSlice
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


