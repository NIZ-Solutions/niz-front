export default function Submit() {
  const price = "49900";
  const textPrice = price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="flex w-full flex-col items-center justify-between pl-4 pr-5 text-black-000 min-[340px]:px-7 md:pb-0">
      <div className="flex min-h-screen w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-20 pb-[180px] pt-[180px] text-center md:flex-row md:justify-between md:pb-[120px] lg:px-0">
        <div className="flex flex-col gap-8 text-3xl font-bold text-blue-001 md:min-w-[50%]">
          <div className="flex flex-col gap-2">
            <p>금액 : {textPrice}원</p>
          </div>
        </div>
        <div>이곳에 결제모듈이 위치하게됩니다.</div>
      </div>
    </div>
  );
}
