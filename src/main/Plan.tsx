import useModal from "../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";

export default function Plan() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const { openModal } = useModal();

  const handleSubscription = (type: string) => {
    if (user.data === null) openModal({ type: "LOGIN" });
    else navigate("/subscription", { state: { planType: type } });
  };

  return (
    <div className="flex min-h-[120svh] w-full flex-col items-center justify-center gap-12 px-8 text-center supports-[height:100dvh]:min-h-[100dvh]">
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
      </ul>
    </div>
  );
}
