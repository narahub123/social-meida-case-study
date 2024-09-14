import "./calendarAccordian.css";
import { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { convertDateToYYYYMMDD } from "../data/calendar.data";

interface CalendarAccordianProps {
  year: number;
  currentYearMonth: Date;
  setCurrentYearMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const CalendarAccordian = ({
  year,
  currentYearMonth,
  setCurrentYearMonth,
}: CalendarAccordianProps) => {
  const liRef = useRef<HTMLLIElement>(null);
  const [openAccordian, setOpenAccordian] = useState(false);
  useClickOutside(liRef, setOpenAccordian);
  const curMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
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
                  : () => setCurrentYearMonth(targetMonth)
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
