import Intro from "./Intro";
import Plan from "./Plan";
import Submit from "./Submit";

export default function Main() {
  return (
    <>
      <div className="flex h-screen w-full min-w-[280px] snap-y snap-mandatory flex-col items-center justify-between overflow-y-scroll text-black-000 dark:bg-black-000 dark:text-white-000">
        <Submit />
        <Intro />
        <Plan />
      </div>
    </>
  );
}
