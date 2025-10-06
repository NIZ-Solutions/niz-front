import { useEffect, useCallback } from "react";
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
      role="dialog"
      aria-modal="true"
      aria-label="약관"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
    >
      {/* 모달 내용 */}
      <div
        className="max-h-[80vh] w-[min(92vw,800px)] overflow-auto rounded-xl bg-white p-6 shadow-xl"
        // 내부 클릭은 닫히지 않게
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">이용약관</h2>
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="rounded px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
            aria-label="닫기"
          >
            닫기
          </button>
        </header>

        {/* 약관 본문 */}
        <section className="prose max-w-none">
          {/* ...약관 내용*/}
          <p>약관 내용이 여기 표시됩니다.</p>
        </section>
      </div>
    </div>
  );
}
