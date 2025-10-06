import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = string | null;

export interface ModalState {
  type: ModalType;
}

const initialState: ModalState = {
  type: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: Exclude<ModalType, null> }>,
    ) => {
      state.type = action.payload.type;
    },
    closeModal: () => initialState,
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
