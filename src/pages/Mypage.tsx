import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getMypage } from "../api/user/userAxios";
import { useAppSelector } from "../hooks/useSelector";
import Footer from "../components/layout/Footer";

export default function Mypage() {
  const user = useAppSelector((state) => state.user).data;
  const [userInfo, setUserInfo] = useState([
    {
      id: "1",
      paymentId: "pay_1234567890",
      userId: "1",
      amount: 10000,
      status: "PAID",
      advicedAt: "2025-10-20T15:00:00.000Z",
      name: "홍길동",
      phone: "01012345678",
      email: "user@example.com",
      otherText:
        "추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. 추가 요청사항입니다. ",
      createdAt: "2025-10-07T12:34:56.000Z",
    },
  ]);
  const resGetMypage = useAxios(
    () => getMypage(user?.accessToken!),
    [user?.refreshToken],
    true,
  );

  useEffect(() => {
    console.log("resGetMypage.status:", resGetMypage.status);
    if (resGetMypage.status === "Idle") {
      resGetMypage.axiosData();
    }
    if (resGetMypage.status === "Success" && resGetMypage.responseData) {
      setUserInfo(resGetMypage.responseData);
      console.log(userInfo);
    }
    if (resGetMypage.status === "Refresh") {
      resGetMypage.axiosData();
    }
    if (resGetMypage.status === "Error") {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resGetMypage.status, resGetMypage.responseData]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col overflow-auto text-gray-001">
        <div className="flex min-h-fit w-full min-w-[280px] max-w-screen-lg flex-col justify-center gap-3 self-center px-7 pb-[120px] pt-[120px] md:min-h-screen md:justify-start md:overflow-scroll md:overflow-x-hidden md:text-center">
          <h1 className="mr-auto text-4xl font-extrabold leading-[50px] text-white-000 md:mr-0 md:min-w-[50%]">
            신청내역
          </h1>
          <p className="pb-10 text-sm text-gray-001">
            상담 변경은 고객센터를 통해 부탁드립니다.
          </p>
          <div className="flex flex-col gap-16 md:text-left">
            {userInfo.length === 0 ? (
              <p className="text-gray-001">신청 내역이 없습니다.</p>
            ) : (
              userInfo.map((info) => (
                <div key={info.id} className="flex flex-col gap-1">
                  <div className="flex flex-row text-lg">
                    <p className="font-medium">상태 :&nbsp;</p>
                    <p className="font-semibold text-blue-001">
                      {info.status === "PAID" ? "결제 완료" : info.status}
                    </p>
                  </div>
                  <div className="flex flex-row text-lg font-medium">
                    <p>주문번호 :&nbsp;</p>
                    <p>{info.paymentId}</p>
                  </div>
                  <div className="back-glass relative mt-2 flex flex-col gap-2 rounded-lg p-5 md:text-left">
                    <p>
                      <p className="inline font-medium">상담시간 :</p>&nbsp;
                      {info.advicedAt.replace("T", " ").slice(0, 16)}
                    </p>
                    <p>
                      <p className="inline font-medium">이름 :</p>&nbsp;
                      {info.name}
                    </p>
                    <p>
                      <p className="inline font-medium">이메일 주소 :</p>&nbsp;
                      {info.email}
                    </p>
                    <p>
                      <p className="inline font-medium">연락처 :</p>&nbsp;
                      {info.phone}
                    </p>
                    {info.otherText && (
                      <p>
                        <p className="inline font-medium">
                          기타 요청사항 및 전달사항 :
                        </p>
                        &nbsp;{info.otherText}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
