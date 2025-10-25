// useIntersectionObserver.ts (핵심 수정판)
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type Target =
  | Element
  | null
  | undefined
  | RefObject<Element | null | undefined>;
type Options = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

type Result = {
  inView: boolean[];
  ratios: number[];
  activeIndex: number | null;
  entries: IntersectionObserverEntry[];
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
};

export default function useIntersectionObserver(
  targets: Target[] = [],
  opts: Options = {},
): Result {
  const { root = null, rootMargin = "0px", threshold = 0, once = false } = opts;

  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  const seenSetRef = useRef(new WeakSet<Element>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ✨ 핵심: 엔트리를 누적 저장하는 맵
  const entryMapRef = useRef<Map<Element, IntersectionObserverEntry>>(
    new Map(),
  );

  const watched = useMemo(() => {
    const list: Element[] = [];
    const pushIf = (el?: Element | null) =>
      el && !list.includes(el) && list.push(el);
    for (const t of targets) {
      if (!t) continue;
      if (t instanceof Element) pushIf(t);
      else if (typeof t === "object" && "current" in t)
        pushIf((t as RefObject<Element | null>).current);
    }
    elements.forEach(pushIf);
    return list;
  }, [targets, elements]);

  const ioOptions = useMemo(
    () => ({ root: (root as Element) ?? null, rootMargin, threshold }),
    [root, rootMargin, threshold],
  );

  // 콜백: 맵을 갱신하고 전체 배열로 set
  const onIntersect = useMemo<IntersectionObserverCallback>(
    () => (batch) => {
      const map = entryMapRef.current;
      for (const e of batch) map.set(e.target as Element, e);
      setEntries(Array.from(map.values()));
    },
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;
    observerRef.current?.disconnect();
    entryMapRef.current.clear();
    observerRef.current = new IntersectionObserver(onIntersect, ioOptions);
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      entryMapRef.current.clear();
    };
  }, [onIntersect, ioOptions]);

  useEffect(() => {
    const obs = observerRef.current;
    if (!obs) return;

    // 새 대상 관찰
    watched.forEach((el) => obs.observe(el));

    // 🔧 초기 플러시: rAF 이후 takeRecords → 비어있으면 스냅샷 생성
    const flush = () => {
      const batch = obs.takeRecords();
      if (batch.length) {
        const map = entryMapRef.current;
        for (const e of batch) map.set(e.target as Element, e);
        setEntries(Array.from(map.values()));
      } else {
        // ✨ 초기 스냅샷: getBoundingClientRect로 가짜 엔트리 만들기
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        const viewportW =
          window.innerWidth || document.documentElement.clientWidth;
        const map = entryMapRef.current;

        watched.forEach((el) => {
          const r = el.getBoundingClientRect();
          const intersectW = Math.max(
            0,
            Math.min(r.right, viewportW) -
              Math.min(Math.max(r.left, 0), viewportW),
          );
          const intersectH = Math.max(
            0,
            Math.min(r.bottom, viewportH) -
              Math.min(Math.max(r.top, 0), viewportH),
          );
          const intersectArea = intersectW * intersectH;
          const targetArea = Math.max(1, r.width * r.height);
          const ratio = Math.max(0, Math.min(1, intersectArea / targetArea));
          const isIntersecting = ratio > 0;

          // 최소 필드만 채운 유사 엔트리(any로 캐스팅)
          const fake: any = {
            boundingClientRect: r,
            intersectionRect: new DOMRect(
              Math.max(r.left, 0),
              Math.max(r.top, 0),
              intersectW,
              intersectH,
            ),
            isIntersecting,
            intersectionRatio: ratio,
            rootBounds: null,
            target: el,
            time: performance.now(),
          };
          map.set(el, fake as IntersectionObserverEntry);
        });
        setEntries(Array.from(map.values()));
      }
    };
    const raf = requestAnimationFrame(flush);

    // 🔧 스크롤/리사이즈/visibilitychange 때도 큐를 비워 반응 보장
    const onScroll = () => {
      const o = observerRef.current;
      if (!o) return;
      const batch = o.takeRecords();
      if (!batch.length) return;
      const map = entryMapRef.current;
      for (const e of batch) map.set(e.target as Element, e);
      setEntries(Array.from(map.values()));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      watched.forEach((el) => obs.unobserve(el));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onScroll);
    };
  }, [watched]);

  // 파생 상태
  const { inView, ratios, activeIndex } = useMemo(() => {
    const map = entryMapRef.current;
    const _in: boolean[] = [];
    const _ra: number[] = [];
    let best = -1;
    let idx: number | null = null;

    watched.forEach((el, i) => {
      const e = map.get(el);
      const ratio = e?.intersectionRatio ?? 0;
      let v = !!e?.isIntersecting;
      if (once) {
        if (v) seenSetRef.current.add(el);
        if (seenSetRef.current.has(el)) v = true;
      }
      _in.push(v);
      _ra.push(ratio);
      if (ratio > best) {
        best = ratio;
        idx = ratio > 0 ? i : null;
      }
    });
    return { inView: _in, ratios: _ra, activeIndex: idx };
  }, [entries, watched, once]);

  return { inView, ratios, activeIndex, entries, setElements };
}
