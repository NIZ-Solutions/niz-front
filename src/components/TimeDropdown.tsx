interface TimeDropdownProps {
  handleClickTime: (el: string) => void;
}

export default function DateDropdown(handleClickTime: TimeDropdownProps) {
  const timeArr = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];
  const scrollStyle = {
    WebkitOverflowScrolling: "auto" as const, // iOS 안정성 ↑ (필요시 'touch'로)
    touchAction: "pan-y" as const,
    overscrollBehavior: "contain" as const,
  };

  return (
    <>
      <div className="relative h-full min-h-0 overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0 rounded-3xl back-glass" />
        <ul
          style={scrollStyle}
          className="relative h-full min-h-0 w-full space-y-1 overflow-y-auto py-2"
        >
          {timeArr.map((el) => (
            <li
              key={`${el}-time`}
              id={`${el}-time`}
              onClick={() => handleClickTime?.handleClickTime(el)}
              className="dropdown w-full py-1.5 pl-4 text-left hover:bg-white/10"
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
