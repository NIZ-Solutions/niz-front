import { useCallback } from "react";
import { useAppDispatch } from "../hooks/useDispatch";
import { openModal, closeModal } from "../store/modalSlice";

export default function useModal() {
  const dispatch = useAppDispatch();
  const open = useCallback(
    (args: { type: "terms" | /* 다른 타입들 */ string }) => {
      dispatch(openModal(args));
    },
    [dispatch],
  );
  const close = useCallback(() => dispatch(closeModal()), [dispatch]);
  return { openModal: open, closeModal: close };
}
