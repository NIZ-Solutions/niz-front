import { useEffect, useCallback } from "react";
import WhiteLogo from "../../assets/logo_white.png";
import { useAppDispatch } from "../../hooks/useDispatch";
import { closeModal } from "../../store/modalSlice";

export default function TermModal() {
  const dispatch = useAppDispatch();

  // ESC로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeModal());
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  // 뒤쪽 스크롤 방지
  useEffect(() => {
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    // 스크롤바 보정
    const hasScrollbar =
      window.innerWidth > document.documentElement.clientWidth;
    const scrollbarWidth = hasScrollbar
      ? window.innerWidth - document.documentElement.clientWidth
      : 0;

    body.style.overflow = "hidden";
    if (scrollbarWidth) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  // 배경 클릭시 닫기
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) dispatch(closeModal());
    },
    [dispatch],
  );

  return (
    <div
      aria-modal="true"
      aria-label="경고"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
    >
      <div
        className="relative flex max-h-[60vh] min-h-[60vh] w-[min(80vw,600px)] flex-col justify-end rounded-xl bg-white text-black-000 shadow-xl"
        // 내부 클릭은 닫히지 않게
        onClick={(e) => e.stopPropagation()}
      >
        <header className="absolute top-0 flex h-[55%] w-full flex-col items-center justify-center gap-3 overflow-auto rounded-t-xl text-white-000 main-gradient">
          <img alt="로고" src={WhiteLogo} className="w-fit" />
          <div className="text-center text-3xl font-black">NIZ</div>
          <div className="text-center text-xl font-medium">
            당신의 아이디어를 <br />단 3일만에, 현실로
          </div>
        </header>
        <header className="absolute bottom-0 flex h-[45%] w-full flex-col items-center justify-between overflow-auto rounded-t-xl py-5 text-white-000">
          <div className="flex h-full flex-col justify-center">
            <div className="flex flex-col items-center gap-2 text-center text-lg font-medium text-gray-003">
              로그인 후 <br />
              이용 가능합니다.
            </div>
          </div>
          <button
            className="w-[90%] rounded-xl py-2 text-lg font-extrabold text-white-000 main-gradient"
            onClick={() => {
              dispatch(closeModal());
              window.location.replace("/login");
            }}
          >
            로그인 하러가기
          </button>
        </header>
      </div>
    </div>
  );
}
