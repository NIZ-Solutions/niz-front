import { useEffect } from "react";
import ReactGA from "react-ga4";

const Analytics = (pathname: String) => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: pathname });
    return;
  }, [pathname]);
};

export default Analytics;
