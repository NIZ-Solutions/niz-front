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

  return (
    <>
      <ul className="back-glass flex w-full flex-col justify-start overflow-y-scroll rounded-md py-2 drop-shadow-lg">
        {timeArr.map((el) => (
          <li
            key={`${el}-time`}
            id={`${el}-time`}
            onClick={() => handleClickTime?.handleClickTime(el)}
            className="py-1 hover:bg-white/10"
          >
            {el}
          </li>
        ))}
      </ul>
    </>
  );
}
