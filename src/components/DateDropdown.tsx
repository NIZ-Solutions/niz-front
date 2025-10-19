import { useState, useRef, useEffect } from "react";

interface DateDropdownProps {
  handleClickDate: (el: number, type: string) => void;
}

export default function DateDropdown(handleClickDate: DateDropdownProps) {
  let nowDate = new Date();
  const year = nowDate.getFullYear(); // 년도
  const yearArr = Array.from({ length: 2 }, (_, idx) => year + idx);
  const monthArr = Array.from({ length: 12 }, (_, idx) => idx + 1);
  const dayArr = Array.from({ length: 31 }, (_, idx) => idx + 1);

  return (
    <>
      <ul className="back-glass flex w-1/3 flex-col justify-start rounded-l-md py-2 drop-shadow-lg">
        {yearArr.map((el) => (
          <li
            key={`${el}-year`}
            id={`${el}-year`}
            onClick={() => handleClickDate?.handleClickDate(el, "year")}
            className="py-1 hover:bg-white/10"
          >
            {el} 년
          </li>
        ))}
      </ul>
      <ul className="back-glass flex w-1/3 flex-col justify-start overflow-y-scroll py-2 drop-shadow-lg">
        {monthArr.map((el) => (
          <li
            key={`${el}-month`}
            id={`${el}-month`}
            onClick={() => handleClickDate?.handleClickDate(el, "month")}
            className="py-1 hover:bg-white/10"
          >
            {el} 월
          </li>
        ))}
      </ul>
      <ul className="back-glass flex w-1/3 flex-col justify-start overflow-y-scroll rounded-r-md py-2 drop-shadow-lg">
        {dayArr.map((el) => (
          <li
            key={`${el}-day`}
            id={`${el}-day`}
            onClick={() => handleClickDate?.handleClickDate(el, "day")}
            className="py-1 hover:bg-white/10"
          >
            {el} 일
          </li>
        ))}
      </ul>
    </>
  );
}
