import "./calendarContainer.css";
import CalendarHeader from "./CalendarHeader";
import Calendar from "./Calendar";
import { useState } from "react";

const CalendarContainer = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentYearMonth, setCurrentYearMonth] = useState(today);
  return (
    <div className="calendar-wrapper">
      <CalendarHeader
        currentYearMonth={currentYearMonth}
        setCurrentYearMonth={setCurrentYearMonth}
      />
      {/* <Calendar
        today={today}
        currentYearMonth={currentYearMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      /> */}
    </div>
  );
};

export default CalendarContainer;
