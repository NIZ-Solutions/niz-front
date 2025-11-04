import { useEffect, useRef } from "react";
import GradientLineChart from "../components/GradientLineChart";
import useIntersectionObsever from "../hooks/useIntersectionObserver";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText"; // 사용 환경에 맞는 경로 유지

export default function Intro() {
  const t1 = useRef<HTMLParagraphElement | null>(null);
  const t2 = useRef<HTMLParagraphElement | null>(null);
  const t3 = useRef<HTMLParagraphElement | null>(null);
  const t4 = useRef<HTMLParagraphElement | null>(null);

  const isInViewport = useIntersectionObsever([t1, t2, t3, t4], {
    threshold: 0.5,
    rootMargin: "0px 0px 0px 0px",
    once: false,
  });

  useEffect(() => {
    gsap.registerPlugin(SplitText);
  }, []);

  useEffect(() => {
    const active = isInViewport.activeIndex;
    if (active == null || active < 0) return;

    const targets = [t1, t2, t3, t4];
    const el = targets[active]?.current;
    if (!el) return;

    const host = el.parentElement ?? el;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0 });

      const h = el.offsetHeight;
      gsap.set(el, {
        display: "inline-block",
        height: h,
        overflow: "hidden",
        whiteSpace: "pre-wrap",
      });

      const split = new SplitText(el, { type: "lines,words", aria: "hidden" });
      gsap.set(split.lines, { display: "block" });
      gsap.set(split.words, { display: "inline-block" });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          split.revert();
          requestAnimationFrame(() => {
            gsap.set(el, { clearProps: "all" });
          });
        },
      });

      tl.set(el, { opacity: 1 });

      tl.from(split.lines, {
        duration: 1.6,
        yPercent: 100,
        opacity: 0,
        stagger: 0.22,
        ease: "expo.out",
        force3D: true,
        willChange: "transform",
      });
    }, host);

    return () => ctx.revert();
  }, [isInViewport.activeIndex]);

  return (
    <div className="container w-full text-center text-xl md:text-2xl">
      {/* 섹션 1 */}
      <section className="flex min-h-svh flex-col items-center justify-center gap-20 px-8 pt-[60px] supports-[height:100dvh]:min-h-[100dvh]">
        <h2 className="text-3xl font-bold md:text-4xl">Step1. 아이디어 작성</h2>

        <div className="flex flex-col items-center justify-center py-12">
          <p className="w-fit overflow-hidden whitespace-nowrap pb-4 text-5xl font-bold text-white">
            WRITE YOUR
          </p>
          <h1 className="max-w-fit animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl font-bold text-white">
            OWN IDEAS !
          </h1>
        </div>

        {/* 관찰/애니메이션 대상 */}
        <p ref={t1}>
          여러분의 아이디어를
          <br />
          이해할 수 있도록 설명해주세요
        </p>
      </section>

      {/* 섹션 2 */}
      <section className="flex min-h-svh flex-col items-center justify-center gap-20 px-8 pt-[60px] supports-[height:100dvh]:min-h-[100dvh]">
        <h2 className="text-3xl font-bold md:text-4xl">Step2. 제작</h2>

        <div className="relative animate-fadein py-16">
          <div className="loading text-5xl font-bold before:text-black-000 before:content-['MAKING...'] after:absolute after:left-0 after:top-0 after:z-20 after:w-0 after:animate-loading after:overflow-hidden after:text-white-000 after:opacity-100 after:content-['MAKING...']" />
        </div>

        {/* 관찰/애니메이션 대상 */}
        <p ref={t2}>
          아이디어를 바탕으로
          <br />
          랜딩페이지와 설문문항을 만듭니다
        </p>
      </section>

      {/* 섹션 3 */}
      <section className="flex min-h-svh flex-col items-center justify-center gap-16 px-8 pt-[60px] supports-[height:100dvh]:min-h-[100dvh]">
        <h2 className="text-3xl font-bold md:text-4xl">
          Step3. 고객 데이터 수집
        </h2>

        <div className="relative animate-fadein py-28">
          <div className="spinner-box">
            <div className="blue-orbit leo" />
            <div className="green-orbit leo" />
            <div className="red-orbit leo" />
            <div className="white-orbit w1 leo" />
            <div className="white-orbit w2 leo" />
            <div className="white-orbit w3 leo" />
          </div>
        </div>

        {/* 관찰/애니메이션 대상 */}
        <p ref={t3}>
          아이디어에 적합한 방식으로
          <br />
          홍보를 진행하며
          <br />
          고객 데이터를 수집합니다.
        </p>
      </section>

      {/* 섹션 4 */}
      <section className="flex min-h-svh flex-col items-center justify-center gap-14 px-8 pt-[60px] supports-[height:100dvh]:min-h-[100dvh]">
        <h2 className="pb-3 text-3xl font-bold leading-[40px] md:text-4xl md:leading-[50px]">
          단 3일 후 <br className="md:hidden" />
          시장의 진짜 반응을
          <br />
          리포트로 확인하세요.
        </h2>

        <GradientLineChart
          animateOnView
          replayOnScroll
          viewThreshold={0.8}
          isIntersecting={isInViewport.activeIndex === 3}
        />

        {/* 관찰/애니메이션 대상 */}
        <p ref={t4}>
          버튼 클릭률, 관심 포인트
          <br />
          설문조사 결과를 제공합니다
        </p>
      </section>
    </div>
  );
}
