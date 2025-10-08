import GradientLineChart from "../components/GradientLineChart";

export default function Niz() {
  return (
    <div className="flex w-full min-w-[280px] flex-col items-center justify-between text-black-000">
      {/* 신청하기 */}
      <div className="flex h-screen w-full max-w-screen-lg flex-col items-center justify-center gap-8 px-7 text-center md:flex-row md:justify-between lg:px-0">
        <div className="flex flex-col gap-6 md:min-w-[40%]">
          <h1 className="text-4xl font-extrabold leading-[50px]">
            감이 아닌,
            <br />
            이제는 확신할 때
          </h1>
          <h2 className="font-medium">
            당신의 아이디어가 현실이 되도록,
            <br />
            <p className="inline text-blue-001">단 3일</p>
            만에 시장의 답을 보여드립니다.
          </h2>
        </div>
        <form className="submit flex h-fit w-full min-w-[280px] flex-col gap-6 md:max-w-[50%]">
          <div className="min-h-[15svh] w-full animate-border content-center rounded-xl border-2 border-transparent [background:linear-gradient(45deg,#F5F5F5)_padding-box,conic-gradient(from_var(--border-angle),#D0D0D0_50%,_#126DD7_86%,_#0F9AFB_90%,_#126DD7_94%,_#D0D0D0_100%)_border-box]">
            <div className="rounded-[9px] bg-white-000 p-4">
              <textarea
                className="min-h-[15svh] w-full resize-none bg-transparent placeholder:text-sm placeholder:text-gray-001"
                placeholder="시장 반응을 확인하고 싶은 아이디어가 있다면 입력해주세요. 아이디어에 대해 구체적으로 설명해 주시면 보다 정확하게 제안 받으실 수 있어요."
              ></textarea>
            </div>
          </div>
          {/* 폼으로이동 */}
          <button
            type="button"
            className="w-full rounded-lg bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] py-3 text-xl font-extrabold text-white-000"
          >
            신청하기
          </button>
        </form>
      </div>

      {/* 사용방법 소개 */}
      <div className="flex w-full flex-col items-center gap-10 px-8 py-[350px] text-center intro-gradient">
        <ul className="flex w-full max-w-screen-md flex-col gap-60 text-xl font-medium leading-7 text-white-000">
          <li className="flex flex-col gap-20 text-center">
            <h2 className="text-3xl font-bold">Step1. 아이디어 작성</h2>
            <div className="flex flex-col items-center justify-center">
              <p className="w-fit overflow-hidden whitespace-nowrap pb-4 text-5xl font-bold text-white">
                WRITE YOUR
              </p>
              <h1 className="animate-typing max-w-fit overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl font-bold text-white">
                OWN IDEAS !
              </h1>
            </div>
            <p>
              여러분의 아이디어를 <br />
              이해할 수 있도록 설명해주세요
            </p>
          </li>
          <li className="flex flex-col gap-10 text-center">
            <h2 className="text-3xl font-bold">Step2. 제작</h2>
            <div className="relative py-20">
              <div className="loading after:animate-loading text-5xl font-bold before:text-blue-000 before:content-['MAKING...'] after:absolute after:left-0 after:top-0 after:z-20 after:w-0 after:overflow-hidden after:text-white-000 after:opacity-100 after:content-['MAKING...']"></div>
            </div>
            <p>
              아이디어를 바탕으로
              <br />
              랜딩페이지와 설문문항을 만듭니다
            </p>
          </li>
          <li className="flex flex-col gap-10 text-center">
            <h2 className="text-3xl font-bold">Step3. 고객 데이터 수집</h2>
            <div className="relative py-28">
              <div className="spinner-box">
                <div className="blue-orbit leo"></div>
                <div className="green-orbit leo"></div>
                <div className="red-orbit leo"></div>
                <div className="white-orbit w1 leo"></div>
                <div className="white-orbit w2 leo"></div>
                <div className="white-orbit w3 leo"></div>
              </div>
            </div>
            <p>
              아이디어에 적합한 방식으로 <br />
              홍보를 진행하며
              <br />
              고객 데이터를 수집합니다.
            </p>
          </li>

          <li className="flex flex-col gap-10 text-center">
            <h2 className="pb-10 text-4xl font-extrabold leading-[50px]">
              단 3일 후<br />
              시장의 진짜 반응을
              <br />
              리포트로 확인하세요.
            </h2>
            <GradientLineChart
              animateOnView
              replayOnScroll={true}
              viewThreshold={0.2}
            />
            <p>
              버튼 클릭률, 관심 포인트 <br />
              설문조사 결과를 제공합니다
            </p>
          </li>
        </ul>
      </div>
      {/* 신청하기 */}
      <div className="flex h-screen w-full max-w-screen-lg flex-col items-center justify-center gap-20 px-7 text-center lg:px-0">
        <div className="flex flex-col gap-6 md:min-w-[40%]">
          <h1 className="text-3xl font-extrabold leading-[50px]">
            이제 아이디어를
            <br />
            실행하러 가볼까요?
          </h1>
        </div>
        {/* 폼으로이동 */}
        <button
          type="button"
          className="w-full max-w-[500px] rounded-lg bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] py-3 text-xl font-extrabold text-white-000"
        >
          NIZ 시장검증 시작하기
        </button>
      </div>
    </div>
  );
}
