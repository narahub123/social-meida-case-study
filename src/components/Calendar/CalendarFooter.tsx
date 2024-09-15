import "./calendarFooter.css";

interface CalendarFooterProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const CalendarFooter = ({ setSelectedDate }: CalendarFooterProps) => {
  const handleDeleteSelectedDate = () => {
    setSelectedDate(undefined);
  };
  const handleSetToday = () => {
    setSelectedDate(new Date());
  };
  return (
    <div className="calendar-footer">
      <button
        className="calendar-footer-btn"
        onClick={handleDeleteSelectedDate}
      >
        삭제
      </button>
      <button className="calendar-footer-btn" onClick={handleSetToday}>
        오늘
      </button>
    </div>
  );
};

export default CalendarFooter;
