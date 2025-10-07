import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import modal from "./modalSlice";

export const store = configureStore({ reducer: { modal, user } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectUser = (s: RootState) => s.user.data;
export default store;
