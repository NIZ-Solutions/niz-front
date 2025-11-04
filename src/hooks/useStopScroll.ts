// useStopScroll.ts
// Down 1회 = 한 칸, Up 스냅 X
// - 실제 스크롤러 자동 탐지(resolveScroller)
// - next() 직후 절대 차단 시간 blockUntil 로 "끝까지 미끄러짐" 원천 차단
// - 스냅 중/직후 ignore 창으로 bounce 방지
// - window/컨테이너 모두 호환, cancelable 일 때만 preventDefault
// - 마지막 섹션에선 네이티브 스크롤 통과
import { useEffect, RefObject } from "react";

type Opts = {
  refs: RefObject<HTMLElement | null>[];
  lockMs?: number; // 스냅 후 입력 잠금(ms)
  containerId?: string; // 스크롤 컨테이너 id (없으면 자동 탐지)
  ignoreMs?: number; // 스냅 직후 scroll 무시 창(ms)
  cooldownMs?: number; // next() 이후 추가 Down 차단 시간(ms)
  noisePx?: number; // 터치 노이즈 컷
};

function findScrollable(start: HTMLElement | null): HTMLElement {
  let el = start as HTMLElement | null;
  while (el) {
    const st = getComputedStyle(el);
    if (
      /(auto|scroll|overlay)/.test(st.overflowY) &&
      el.scrollHeight > el.clientHeight
    ) {
      return el;
    }
    el = el.parentElement as HTMLElement | null;
  }
  return (document.scrollingElement || document.documentElement) as HTMLElement;
}

function resolveScroller(
  containerId: string | undefined,
  sampleEl: HTMLElement,
) {
  const wanted = containerId
    ? (document.getElementById(containerId) as HTMLElement | null)
    : null;
  const usable =
    !!wanted &&
    /(auto|scroll|overlay)/.test(getComputedStyle(wanted).overflowY) &&
    wanted.scrollHeight > wanted.clientHeight;

  const scroller = usable ? wanted! : findScrollable(sampleEl);
  const isWindow =
    scroller === (document.scrollingElement || document.documentElement);
  return { scroller, isWindow };
}

