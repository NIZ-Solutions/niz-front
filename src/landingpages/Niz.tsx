import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Intro from "../main/Intro";
import axios from "axios";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

export default function Niz() {
  const handleBtn1 = () => {
    ReactGA.event({
      category: "NIZ_버튼1",
      action: "버튼클릭",
    });
    window.location.href = "https://forms.gle/2uMgnFvXVPnEvzTM7";
  };
  const handleBtn2 = () => {
    ReactGA.event({
      category: "NIZ_버튼2",
      action: "버튼클릭",
    });
    window.location.href = "https://forms.gle/2uMgnFvXVPnEvzTM7";
  };
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRAKING_ID!);
      setInitialized(true);
    }
  }, []);

  // location 변경 감지시 pageview 이벤트 전송
  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send("Landing_niz_");
    }
  }, [initialized, location]);

  // 개발용
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRAKING_ID!);
    ReactGA.set({ page: location.pathname });
    ReactGA.send("pageview");
  }, [location]);

  useEffect(() => {
    axios
      .post("https://accounts.google.com/o/oauth2/token", {
        client_id: `${process.env.REACT_APP_OAUTH_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_OAUTH_CLIENT_SECRET}`,
        refresh_token: `${process.env.REACT_APP_OAUTH_REFRESH_TOKEN}`,
        grant_type: "refresh_token",
      })
      .then((res) => {
        console.log(res);
        axios
          .post(
            `https://analyticsdata.googleapis.com/v1beta/properties/${process.env.REACT_APP_GA4_PROPERTY_ID}:runReport`,
            {
              dimensions: [{ name: "dateHour" }],
              metrics: [
                { name: "active1DayUsers" },
                { name: "active7DayUsers" },
                { name: "checkouts" },
                { name: "eventCount" },
                { name: "eventCountPerUser" },
                { name: "screenPageViews" },
              ],
              dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
              keepEmptyRows: true,
            },
            {
              headers: {
                Authorization: `Bearer ${res.data.access_token}`,
              },
            },
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="relative">
      <div className="scrollbar-hide flex h-screen w-full min-w-[280px] snap-y snap-mandatory flex-col items-center justify-between overflow-y-scroll scroll-smooth">
        {/* 신청하기 */}
        <div className="flex min-h-screen w-full max-w-screen-lg snap-center snap-always flex-col items-center justify-center gap-12 px-7 pt-[60px] text-center lg:px-0">
          <div className="flex flex-col gap-6 md:min-w-[40%]">
            <h1 className="text-4xl font-extrabold leading-[50px]">
              감이 아닌,
              <br />
              이제는 확신할 때
            </h1>
            <h2 className="font-medium">
              당신의 아이디어가 현실이 되도록,
              <br />
              <p className="text-yellow-001 inline">단 3일</p>
              만에 시장의 답을 보여드립니다.
            </h2>
          </div>
          <form className="submit flex h-fit w-full min-w-[280px] flex-col gap-6 md:max-w-[40%]">
            <button
              onClick={handleBtn1}
              type="button"
              id="btn-sub-main"
              className="group relative inline-flex w-full items-center justify-center p-[2px] hover:drop-shadow"
            >
              <span className="glowing-border inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-xl font-extrabold text-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm backdrop-saturate-150 transition-transform duration-300 ease-out active:scale-[0.97] group-hover:scale-[0.985] supports-[backdrop-filter]:backdrop-blur-sm">
                신청하기
              </span>
            </button>
          </form>
        </div>

        {/* 사용방법 소개 */}
        <Intro />
        {/* 신청하기 */}
        <div className="flex min-h-screen w-full max-w-screen-lg snap-center snap-always flex-col items-center justify-center gap-20 px-7 text-center lg:px-0">
          <div className="flex flex-col gap-6 md:min-w-[40%]">
            <h1 className="text-3xl font-extrabold leading-[50px]">
              이제 아이디어를
              <br />
              실행하러 가볼까요?
            </h1>
          </div>
          {/* 폼으로이동 */}
          <button
            onClick={handleBtn2}
            type="button"
            id="btn-sub-last"
            className="group relative inline-flex w-full items-center justify-center p-[2px] hover:drop-shadow md:max-w-[40%]"
          >
            <span className="glowing-border inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-xl font-extrabold text-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm backdrop-saturate-150 transition-transform duration-300 ease-out active:scale-[0.97] group-hover:scale-[0.985] supports-[backdrop-filter]:backdrop-blur-sm">
              NIZ 시장검증 시작하기
            </span>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
