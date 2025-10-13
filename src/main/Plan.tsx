import useModal from "../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";

export default function Plan() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const { openModal } = useModal();
  const handleSubscription = (type: string) => {
    if (user.data === null) openModal({ type: "LOGIN" });
    else {
      if (type === "PLAN1") {
      }
      if (type === "PLAN2") {
      }
      navigate("/subscription");
    }
  };

  return (
    <div className="flex w-full snap-start snap-always flex-col items-center gap-12 px-8 py-[150px] text-center">
      <h1 className="text-4xl font-extrabold">이용요금 안내</h1>
      <ul className="flex w-full max-w-screen-lg flex-col gap-6 text-[15px] text-gray-002 dark:text-gray-002">
        <li className="relative flex flex-col gap-3 rounded-lg border border-gray-001 p-[25px] pt-[20px] text-left">
          <h2 className="text-xl font-bold text-blue-001">
            기존 디자인&nbsp;
            <p className="inline text-gray-003 dark:text-gray-001">사용</p>
          </h2>
          <h2 className="text-2xl font-bold text-gray-003 dark:text-gray-001">
            4,900 원
          </h2>
          <p className="leading-[25px]">
            NIZ가 보유한 디자인 중 하나를 선택합니다.
            <br />
            내용 어쩌구 저쩌구 ....
            <br />
            어쩌구 저쩌구 ...
            <br />
            블라블라블라얄라랴랑랴성어쩌구
            <br />
            이런플랜입니다.
            <br />
            저런플랜.
          </p>
          <button
            type="button"
            onClick={() => handleSubscription("PLAN1")}
            className="absolute bottom-[25px] right-[25px] h-fit max-w-fit rounded-lg bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] px-7 py-2 font-bold text-white-000"
          >
            선택
          </button>
        </li>
        <li className="relative flex flex-col gap-3 rounded-lg border border-gray-001 p-[25px] pt-[20px] text-left">
          <h2 className="text-xl font-bold text-blue-001">
            맞춤형 디자인&nbsp;
            <p className="inline text-gray-003 dark:text-gray-001">사용</p>
          </h2>
          <h2 className="text-2xl font-bold text-gray-003 dark:text-gray-001">
            49,900 원
          </h2>
          <p className="leading-[25px]">
            아이디어에 맞춰 상담 진행 후 <br />
            커스텀 랜딩페이지를 만들어 제공합니다.
            <br />
            상담은 최대 3회 진행됩니다. <br />
            블라블라얄라량라얄라성어쩌구
            <br />
            이런플랜입니ㅏㄷ
            <br /> 저런플랜입니다.
          </p>
          <button
            type="button"
            onClick={() => handleSubscription("PLAN2")}
            className="absolute bottom-[25px] right-[25px] h-fit max-w-fit rounded-lg bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] px-7 py-2 font-bold text-white-000"
          >
            선택
          </button>
        </li>
      </ul>
    </div>
  );
}
