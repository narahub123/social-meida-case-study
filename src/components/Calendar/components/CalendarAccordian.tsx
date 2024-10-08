import "./calendarAccordian.css";
import { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { convertDateToYYYYMMDD } from "../data/calendar.data";

interface CalendarAccordianProps {
  year: number;
  setCurrentYearMonth: React.Dispatch<React.SetStateAction<Date>>;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}
const CalendarAccordian = ({
  year,
  setCurrentYearMonth,
  setShowList,
}: CalendarAccordianProps) => {
  const liRef = useRef<HTMLLIElement>(null);
  const [openAccordian, setOpenAccordian] = useState(false);
  useClickOutside(liRef, setOpenAccordian);
  const curMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const handleCurrentYearMonth = (target: Date) => {
    setCurrentYearMonth(target);
    setShowList(false);
  };
  return (
    <li className="calendar-accordian" ref={liRef}>
      <p
        className="calendar-accordian-title"
        onClick={() => setOpenAccordian(!openAccordian)}
      >
        {year}
      </p>
      <ul
        className={`calendar-accordian-container${
          openAccordian ? " open" : ""
        }`}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
          const targetMonth = new Date(year, month - 1, 1);
          return (
            <li
              className={`calendar-accordian-item${
                convertDateToYYYYMMDD(curMonth) >
                convertDateToYYYYMMDD(targetMonth)
                  ? " past"
                  : ""
              }`}
              onClick={
                convertDateToYYYYMMDD(curMonth) >
                convertDateToYYYYMMDD(targetMonth)
                  ? undefined
                  : () => handleCurrentYearMonth(targetMonth)
              }
            >
              {month}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default CalendarAccordian;
