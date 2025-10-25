import useModal from "../hooks/useModal";
import { useLayoutEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";
import * as THREE from "three";

export default function Submit() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const { openModal } = useModal();
  const handleSubscription = () => {
    if (user.data === null) openModal({ type: "LOGIN" });
    else {
      const textArea = document.getElementById(
        "submit-textarea",
      ) as HTMLTextAreaElement;
      const explanationText = textArea.value.trim();
      if (explanationText === "") {
        alert("아이디어에 대해 구체적인 설명을 적어주세요 :)");
      } else {
        // textarea 저장 후
        navigate("/subscription", {
          state: { explanationText: explanationText },
        });
      }
    }
  };

  const [value, setValue] = useState("");

  return (
    <div className="submit intro-snap flex min-h-screen w-full max-w-screen-lg snap-center snap-always flex-col items-center justify-center gap-8 px-7 pt-[60px] text-center md:flex-row lg:px-0">
      <div className="flex flex-col gap-6 text-white drop-shadow-lg md:min-w-[40%]">
        <h1 className="text-4xl font-extrabold leading-[50px]">
          감이 아닌,
          <br />
          이제는 확신할 때
        </h1>
        <h2 className="text-base font-medium md:text-lg">
          당신의 아이디어가 현실이 되도록,
          <br />
          <p className="inline font-semibold text-blue-000">단 3일</p>
          만에 시장의 답을 보여드립니다.
        </h2>
      </div>
      <form className="submit flex h-fit w-full min-w-[280px] flex-col gap-12 md:max-w-[50%]">
        <div className="relative min-h-[30svh] overflow-hidden rounded-[50px] shadow-lg">
          <div className="back-glass-v2" />
          <textarea
            id="submit-textarea"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={1500}
            className="back-glass-inner absolute left-0 z-10 min-h-[30svh] w-full resize-none rounded-[50px] bg-black/5 p-8 text-white outline-none placeholder:font-light placeholder:text-white"
            placeholder="시장 반응을 확인하고 싶은 아이디어가 있다면 입력해주세요. 아이디어에 대해 구체적으로 설명해 주시면 보다 정확하게 제안 받으실 수 있어요."
          />
          <div className="absolute bottom-5 right-6 z-10 text-xs text-gray-300">
            {value.length}/1500
          </div>
        </div>
        <div className="relative min-w-[40%] self-center overflow-hidden rounded-full md:w-full">
          <div
            className="back-glass-v2 pointer-events-none absolute inset-0 left-0 -z-10 w-full"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={handleSubscription}
            className="back-glass-inner relative z-10 w-full self-center rounded-full bg-black/5 p-3 text-white outline-none"
          >
            <span className="rounded-full font-extrabold">신청하기</span>
          </button>
        </div>
      </form>
    </div>
  );
}
