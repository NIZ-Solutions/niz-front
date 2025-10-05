import Intro from "./Intro";
import Plan from "./Plan";
import Submit from "./Submit";
import useDidMountEffect from "./../hooks/useDidMountEffect";

export default function Main() {
  const code = new URL(window.location.href).searchParams.get("code");
  useDidMountEffect(() => {
    // 카카오 인가코드 백엔드로 전송
    console.log(code);
  }, []);

  return (
    <>
      <div className="flex w-full min-w-[280px] flex-col items-center justify-between text-black-000">
        <Submit />
        <Intro />
        <Plan />
      </div>
    </>
  );
}
