import Footer from "../components/layout/Footer";
import Intro from "./Intro";
import Plan from "./Plan";
import Submit from "./Submit";

export default function Main() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          overflow: "visible",
          transform: "translateZ(0)",
          willChange: "transform",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="absolute inset-0 isolate overflow-visible [filter:url(#goo)_blur(50px)]">
          <div className="absolute inset-[-20%] right-[-30%] top-[30%] overflow-visible md:inset-0 md:right-[0%] md:top-[0%]">
            {/* 수직으로 움직이는 구 */}
            <div className="absolute h-[135%] w-[135%] transform-gpu animate-[moveVertical_8s_ease_infinite] overflow-visible bg-[radial-gradient(circle_at_center,#382ad38a_0%,rgba(104,109,224,0)_50%)] mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
            <div className="absolute h-[140%] w-[140%] transform-gpu animate-[moveInCircle_10s_linear_reverse_infinite] overflow-visible bg-[radial-gradient(circle_at_center,#388bca6f_0%,rgba(126,214,223,0)_50%)] mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
            {/* 오른쪽 아래 큰 구 */}
            <div className="absolute h-[140%] w-[140%] transform-gpu animate-[moveInCircle_10s_linear_infinite] overflow-visible bg-[radial-gradient(circle_at_center,#4438ca80_0%,rgba(223,249,251,0)_50%)] mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
            {/* 수평으로 움직이는 구 */}
            <div className="absolute h-[135%] w-[135%] transform-gpu animate-[moveHorizontal_10s_ease_infinite] overflow-visible bg-[radial-gradient(circle_at_center,#0f99fb80_0%,rgba(255,121,121,0)_50%)] mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
            {/* 오른쪽 아래 큰 구 중심색 */}
            <div className="absolute h-[135%] w-[135%] transform-gpu animate-[moveInCircle_10s_ease_infinite] overflow-visible bg-[radial-gradient(circle_at_center,#ffca6851_0%,rgba(149,175,192,0)_50%)] mix-blend-overlay will-change-transform [backface-visibility:hidden] md:h-[200%] md:w-[200%]"></div>
          </div>
        </div>
      </div>
      <div className="flex w-full min-w-[280px] flex-col items-center justify-between text-white-000">
        <Submit />
        <Intro />
        <Plan />
        <Footer />
      </div>
    </div>
  );
}
