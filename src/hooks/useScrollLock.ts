import { useCallback, useRef } from "react";

type GetAllow = () => HTMLElement | null | Array<HTMLElement | null>;
type SavedKeys = "overscrollBehavior" | "touchAction";

export default function useScrollLock(getAllowElement: GetAllow) {
  const lockedRef = useRef(false);
  const savedHtml = useRef<Partial<Record<SavedKeys, string>>>({});
  const savedBody = useRef<Partial<Record<SavedKeys, string>>>({});

  // 허용 컨테이너 목록
  const getAllowList = (): HTMLElement[] => {
    const r = getAllowElement?.();
    if (!r) return [];
    return Array.isArray(r) ? (r.filter(Boolean) as HTMLElement[]) : [r];
  };

  // iOS/Safari 대응
  const primeScrollable = (root: HTMLElement) => {
    root.style.overflowY = root.style.overflowY || "auto";
    (root.style as any).WebkitOverflowScrolling = "touch";
    (root.style as any).touchAction =
      (root.style as any).touchAction || "pan-y";
  };

  const primeAllowAll = () => {
    for (const el of getAllowList()) {
      if (!el) continue;
      primeScrollable(el);
      el.querySelectorAll<HTMLElement>("*").forEach((n) => {
        const cs = getComputedStyle(n);
        const isScrollDecl =
          cs.overflowY === "auto" ||
          cs.overflowY === "scroll" ||
          cs.overflowX === "auto" ||
          cs.overflowX === "scroll";
        const isScrollable =
          n.scrollHeight > n.clientHeight || n.scrollWidth > n.clientWidth;
        if (isScrollDecl || isScrollable) primeScrollable(n);
      });
    }
  };

  // 이벤트 경로에 허용 컨테이너가 포함되는지
  const inAllowPath = (e: any) => {
    if (e.target.classList.contains("dropdown")) return true;
    const allow = getAllowList();
    if (!allow.length) return false;
    const path = (e as any).composedPath?.() as EventTarget[] | undefined;
    if (path?.length) {
      return allow.some((a) => path.includes(a));
    }
    const t = e.target as HTMLElement | null;
    return !!t && allow.some((a) => a === t || a.contains(t));
  };

  // 허용 컨테이너 내부면 무조건 통과
  const onWheel = (e: WheelEvent) => {
    if (!inAllowPath(e)) e.preventDefault();
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!inAllowPath(e)) e.preventDefault();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    // 스크롤 유발 키
    const keys = [
      " ",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      "ArrowUp",
      "ArrowDown",
    ];
    if (keys.includes(e.key) && !inAllowPath(e)) e.preventDefault();
  };

  const lock = useCallback(() => {
    if (lockedRef.current) return;
    lockedRef.current = true;

    // html/body의 overscrollBehavior 변경 (레이아웃 흔들림 방지)
    const html = document.documentElement;
    const body = document.body;
    savedHtml.current = {
      overscrollBehavior: (html.style as any).overscrollBehavior,
      touchAction: (html.style as any).touchAction,
    };
    savedBody.current = {
      overscrollBehavior: (body.style as any).overscrollBehavior,
      touchAction: (body.style as any).touchAction,
    };
    (html.style as any).overscrollBehavior =
      (html.style as any).overscrollBehavior || "none";
    (body.style as any).overscrollBehavior =
      (body.style as any).overscrollBehavior || "none";
    (html.style as any).touchAction = (html.style as any).touchAction || "auto";
    (body.style as any).touchAction = (body.style as any).touchAction || "auto";

    // 허용 컨테이너, 렌더 후 1~2프레임 뒤에 적용
    requestAnimationFrame(() => {
      requestAnimationFrame(primeAllowAll);
    });

    const opt: AddEventListenerOptions = { passive: false, capture: true };
    document.addEventListener("wheel", onWheel, opt);
    document.addEventListener("touchmove", onTouchMove, opt);
    document.addEventListener("keydown", onKeyDown, opt);
  }, []);

  const unlock = useCallback(() => {
    if (!lockedRef.current) return;
    lockedRef.current = false;

    document.removeEventListener("wheel", onWheel as any, true);
    document.removeEventListener("touchmove", onTouchMove as any, true);
    document.removeEventListener("keydown", onKeyDown as any, true);

    const html = document.documentElement;
    const body = document.body;

    (html.style as any).overscrollBehavior = "";
    (body.style as any).overscrollBehavior = "";
    (html.style as any).touchAction = "";
    (body.style as any).touchAction = "";
    body.classList.remove("touch-none");
    primeScrollable(body);
  }, []);

  return { lock, unlock };
}
