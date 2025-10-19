import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useSelector";
import { useEffect } from "react";
import { subscriptionComplete } from "../store/orderSlice";
import { useAppDispatch } from "../hooks/useDispatch";
import Footer from "../components/layout/Footer";

export default function Submit() {
  const order = useAppSelector((state) => state.order).data;
  const textPrice = order?.amount.replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    ",",
  );
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(subscriptionComplete());
  // }, []);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between pl-4 pr-5 min-[340px]:px-7 md:pb-0">
        <div className="flex min-h-screen w-full min-w-[280px] max-w-screen-lg flex-col items-center justify-center gap-20 pb-[180px] pt-[180px] text-center lg:px-0">
          <div className="text-yellow-001 flex flex-col gap-8 text-3xl font-bold md:min-w-[50%] md:text-4xl">
            <div className="flex flex-col gap-2">
              <h1>결제완료</h1>
              <p>금액 : {textPrice ?? "00,000"}원</p>
            </div>
            <p className="text-base font-normal text-white-000 md:text-lg">
              주문번호 : {order?.paymentId ?? "AbcDefg"}
            </p>
          </div>
          <div className="flex min-w-full flex-col gap-5 text-xl md:min-w-[40%]">
            <p className="text-yellow-001 text-2xl font-extrabold">
              {order?.advicedAt.replace("T", " ").slice(0, 16) ??
                "2025-10-26 10:25"}
            </p>
            <p>상담을 위해 연락 드리겠습니다</p>
            <div></div>
            <p>감사합니다</p>
            <div className="flex w-full flex-col gap-4">
              {/* 버튼 - 마이페이지 */}
              <div className="flex flex-col gap-3 pt-9">
                <Link
                  to="/mypage"
                  className="group h-fit w-full items-center justify-center p-[2px] hover:drop-shadow"
                  type="submit"
                >
                  <span className="glowing-border inline-flex w-full items-center justify-center px-6 py-2 text-lg font-extrabold text-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm backdrop-saturate-150 transition-transform duration-300 ease-out active:scale-[0.97] group-hover:scale-[0.985] supports-[backdrop-filter]:backdrop-blur-sm">
                    마이페이지
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
