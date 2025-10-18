import { createPortal } from "react-dom";

export default function BackgroundLayerPortal() {
  const el = (
    <div
      // ✅ body 직속 fixed + 합성 안정화
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: "-100px",
        pointerEvents: "none",
        zIndex: -10,
        overflow: "hidden",
        background: "linear-gradient(40deg, #0f99fb10, #232121)",
        // 합성 고정
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden" as any,
        backfaceVisibility: "hidden",
      }}
    >
      <div className="isolation-isolate absolute inset-0 [filter:url(#goo)]">
        <div className="absolute inset-[-20%] md:inset-[-20%]">
          <div className="absolute h-[150%] w-[150%] transform-gpu animate-[moveVertical_10s_ease_infinite] bg-[radial-gradient(circle_at_center,#4438ca80_0%,rgba(104,109,224,0)_50%)] opacity-80 mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
          <div className="absolute h-[150%] w-[150%] transform-gpu animate-[moveInCircle_10s_linear_reverse_infinite] bg-[radial-gradient(circle_at_center,#388bca3c_0%,rgba(126,214,223,0)_50%)] opacity-80 mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
          {/* 오른쪽 아래 큰 구 */}
          <div className="absolute h-[150%] w-[150%] transform-gpu animate-[moveInCircle_10s_linear_infinite] bg-[radial-gradient(circle_at_center,#4438ca80_0%,rgba(223,249,251,0)_50%)] opacity-80 mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
          {/* 수평으로 움직이는 구 */}
          <div className="absolute h-[150%] w-[150%] transform-gpu animate-[moveHorizontal_10s_ease_infinite] bg-[radial-gradient(circle_at_center,#0f99fb80_0%,rgba(255,121,121,0)_50%)] opacity-80 mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
          {/* 오른쪽 아래 큰 구 중심색 */}
          <div className="absolute h-[150%] w-[150%] transform-gpu animate-[moveInCircle_10s_ease_infinite] bg-[radial-gradient(circle_at_center,#3f82cf80_0%,rgba(149,175,192,0)_50%)] opacity-80 mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
          {/* 필요한 만큼 추가 */}
        </div>
      </div>
    </div>
  );
  return createPortal(el, document.body);
}
