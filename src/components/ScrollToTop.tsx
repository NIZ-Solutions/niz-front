import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ selector }: { selector?: string } = {}) {
  const { pathname } = useLocation();

  // 1) 브라우저의 자동 스크롤 복원 끄기
  useEffect(() => {
    const { history } = window;
    const prev = (history as any).scrollRestoration;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // 새로고침 직전에 최상단으로 (사파리 대응)
    const handleBeforeUnload = () => window.scrollTo(0, 0);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = prev || "auto";
      }
    };
  }, []);

  // 2) 경로 변경 시 + 첫 마운트 시 안정적으로 맨 위로
  useEffect(() => {
    const el =
      (selector && document.querySelector(selector)) ||
      document.scrollingElement ||
      document.documentElement;

    // 렌더(레이아웃) → RAF 2번 후 스크롤 (복원 동작보다 늦게)
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        if (el instanceof HTMLElement) {
          el.scrollTo({ top: 0, left: 0, behavior: "auto" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [pathname, selector]);

  return null;
}
