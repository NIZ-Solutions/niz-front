import useModal from "../hooks/useModal";
import { useAppSelector } from "../hooks/useSelector";

export default function Submit() {
  const user = useAppSelector((state) => state.user);
  const { openModal } = useModal();
  const handleSubscription = () => {
    if (user.data === null) openModal({ type: "LOGIN" });
  };

  return (
    <div className="flex h-screen w-full max-w-screen-lg flex-col items-center justify-center gap-8 px-7 pt-[60px] text-center md:flex-row md:justify-between lg:px-0">
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
        <div className="animate-border min-h-[15svh] w-full content-center rounded-xl border-2 border-transparent [background:linear-gradient(45deg,#F5F5F5)_padding-box,conic-gradient(from_var(--border-angle),#D0D0D0_50%,_#126DD7_86%,_#0F9AFB_90%,_#126DD7_94%,_#D0D0D0_100%)_border-box]">
          <div className="rounded-[9px] bg-white-000 p-4">
            <textarea
              className="min-h-[15svh] w-full resize-none bg-transparent placeholder:text-sm placeholder:text-gray-001"
              placeholder="시장 반응을 확인하고 싶은 아이디어가 있다면 입력해주세요. 아이디어에 대해 구체적으로 설명해 주시면 보다 정확하게 제안 받으실 수 있어요."
            ></textarea>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubscription}
          className="w-full rounded-lg bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB] py-3 text-xl font-extrabold text-white-000"
        >
          신청하기
        </button>
      </form>
    </div>
  );
}
