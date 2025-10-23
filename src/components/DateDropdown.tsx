import { useState, useRef, useEffect } from "react";

interface DateDropdownProps {
  handleClickDate: (el: number, type: string) => void;
}

export default function DateDropdown({ handleClickDate }: DateDropdownProps) {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const yearArr = Array.from({ length: 2 }, (_, i) => year + i);
  const monthArr = Array.from({ length: 12 }, (_, i) => i + 1);
  const dayArr = Array.from({ length: 31 }, (_, i) => i + 1);

  const scrollStyle = {
    WebkitOverflowScrolling: "auto" as const, // iOS 안정성 ↑ (필요시 'touch'로)
    touchAction: "pan-y" as const,
    overscrollBehavior: "contain" as const,
  };

  return (
    <>
      {/* YEAR 컬럼 */}
      <div className="relative h-full min-h-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 rounded-l-3xl back-glass" />
        <ul
          style={scrollStyle}
          className="relative h-full min-h-0 w-full space-y-1 overflow-y-auto py-2"
        >
          {yearArr.map((el) => (
            <li key={`${el}-year`} className="px-2">
              <p
                onClick={() => handleClickDate(el, "year")}
                className="w-full py-1.5 pl-3 text-left hover:bg-white/10"
              >
                {el} 년
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative h-full min-h-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 back-glass" />
        <ul
          style={scrollStyle}
          className="relative h-full min-h-0 w-full space-y-1 overflow-y-auto py-2"
        >
          {monthArr.map((el) => (
            <li key={`${el}-month`} className="px-2">
              <p
                onClick={() => handleClickDate(el, "month")}
                className="dropdown w-full py-1.5 pl-3 text-left hover:bg-white/10"
              >
                {el} 월
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative h-full min-h-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 rounded-r-3xl back-glass" />
        <ul
          style={scrollStyle}
          className="relative h-full min-h-0 w-full space-y-1 overflow-y-auto py-2"
        >
          {dayArr.map((el) => (
            <li key={`${el}-day`} className="px-2">
              <p
                onClick={() => handleClickDate(el, "day")}
                className="dropdown w-full py-1.5 pl-3 text-left hover:bg-white/10"
              >
                {el} 일
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
