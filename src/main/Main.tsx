import Intro from "./Intro";
import Plan from "./Plan";
import Submit from "./Submit";

export default function Main() {
  return (
    <>
      <div className="flex w-full min-w-[330px] flex-col items-center">
        <Submit />
        <Intro />
        <Plan />
      </div>
    </>
  );
}
