import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { OrderData, OrderSliceState } from "../types/order";
const initialState: OrderSliceState = { data: null };

const orderSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    subscription: (state, action: PayloadAction<OrderData>) => {
      state.data = action.payload;
    },
    subscriptionComplete: (state) => {
      state.data = null;
    },
  },
});

export default orderSlice.reducer;
export const { subscription, subscriptionComplete } = orderSlice.actions;
