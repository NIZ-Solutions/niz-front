import { useEffect, useCallback } from "react";
import { useAppDispatch } from "../../hooks/useDispatch";
import { closeModal } from "../../store/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
        className="max-h-[80vh] w-[min(80vw,800px)] overflow-auto rounded-xl bg-white p-8 text-black-000 shadow-xl"
        // 내부 클릭은 닫히지 않게
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-8 flex flex-row items-start justify-between">
          <h2 className="text-2xl font-bold">이용약관 전문</h2>
          <button
            type="button"
            className="text-xl"
            onClick={() => dispatch(closeModal())}
            aria-label="닫기"
          >
            <FontAwesomeIcon icon={faXmark} color="#A0A0A0" />
          </button>
        </header>

        {/* 약관 본문 */}
        <section className="prose flex max-w-none flex-col gap-10">
          {/* ...약관 내용*/}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">1. 이용약관</h3>
            <div>
              <p className="font-semibold">제1조 (목적)</p>
              <p>
                본 약관은 NIZ(이하 “회사”)가 제공하는 서비스의 이용과 관련하여
                회사와 회원 간의 권리, 의무 및 책임사항을 규정합니다.
              </p>
            </div>
            <div>
              <p className="font-semibold">제2조 (회원가입 및 자격)</p>
              <p>
                1. 회원은 본 약관에 동의하고 회사가 정한 절차에 따라 가입 신청을
                완료해야 합니다. <br />
                2. 허위 정보 기재, 타인 정보 도용 시 회원 자격이 제한될 수
                있습니다.
              </p>
            </div>
            <div>
              <p className="font-semibold">제3조 (회원의 의무)</p>
              <p>
                회원은 서비스 이용 시 다음 행위를 해서는 안 됩니다.
                <br />
                1. 법령 및 본 약관을 위반하는 행위
                <br />
                2. 타인의 계정 도용 또는 개인정보 침해
                <br />
                3. 회사의 정상적인 서비스 운영을 방해하는 행위
              </p>
            </div>
            <div>
              <p className="font-semibold">제4조 (서비스 제공 및 중단)</p>
              <p>
                1. 회사는 안정적으로 서비스를 제공하기 위해 노력합니다.
                <br />
                2. 시스템 점검, 천재지변 등 불가항력 사유 시 서비스가 일시
                중단될 수 있습니다.
              </p>
            </div>
            <div>
              <p className="font-semibold">제5조 (회원탈퇴 및 자격 상실)</p>
              <p>
                1. 회원은 언제든 탈퇴 요청을 할 수 있으며, 회사는 즉시
                처리합니다.
                <br />
                2. 회원이 본 약관을 위반한 경우 회사는 경고·이용제한·자격상실
                조치를 취할 수 있습니다.
              </p>
            </div>
            <div>
              <p className="font-semibold">제6조 (손해배상 및 면책)</p>
              <p>
                1. 회사는 고의 또는 중대한 과실이 없는 한 서비스 이용으로 인한
                손해에 책임을 지지 않습니다.
                <br />
                2. 회원 간, 또는 회원과 제3자 간 분쟁에 대해서는 회사가 책임지지
                않습니다.
              </p>
            </div>
            <div>
              <p className="font-semibold">제7조 (관할법원 및 준거법)</p>
              <p>
                본 약관과 관련된 분쟁은 대한민국 법률에 따르며, 회사 본사
                소재지를 관할하는 법원을 제1심 관할 법원으로 합니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">
              2. 개인정보 수집 및 이용 약관
            </h3>
            <div>
              <p className="font-semibold">제1조 (수집 항목)</p>
              <p>
                - 필수 항목: 이름, 이메일, 연락처 <br />- 선택 항목: 웹로그
                데이터(접속 기록, 이용 이력 등), 설문 응답 데이터
              </p>
            </div>
            <div>
              <p className="font-semibold">제2조 (이용 목적)</p>
              <p>
                - 서비스 제공 및 개선
                <br />
                - 수요 분석 및 사업계획 수립
                <br />
                - 서비스 런칭 알림 제공
                <br />
              </p>
            </div>
            <div>
              <p className="font-semibold">제3조 (보관 및 폐기)</p>
              <p>
                - 런칭 알림 제공 이후, 개인정보(이름·이메일·연락처)는 즉시
                폐기합니다.
                <br />- 웹로그·설문 데이터는 개인을 식별할 수 없는 통계 형태로
                가공·보관할 수 있습니다.
              </p>
            </div>
            <div>
              <p className="font-semibold">제4조 (제3자 제공)</p>
              <p>
                회사는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다. 단,
                법령에 따라 요청받은 경우는 예외로 합니다.
              </p>
            </div>
            <div>
              <p className="font-semibold">제5조 (이용자의 권리)</p>
              <p>
                이용자는 언제든지 본인의 개인정보에 대한 열람, 수정, 삭제, 동의
                철회를 요청할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">3. 결제 및 환불 약관</h3>
            <div>
              <p className="font-semibold">제1조 (결제)</p>
              <p>
                1. 결제는 신용카드, 계좌이체, 간편결제 등 회사가 지정한 방식으로
                합니다. <br />
                2. 모든 유료 서비스는 선결제를 원칙으로 합니다.
              </p>
            </div>
            <div>
              <p className="font-semibold">제2조 (환불 가능 조건)</p>
              <p>
                - 서비스 미제공
                <br />
                - 회사의 귀책 사유로 정상 이용 불가
                <br />
                - 법령상 환불 의무가 발생하는 경우
                <br />
              </p>
            </div>
            <div>
              <p className="font-semibold">제3조 (환불 불가 조건)</p>
              <p>
                - 서비스 이용을 시작한 경우
                <br />
                - 이벤트/프로모션 상품 등 특별 조건이 적용된 경우
                <br />
                - 회원 귀책 사유로 서비스 이용이 제한된 경우
                <br />
              </p>
            </div>
            <div>
              <p className="font-semibold">제4조 (환불 절차)</p>
              <p>
                1. 환불 요청은 고객센터를 통해 접수해야 하며, 결제 내역 확인이
                가능해야 합니다.
                <br />
                2. 환불은 접수일로부터 7영업일 이내에 처리됩니다.
                <br />
                3. 환불은 원칙적으로 결제 수단과 동일한 방법으로 진행됩니다.
                <br />
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">4. 마케팅 정보 수신 동의</h3>
            <div>
              <p className="font-semibold">제1조 (수집 항목)</p>
              <p>이름, 이메일, 연락처</p>
            </div>
            <div>
              <p className="font-semibold">제2조 (이용 목적)</p>
              <p>서비스 관련 소식, 이벤트 및 프로모션 안내</p>
            </div>
            <div>
              <p className="font-semibold">제3조 (보관 및 폐기)</p>
              <p>수신 거부 시 즉시 정보 제공을 중단합니다.</p>
            </div>
            <div>
              <p className="font-semibold">제4조 (철회 권리)</p>
              <p>
                이용자는 언제든지 이메일/문자 내 “수신거부” 기능 또는 고객센터를
                통해 동의를 철회할 수 있습니다.
              </p>
            </div>
          </div>
        </section>
        <button
          type="button"
          className="mt-10 w-full rounded-xl py-3 text-xl font-extrabold text-white-000 main-gradient"
          onClick={() => dispatch(closeModal())}
          aria-label="닫기"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
