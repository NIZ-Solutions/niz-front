import Footer from "../components/layout/Footer";
import Intro from "./Intro";
import Plan from "./Plan";
import Submit from "./Submit";

export default function Main() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-x-hidden bg-[linear-gradient(40deg,#0f99fbd,#232121)]">
        <div className="inset-0 h-full w-full [filter:url(#goo)_blur(50px)]">
          <div className="absolute left-[0%] top-[0%] h-full w-full md:left-[-20%] md:top-[0%]">
            <div className="absolute h-[150%] w-[150%] animate-[moveVertical_10s_ease_infinite] bg-[radial-gradient(circle_at_center,#4438ca80_0%,rgba(104,109,224,0)_50%)] opacity-80 mix-blend-hard-light md:h-[200%] md:w-[200%]"></div>
            <div className="mix-blend-hard-lightmd:h-[200%] absolute h-[150%] w-[150%] animate-[moveInCircle_10s_linear_reverse_infinite] bg-[radial-gradient(circle_at_center,#388bca3c_0%,rgba(126,214,223,0)_50%)] opacity-80 md:w-[200%]"></div>
            {/* 오른쪽 아래 큰 구 */}
            <div className="absolute h-[150%] w-[150%] animate-[moveInCircle_10s_linear_infinite] bg-[radial-gradient(circle_at_center,#4438ca80_0%,rgba(223,249,251,0)_50%)] opacity-80 mix-blend-hard-light md:h-[200%] md:w-[200%]"></div>
            {/* 수평으로 움직이는 구 */}
            <div className="absolute h-[150%] w-[150%] animate-[moveHorizontal_10s_ease_infinite] bg-[radial-gradient(circle_at_center,#0f99fb80_0%,rgba(255,121,121,0)_50%)] opacity-80 mix-blend-hard-light md:h-[200%] md:w-[200%]"></div>
            {/* 오른쪽 아래 큰 구 중심색 */}
            <div className="absolute h-[150%] w-[150%] animate-[moveInCircle_10s_ease_infinite] bg-[radial-gradient(circle_at_center,#3f82cf80_0%,rgba(149,175,192,0)_50%)] opacity-80 mix-blend-hard-light md:h-[200%] md:w-[200%]"></div>
          </div>
        </div>
      </div>
      <div className="flex h-[100svh] w-full min-w-[280px] snap-y snap-mandatory flex-col items-center justify-between overflow-y-scroll text-white-000 supports-[height:100dvh]:h-[100dvh]">
        <Submit />
        <Intro />
        <Plan />
        <Footer />
      </div>
    </>
  );
}
