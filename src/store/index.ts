import { configureStore } from "@reduxjs/toolkit";
import modal from "./modalSlice"; // default: reducer

export const store = configureStore({
  reducer: { modal }, // ★ 키 이름 반드시 'modal'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
