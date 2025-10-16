import { useRef } from "react";
import useSnap from "../hooks/useSnap";
import GradientLineChart from "../components/GradientLineChart";

export default function Intro() {
  const wrapRef = useRef<HTMLDivElement>(null);
  useSnap(wrapRef);

  return (
    <div ref={wrapRef} className="w-full scroll-smooth text-center">
      {/* 섹션 1 */}
      <section className="intro-snap flex min-h-[100svh] flex-col items-center justify-center gap-20 px-8 supports-[height:100dvh]:min-h-[100dvh]">
        <h2 className="text-3xl font-bold">Step1. 아이디어 작성</h2>
        <div className="flex flex-col items-center justify-center">
          <p className="w-fit overflow-hidden whitespace-nowrap pb-4 text-5xl font-bold text-white">
            WRITE YOUR
          </p>
          <h1 className="max-w-fit animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl font-bold text-white">
            OWN IDEAS !
          </h1>
        </div>
        <p>
          여러분의 아이디어를 <br />
          이해할 수 있도록 설명해주세요
        </p>
      </section>

      {/* 섹션 2 */}
      <section className="intro-snap flex min-h-[100svh] flex-col items-center justify-center gap-20 px-8 supports-[height:100dvh]:min-h-[100dvh]">
        <h2 className="text-3xl font-bold">Step2. 제작</h2>
        <div className="relative py-20">
          <div className="loading text-5xl font-bold before:text-blue-000 before:content-['MAKING...'] after:absolute after:left-0 after:top-0 after:z-20 after:w-0 after:animate-loading after:overflow-hidden after:text-white-000 after:opacity-100 after:content-['MAKING...']" />
        </div>
        <p>
          아이디어를 바탕으로
          <br />
          랜딩페이지와 설문문항을 만듭니다
        </p>
      </section>

      {/* 섹션 3 */}
      <section className="intro-snap flex min-h-[100svh] flex-col items-center justify-center gap-20 px-8 supports-[height:100dvh]:min-h-[100dvh]">
        <h2 className="text-3xl font-bold">Step3. 고객 데이터 수집</h2>
        <div className="relative py-28">
          <div className="spinner-box">
            <div className="blue-orbit leo" />
            <div className="green-orbit leo" />
            <div className="red-orbit leo" />
            <div className="white-orbit w1 leo" />
            <div className="white-orbit w2 leo" />
            <div className="white-orbit w3 leo" />
          </div>
        </div>
        <p>
          아이디어에 적합한 방식으로 <br />
          홍보를 진행하며
          <br />
          고객 데이터를 수집합니다.
        </p>
      </section>

      {/* 섹션 4 */}
      <section className="intro-snap flex min-h-[100svh] flex-col items-center justify-center gap-14 px-8 supports-[height:100dvh]:min-h-[100dvh]">
        <h2 className="pb-10 text-4xl font-extrabold leading-[50px]">
          단 3일 후<br />
          시장의 진짜 반응을
          <br />
          리포트로 확인하세요.
        </h2>
        <GradientLineChart animateOnView replayOnScroll viewThreshold={0.2} />
        <p>
          버튼 클릭률, 관심 포인트 <br />
          설문조사 결과를 제공합니다
        </p>
      </section>
    </div>
  );
}
