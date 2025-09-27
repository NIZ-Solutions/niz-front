import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <h1 className="mt-20 text-center text-4xl font-bold sm:mt-28 sm:text-9xl">
        404
      </h1>
      <p className="mb-5 mt-4 text-center text-lg sm:mb-10 sm:text-3xl">
        페이지를 찾을 수 없습니다.
      </p>
      <div className="text-center">
        <Link to="/" className="btn btn-md sm:btn-lg btn-primary sm:w-40">
          메인으로
        </Link>
      </div>
    </>
  );
}
