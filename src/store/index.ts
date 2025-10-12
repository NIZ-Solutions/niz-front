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
import modal from "./modalSlice";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  whitelist: ["user"],
  // blacklist -> 그것만 제외합니다
  blacklist: ["modal"],
};

const rootReducer = combineReducers({ user, modal });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // redux-persist 비직렬 액션 무시
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectUser = (s: RootState) => s.user.data;

export default store;
