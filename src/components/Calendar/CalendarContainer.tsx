import "./calendarContainer.css";
import CalendarHeader from "./CalendarHeader";
import Calendar from "./Calendar";
import { useState } from "react";
import { accordianYearArr } from "./data/calendar.data";
import CalendarAccordian from "./components/CalendarAccordian";
import CalendarFooter from "./CalendarFooter";

interface CalendarContainerProps {
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const CalendarContainer = ({
  selectedDate,
  setSelectedDate,
}: CalendarContainerProps) => {
  const today = new Date();

  const [currentYearMonth, setCurrentYearMonth] = useState(today);
  const [showList, setShowList] = useState(false);
  // 년 목록
  const years = accordianYearArr();
  return (
    <div className="calendar-wrapper">
      <CalendarHeader
        currentYearMonth={currentYearMonth}
        setCurrentYearMonth={setCurrentYearMonth}
        showList={showList}
        setShowList={setShowList}
      />
      {showList ? (
        <ul className="calendar-accordian-list">
          {years.map((year) => (
            <CalendarAccordian
              year={year}
              key={year}
              setCurrentYearMonth={setCurrentYearMonth}
              setShowList={setShowList}
            />
          ))}
        </ul>
      ) : (
        <Calendar
          today={today}
          currentYearMonth={currentYearMonth}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}

      <CalendarFooter setSelectedDate={setSelectedDate} />
    </div>
  );
};

export default CalendarContainer;
