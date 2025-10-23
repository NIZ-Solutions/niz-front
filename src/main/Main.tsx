import Footer from "../components/layout/Footer";
import Intro from "./Intro";
import Plan from "./Plan";
import Submit from "./Submit";

export default function Main() {
  return (
    <>
      <div className="flex w-full min-w-[280px] flex-col items-center justify-between text-white-000">
        <Submit />
        <Intro />
        <Plan />
        <Footer />
      </div>
    </>
  );
}
