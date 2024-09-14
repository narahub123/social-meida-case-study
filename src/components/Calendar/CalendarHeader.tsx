import "./calendarHeader.css";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { FaCaretUp } from "react-icons/fa6";
import { accordianYearArr } from "./data/calendar.data";
import { useState } from "react";
import CalendarAccordian from "./components/CalendarAccordian";

interface CalendarHeaderProps {
  currentYearMonth: Date;
  setCurrentYearMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarHeader = ({
  currentYearMonth,
  setCurrentYearMonth,
}: CalendarHeaderProps) => {
  const [showList, setShowList] = useState(false);
  // 달 추가
  const handlePlusMonth = () => {
    const date = new Date(currentYearMonth);

    date.setMonth(date.getMonth() + 1);

    setCurrentYearMonth(new Date(date));
  };
  // 달 빼기
  const handleMinusMonth = () => {
    const date = new Date(currentYearMonth);

    date.setMonth(date.getMonth() - 1);

    setCurrentYearMonth(date);
  };

  // 년 목록
  const years = accordianYearArr();
  return (
    <div className="calendar-header">
      <div className="calendar-header-wrapper">
        <span
          className="calendar-header-left"
          onClick={() => setShowList(!showList)}
        >
          <p className="calendar-header-left-text">{`${currentYearMonth.getFullYear()}년 ${
            currentYearMonth.getMonth() + 1
          }월 `}</p>
          <FaCaretUp
            className={`calendar-header-left-icon${
              showList ? " show" : ""
            } icon`}
          />
        </span>
        <span className="calendar-header-right">
          <LuChevronUp onClick={handlePlusMonth} />
          <LuChevronDown onClick={handleMinusMonth} />
        </span>
      </div>
      {showList && (
        <ul className="calendar-accordian-list">
          {years.map((year) => (
            <CalendarAccordian
              year={year}
              key={year}
              currentYearMonth={currentYearMonth}
              setCurrentYearMonth={setCurrentYearMonth}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarHeader;
