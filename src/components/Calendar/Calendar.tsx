import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import "./calendar.css";
import { FaCaretDown } from "react-icons/fa";
import { calculateLastDateOfMonth, days } from "./data/calendar.data";
import { useState } from "react";

const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // 날짜 형식 바꾸기
  const formatDate = (traget: Date) => {
    const year = traget.getFullYear();
    const month = traget.getMonth();
    const date = traget.getDate();

    return `${year}.${month + 1}.${date}`;
  };

  // 마지막 날 계산하기
  const lastDate = calculateLastDateOfMonth(selectedDate);
  // 마지막 날을 통해서 날짜 배열 만들기
  const dateArr = Array.from({ length: lastDate }, (_, i) => i + 1);

  //한달 추가
  const plusMonth = () => {
    const date = selectedDate;

    const addedDate = new Date(date.setMonth(date.getMonth() + 1));
    console.log(addedDate);
    setSelectedDate(addedDate);
  };
  // 한달 빼기
  const minusMonth = () => {
    const date = selectedDate;
    const minusDate = new Date(date.setMonth(date.getMonth() - 1));
    console.log(minusDate);

    setSelectedDate(minusDate);
  };

  console.log(selectedDate);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="calendar-header-title">
          <p className="calendar-header-title-text">
            {formatDate(selectedDate)}
          </p>
          <FaCaretDown className=" icon" />
        </div>
        <div className="calendar-header-btns">
          <LuChevronUp className="icon" onClick={() => plusMonth()} />
          <LuChevronDown className="icon" onClick={() => minusMonth()} />
        </div>
      </div>
      <div className="calendar-content">
        <ul className="calendar-content-days">
          {days.map((day) => (
            <li className="calendar-content-item">
              <p className="calendar-content-item-content">{day}</p>
            </li>
          ))}
        </ul>
        <ul className="calendar-content-dates">
          {dateArr.map((date) => {
            const curDate = new Date(year, month, date);
            return (
              <li
                className={`calendar-content-item${
                  curDate.getDay() % 7 === 0
                    ? " sunday"
                    : curDate.getDay() % 6 === 0
                    ? " saturday"
                    : ""
                }${formatDate(curDate) === formatDate(today) ? " today" : ""}${
                  formatDate(curDate) === formatDate(selectedDate)
                    ? " selected"
                    : ""
                }`}
                onClick={() => setSelectedDate(curDate)}
              >
                <p className="calendar-content-item-content">{date}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="calendar-footer">
        <button className="calendar-footer-btn">삭제</button>
        <button className="calendar-footer-btn">오늘</button>
      </div>
    </div>
  );
};

export default Calendar;
