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
      <ul className="dark:bg-gray-004 flex w-full flex-col justify-start overflow-y-scroll rounded-md bg-white-000 py-2 drop-shadow-lg">
        {timeArr.map((el) => (
          <li
            key={`${el}-time`}
            id={`${el}-time`}
            onClick={() => handleClickTime?.handleClickTime(el)}
            className="py-1 hover:bg-gray-001 dark:hover:bg-gray-002"
          >
            {el}
          </li>
        ))}
      </ul>
    </>
  );
}
