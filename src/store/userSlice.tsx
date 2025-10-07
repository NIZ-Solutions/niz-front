import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserData, UserSliceState } from "../types/user";

const initialState: UserSliceState = { data: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
