import { useRef } from "react";
import useSnap from "../hooks/useSnap";
import GradientLineChart from "../components/GradientLineChart";
import useIntersectionObsever from "../hooks/useIntersectionObserver";

export default function Intro() {
  const wrapRef = useRef<HTMLDivElement>(null);
  useSnap(wrapRef);

  const section1 = useRef<HTMLDivElement | null>(null);
  const section2 = useRef<HTMLDivElement | null>(null);
  const section3 = useRef<HTMLDivElement | null>(null);
  const section4 = useRef<HTMLDivElement | null>(null);
  const isInViewport = useIntersectionObsever(
    [section1, section2, section3, section4],
    {
      threshold: 1,
      rootMargin: "0px 0px -20% 0px",
      once: false,
    },
  );

  return (
    <div
      ref={wrapRef}
      className="w-full scroll-smooth text-center text-lg md:text-2xl"
    >
      <section
        ref={section1}
        className="intro-snap flex min-h-screen flex-col items-center justify-center gap-20 px-8 pt-[60px] supports-[height:100dvh]:min-h-[100dvh]"
      >
        <h2
          className={
            isInViewport.activeIndex === 0
              ? "slide-down text-3xl font-bold md:text-4xl"
              : "hidden"
          }
        >
          Step1. 아이디어 작성
        </h2>
        <div
          className={
            isInViewport.activeIndex === 0
              ? "animate-fadein flex flex-col items-center justify-center py-12"
              : "hidden"
          }
        >
          <p className="w-fit overflow-hidden whitespace-nowrap pb-4 text-5xl font-bold text-white">
            WRITE YOUR
          </p>
          <h1 className="max-w-fit animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl font-bold text-white">
            OWN IDEAS !
          </h1>
        </div>
        <p className={isInViewport.activeIndex === 0 ? "slide-top" : "hidden"}>
          여러분의 아이디어를 <br />
          이해할 수 있도록 설명해주세요
        </p>
      </section>

      <section
        ref={section2}
        className="intro-snap flex min-h-screen flex-col items-center justify-center gap-20 px-8 pt-[60px] supports-[height:100dvh]:min-h-[100dvh]"
      >
        <h2
          className={
            isInViewport.activeIndex === 1
              ? "slide-down text-3xl font-bold md:text-4xl"
              : "hidden"
          }
        >
          Step2. 제작
        </h2>
        <div
          className={
            isInViewport.activeIndex === 1
              ? "animate-fadein relative py-16"
              : "hidden"
          }
        >
          <div className="loading text-5xl font-bold before:text-black-000 before:content-['MAKING...'] after:absolute after:left-0 after:top-0 after:z-20 after:w-0 after:animate-loading after:overflow-hidden after:text-white-000 after:opacity-100 after:content-['MAKING...']" />
        </div>
        <p className={isInViewport.activeIndex === 1 ? "slide-top" : "hidden"}>
          아이디어를 바탕으로
          <br />
          랜딩페이지와 설문문항을 만듭니다
        </p>
      </section>

      {/* 섹션 3 */}
      <section
        ref={section3}
        className="intro-snap flex min-h-screen flex-col items-center justify-center gap-20 px-8 pt-[60px] supports-[height:100dvh]:min-h-[100dvh]"
      >
        <h2
          className={
            isInViewport.activeIndex === 2
              ? "slide-down text-3xl font-bold md:text-4xl"
              : "hidden"
          }
        >
          Step3. 고객 데이터 수집
        </h2>
        <div
          className={
            isInViewport.activeIndex === 2
              ? "animate-fadein relative py-28"
              : "hidden"
          }
        >
          <div className="spinner-box">
            <div className="blue-orbit leo" />
            <div className="green-orbit leo" />
            <div className="red-orbit leo" />
            <div className="white-orbit w1 leo" />
            <div className="white-orbit w2 leo" />
            <div className="white-orbit w3 leo" />
          </div>
        </div>
        <p className={isInViewport.activeIndex === 2 ? "slide-top" : "hidden"}>
          아이디어에 적합한 방식으로 <br />
          홍보를 진행하며
          <br />
          고객 데이터를 수집합니다.
        </p>
      </section>

      {/* 섹션 4 */}
      <section
        ref={section4}
        className="intro-snap flex min-h-screen flex-col items-center justify-center gap-14 px-8 pt-[60px] supports-[height:100dvh]:min-h-[100dvh]"
      >
        <h2
          className={
            isInViewport.activeIndex === 3
              ? "slide-down pb-3 text-3xl font-bold leading-[40px] md:text-4xl md:leading-[50px]"
              : "hidden"
          }
        >
          단 3일 후<br />
          시장의 진짜 반응을
          <br />
          리포트로 확인하세요.
        </h2>
        <GradientLineChart
          animateOnView
          replayOnScroll
          viewThreshold={0.4}
          isIntersecting={isInViewport.activeIndex === 3 ? true : false}
        />
        <p className={isInViewport.activeIndex === 3 ? "slide-top" : "hidden"}>
          버튼 클릭률, 관심 포인트 <br />
          설문조사 결과를 제공합니다
        </p>
      </section>
    </div>
  );
}