function axisTop(scroller: HTMLElement, isWindow: boolean) {
  if (isWindow) {
    const vv = (window as any).visualViewport as VisualViewport | undefined;
    return vv ? vv.pageTop : window.scrollY;
  }
  return scroller.scrollTop;
}
function viewportOnAxis(scroller: HTMLElement, isWindow: boolean) {
  if (isWindow) {
    const vv = (window as any).visualViewport as VisualViewport | undefined;
    const h = vv ? vv.height : window.innerHeight;
    const top = axisTop(scroller, true);
    return { top, bottom: top + h, height: h };
  }
  const h = scroller.clientHeight;
  const top = axisTop(scroller, false);
  return { top, bottom: top + h, height: h };
}
function elementOnAxis(
  scroller: HTMLElement,
  isWindow: boolean,
  el: HTMLElement,
) {
  const er = el.getBoundingClientRect();
  if (isWindow) {
    const top = er.top + axisTop(scroller, true);
    return { top, bottom: top + er.height, height: er.height };
  } else {
    const cr = scroller.getBoundingClientRect();
    const padTop = parseFloat(getComputedStyle(scroller).paddingTop || "0");
    const top = er.top - cr.top + scroller.scrollTop - padTop;
    return { top, bottom: top + er.height, height: er.height };
  }
}
function centerTop(scroller: HTMLElement, isWindow: boolean, el: HTMLElement) {
  const v = viewportOnAxis(scroller, isWindow);
  const e = elementOnAxis(scroller, isWindow, el);
  return Math.max(0, Math.round(e.top - (v.height - e.height) / 2));
}
function indexOfCenter(
  els: HTMLElement[],
  scroller: HTMLElement,
  isWindow: boolean,
) {
  const v = viewportOnAxis(scroller, isWindow);
  const center = (v.top + v.bottom) / 2;
  let best = 0,
    bestDist = Infinity;
  for (let i = 0; i < els.length; i++) {
    const e = elementOnAxis(scroller, isWindow, els[i]);
    const c = (e.top + e.bottom) / 2;
    const d = Math.abs(c - center);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

export default function useStopScroll({
  refs,
  lockMs = 180,
  containerId,
  ignoreMs = 180,
  cooldownMs = 700,
  noisePx = 5,
}: Opts) {
  useEffect(() => {
    if (!refs?.length) return;
    const els = refs.map((r) => r.current!).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const { scroller, isWindow } = resolveScroller(containerId, els[0]);
    const now = () => performance.now();

    // 상태
    let currentIdx = indexOfCenter(els, scroller, isWindow);
    let lockUntil = 0; // 락 종료 시각
    let isSnapping = false; // 프로그램 스크롤 중
    let ignoreScrollUntil = 0; // 스냅 직후 scroll 무시
    let blockUntil = 0; // ✅ next() 이후 Down 완전 차단

    // 스크롤 세터(부드러운 스크롤 잔상 제거)
    const setY = (y: number) => {
      if (isWindow) {
        const html = document.documentElement as any;
        const prev = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, y);
        document.documentElement.scrollTop = y; // Safari 보강
        document.body.scrollTop = y;
        requestAnimationFrame(() => {
          html.style.scrollBehavior = prev;
        });
      } else {
        const prev = (scroller.style as any).scrollBehavior;
        (scroller.style as any).scrollBehavior = "auto";
        scroller.scrollTop = y;
        requestAnimationFrame(() => {
          (scroller.style as any).scrollBehavior = prev;
        });
      }
    };

    const snapToIdx = (i: number, withLock: boolean) => {
      const idx = clamp(i, 0, els.length - 1);
      const target = centerTop(scroller, isWindow, els[idx]);

      isSnapping = true;
      const tNow = now();
      ignoreScrollUntil = tNow + ignoreMs;

      setY(target);
      currentIdx = idx;

      if (withLock) lockUntil = tNow + lockMs;

      // ✅ next 직후 절대 차단 시간: 모멘텀/간헐 휠을 모두 흡수
      blockUntil = tNow + cooldownMs;

      // 두 프레임 뒤 스냅 종료
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          isSnapping = false;
        }),
      );
    };

    // 항상 "현재 인덱스 + 1"로만 진행(멀티 스텝 방지)
    const next = () => snapToIdx(currentIdx + 1, true);

    const tryPrevent = (e: {
      cancelable?: boolean;
      preventDefault: () => void;
    }) => {
      if ((e as any).cancelable) e.preventDefault();
    };

    // ───────────────── 이벤트 핸들러 ─────────────────
    const onWheel = (e: WheelEvent) => {
      const t = now();

      // 스냅 중/직후 또는 절대 차단 구간이면 네이티브만 흡수
      if (isSnapping || t < ignoreScrollUntil || t < blockUntil) {
        tryPrevent(e);
        return;
      }

      const deltaPx = (e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY) || 0;
      const isDown = deltaPx > 0;

      // 락 중: Down이면 바로 1스텝(해제 후 재락)
      if (t < lockUntil) {
        if (isDown) {
          tryPrevent(e);
          lockUntil = 0;
          next();
        }
        return;
      }

      // Down 1회 = 1스텝 (마지막 섹션이면 막지 않음)
      if (isDown) {
        const atLast = currentIdx >= els.length - 1;
        if (!atLast) {
          tryPrevent(e);
          next();
        }
      }
      // Up: 스냅 금지
    };

    let touchStartY = 0;
    let touchMoved = false;

    const onTouchStart = (e: TouchEvent) => {
      touchMoved = false;
      if (e.touches.length) touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = now();

      if (isSnapping || t < ignoreScrollUntil || t < blockUntil) {
        tryPrevent(e as any);
        return;
      }
      if (!e.touches.length) return;

      const dy = e.touches[0].clientY - touchStartY; // (+) 아래로 드래그
      if (!touchMoved && Math.abs(dy) < noisePx) return;
      touchMoved = true;

      const isDown = dy < 0;

      if (t < lockUntil) {
        if (isDown) {
          tryPrevent(e as any);
          lockUntil = 0;
          next();
        }
        return;
      }

      if (isDown) {
        const atLast = currentIdx >= els.length - 1;
        if (!atLast) {
          tryPrevent(e as any);
          next();
        }
      }
      // Up: 스냅 금지
    };

    const onScroll = () => {
      const t = now();
      if (isSnapping || t < ignoreScrollUntil) return;
      currentIdx = indexOfCenter(els, scroller, isWindow);
    };

    const onResize = () => {
      if (isSnapping) return;
      currentIdx = indexOfCenter(els, scroller, isWindow);
    };

    // 리스너 등록(정확히 "그" 스크롤러에만)
    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchmove", onTouchMove, { passive: false });
    (isWindow ? window : scroller).addEventListener("scroll", onScroll, {
      passive: true,
    });
    window.addEventListener("resize", onResize);
    (window as any).visualViewport?.addEventListener?.("resize", onResize);

    return () => {
      scroller.removeEventListener("wheel", onWheel as any);
      scroller.removeEventListener("touchstart", onTouchStart as any);
      scroller.removeEventListener("touchmove", onTouchMove as any);
      (isWindow ? window : scroller).removeEventListener(
        "scroll",
        onScroll as any,
      );
      window.removeEventListener("resize", onResize as any);
      (window as any).visualViewport?.removeEventListener?.(
        "resize",
        onResize as any,
      );
    };
  }, [refs, lockMs, containerId, ignoreMs, cooldownMs, noisePx]);
}
