import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./userSlice";
import order from "./orderSlice";
import modal from "./modalSlice";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  whitelist: ["user", "order"],
  // blacklist -> 그것만 제외합니다
  blacklist: ["modal"],
};

const rootReducer = combineReducers({ user, modal, order });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectUser = (s: RootState) => s.user.data;
export const selectOrder = (s: RootState) => s.order.data;

export default store;
