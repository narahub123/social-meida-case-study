import "./calendarHeader.css";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { FaCaretUp } from "react-icons/fa6";

interface CalendarHeaderProps {
  currentYearMonth: Date;
  setCurrentYearMonth: React.Dispatch<React.SetStateAction<Date>>;
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarHeader = ({
  currentYearMonth,
  setCurrentYearMonth,
  showList,
  setShowList,
}: CalendarHeaderProps) => {
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
          <LuChevronUp
            className="calendar-header-right-icon icon"
            onClick={handlePlusMonth}
          />
          <LuChevronDown
            className="calendar-header-right-icon icon"
            onClick={handleMinusMonth}
          />
        </span>
      </div>
    </div>
  );
};

export default CalendarHeader;
