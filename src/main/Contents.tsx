import Intro from "./Intro";
import Plan from "./Plan";
import Submit from "./Submit";

export default function Contents() {
  return (
    <div className="flex w-full min-w-[330px] max-w-screen-xl flex-col">
      <Submit />
      <Intro />
      <Plan />
    </div>
  );
}
