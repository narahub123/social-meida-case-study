import { useState } from "react";
import "./calendar.css";
import {
  daysStartWithSunday,
  daysStartWithMonday,
  dates,
  convertDateToYYYYMMDD,
} from "./data/calendar.data";

interface CalendarProps {
  today: Date;
  currentYearMonth: Date;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const Calendar = ({
  today,
  currentYearMonth,
  selectedDate,
  setSelectedDate,
}: CalendarProps) => {
  // 요일의 시작을 일요일로 하느냐 월요일로 하느냐 결정
  const [daySetting, setDaySetting] = useState(false);
  const dayList = daySetting ? daysStartWithMonday : daysStartWithSunday;

  const datesArr: Date[] = dates(currentYearMonth);

  const handleSelectDate = (date: Date) => {
    // 날짜에 현재 시간 추가하기
    date.setHours(today.getHours(), today.getMinutes(), today.getSeconds());

    setSelectedDate(date);
  };

  return (
    <div className="calendar">
      {/* 요일 */}

      <ul className="calendar-container">
        {dayList.map((day, index) => {
          return (
            <li className="calendar-item-day" key={day}>
              <p
                className={`calendar-item-text-day${
                  index === 0 ? " sunday" : index === 6 ? " saturday" : ""
                }`}
              >
                {day}
              </p>
            </li>
          );
        })}
      </ul>

      {/* 날짜 */}
      <ul className="calendar-container">
        {datesArr.map((date) => {
          const day = date.getDay();
          return (
            <li className={`calendar-item`} key={date.toLocaleString()}>
              <p
                className={`calendar-item-text${
                  day === 0 ? " sunday" : day === 6 ? " saturday" : ""
                }${
                  currentYearMonth.getMonth() < date.getMonth() ? " next" : ""
                }${
                  currentYearMonth.getMonth() > date.getMonth() ? " last" : ""
                }${
                  convertDateToYYYYMMDD(today) === convertDateToYYYYMMDD(date)
                    ? " today"
                    : ""
                }${
                  selectedDate &&
                  convertDateToYYYYMMDD(date) ===
                    convertDateToYYYYMMDD(selectedDate)
                    ? " selected"
                    : ""
                }`}
                onClick={() => handleSelectDate(date)}
              >{`${date.getDate()}`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calendar;
