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
    <div className="flex min-h-[120svh] w-full flex-col items-center justify-center gap-12 px-8 text-center">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
        이용요금 안내
      </h1>
      <ul className="flex w-full max-w-screen-lg flex-col gap-8 text-gray-001">
        <li className="flex flex-col gap-4 rounded-xl p-8 text-left back-glass">
          <h2 className="text-2xl font-bold text-blue-000">
            맞춤형 랜딩페이지 제작
          </h2>
          <h2 className="text-2xl font-bold text-gray-000">80,000 원</h2>
          <p className="pt-2 text-lg leading-[30px] md:text-xl">
            개발도, 제품 제작도 없이 단 3일 만에 시장의 진짜 반응을 데이터로
            확인하세요.
          </p>
          <button
            type="button"
            onClick={() => handleSubscription("PLAN1")}
            className="flex w-full self-center pt-5 hover:drop-shadow md:absolute md:bottom-[25px] md:right-[25px] md:inline-flex md:max-w-fit md:p-[2px]"
          >
            <span className="rounded-full font-bold text-white btn-glass-span-slim md:text-lg">
              신청
            </span>
          </button>
        </li>
        {/* <li className="relative flex flex-col gap-3 rounded-lg p-[20px] text-left back-glass">
          <h2 className="text-xl font-bold text-blue-001">
            맞춤형 디자인&nbsp;
            <p className="inline font-normal text-gray-001">사용</p>
          </h2>
          <h2 className="text-2xl font-bold text-gray-000">49,900 원</h2>
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
          <button
            type="button"
            onClick={() => handleSubscription("PLAN2")}
            className="group absolute bottom-[25px] right-[25px] inline-flex h-fit w-full max-w-fit items-center justify-center p-[2px] hover:drop-shadow"
          >
            <span className="btn-glass-span rounded-full text-lg font-extrabold text-white">
              선택
            </span>
          </button>
        </li>*/}
      </ul>
    </div>
  );
}
