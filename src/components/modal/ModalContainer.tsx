import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "../../hooks/useSelector";
import TermModal from "./TermModal";
import LoginModal from "./LoginModal";

export default function ModalContainer() {
  const modal = useAppSelector((s) => s.modal);
  const type = modal?.type ?? null;

  useEffect(() => {
    console.log("[modal state]", modal);
  }, [modal]);

  const [mount, setMount] = useState<HTMLElement | null>(null);
  useEffect(() => setMount(document.getElementById("modal")), []);

  if (!type || !mount) return null;

  switch (type) {
    case "terms":
      return createPortal(<TermModal />, mount);
    case "LOGIN":
      return createPortal(<LoginModal />, mount);
    default:
      return null;
  }
}
