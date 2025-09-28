export default function Submit() {
  return (
    <div className="flex w-full flex-col items-center gap-10 px-8 pb-[180px] pt-[180px] text-center">
      <h1 className="text-4xl font-extrabold">
        감이 아닌,
        <br />
        이제는 확신할 때
      </h1>
      <h2 className="font-medium">
        당신의 아이디어가 현실이 되도록,
        <br />
        <h2 className="inline text-blue-001">단 3일</h2>
        만에 시장의 답을 보여드립니다.
      </h2>
      <form className="submit flex w-full min-w-[330px] max-w-screen-xl flex-col gap-4">
        <div className="content-center rounded-xl p-[2px] main-gradient">
          <div className="rounded-[9px] bg-white-000 p-4">
            <textarea
              className="min-h-[115px] w-full placeholder:text-sm placeholder:text-gray-001"
              placeholder="시장 반응을 확인하고 싶은 아이디어가 있다면 입력해주세요. 아이디어에 대해 구체적으로 설명해 주시면 보다 정확하게 제안 받으실 수 있어요."
            ></textarea>
          </div>
        </div>
        <button className="w-full rounded-lg py-3 text-xl font-extrabold text-white-000 main-gradient">
          신청하기
        </button>
      </form>
    </div>
  );
}
