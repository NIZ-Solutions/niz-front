import { useEffect } from "react";

export default function useSnap<T extends HTMLElement>(
  ref: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = document.documentElement;
    const target = ref.current;
    if (!target) return;

    // 초기 2프레임 스냅 비활성 → 튐 방지
    root.classList.remove("snap-y");
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) root.classList.add("snap-y");
            else root.classList.remove("snap-y");
          },
          { root: null, threshold: 0.1 },
        );
        io.observe(target);

        // cleanup 안에서 해제
        (cleanup as any).io = io;
      });
      (cleanup as any).raf2 = raf2;
    });

    function cleanup() {
      cancelAnimationFrame(raf1);
      if ((cleanup as any).raf2) cancelAnimationFrame((cleanup as any).raf2);
      if ((cleanup as any).io) (cleanup as any).io.disconnect();
      root.classList.remove("snap-y");
    }
    return cleanup;
  }, [ref]);
}
