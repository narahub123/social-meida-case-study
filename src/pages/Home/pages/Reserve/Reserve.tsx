import "./reserve.css";
import { LuCalendarDays, LuX } from "react-icons/lu";
import { RiCalendarScheduleLine } from "react-icons/ri";
import SelectOne from "../../components/SelectOne";
import {
  ampm,
  dateArr,
  hourArr,
  minuteArr,
  monthArr,
  yearArr,
} from "../../data/home.data";
import CalendarContainer from "../../../../components/Calendar/CalendarContainer";
import { useRef, useState } from "react";
import {
  convertDateToKoreanZone,
  convertDateToYYYYMMDD,
} from "../../../../components/Calendar/data/calendar.data";
import useClickOutside from "../../../../hooks/useClickOutside";

interface ReserveProps {
  openReserveModal: boolean;
  setOpenReserveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reserve = ({ openReserveModal, setOpenReserveModal }: ReserveProps) => {
  const calendarRef = useRef<HTMLSpanElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [openCalendar, setOpenCalendar] = useState(false);
  useClickOutside(calendarRef, setOpenCalendar);
  // 한국 시간대로 변경
  const koreanTime = convertDateToKoreanZone(selectedDate);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  console.log(selectedDate);

  return (
    <div className="reserve">
      <div className="reserve-wrapper">
        <section className="reserve-header">
          <LuX
            className="reserve-header-close icon"
            onClick={() => setOpenReserveModal(!openReserveModal)}
          />
          <span className="reserve-header-title">예약하기</span>
          <button className="reserve-header-confirm">확인</button>
        </section>
        <section className="reserve-content">
          {/* 예약 정보 */}
          <div className="reserve-content-message-container">
            <RiCalendarScheduleLine className="reserve-content-message-icon icon" />
            <p className="reserve-content-message-text">
              {selectedDate
                ? `${koreanTime}에 전송 예송`
                : "날짜 시간을 설정해주세요."}
            </p>
          </div>
          {/* 예약 날짜 */}
          <div className="reserve-content-item">
            <div className="reserve-content-item-title">날짜</div>
            <div className="reserve-content-item-container">
              <span style={{ width: "150px" }}>
                <SelectOne
                  title={"년"}
                  id={"year"}
                  unit={"년"}
                  list={yearArr}
                  text={selectedDate?.getFullYear()}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </span>
              <span style={{ width: "150px" }}>
                <SelectOne
                  title={"월"}
                  id={"month"}
                  unit={"월"}
                  list={monthArr}
                  text={selectedDate?.getMonth()}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </span>
              <span style={{ width: "150px" }}>
                <SelectOne
                  title={"일"}
                  id={"date"}
                  unit={"일"}
                  list={dateArr}
                  text={selectedDate?.getDate()}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </span>
              <span ref={calendarRef}>
                <div
                  className="reserve-content-item-wrapper"
                  onClick={() => setOpenCalendar(!openCalendar)}
                >
                  <LuCalendarDays className=" icon" />
                </div>
                {/* 달력 */}
                {openCalendar && (
                  <div className="reserve-content-calendar-wrapper">
                    <CalendarContainer
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                    />
                  </div>
                )}
              </span>
            </div>
            {selectedDate &&
              convertDateToYYYYMMDD(new Date()) >
                convertDateToYYYYMMDD(selectedDate) && (
                <p className="reverse-content-item-message">
                  예약 시간은 현재 시간보다 이전일 수 없습니다.
                </p>
              )}
          </div>
          {/* 예약 시간 */}
          <div className="reserve-content-item">
            <div className="reserve-content-item-title">날짜</div>
            <div className="reserve-content-item-container">
              <span style={{ width: "150px" }}>
                <SelectOne
                  title={"시"}
                  id={"hour"}
                  unit={"시"}
                  list={hourArr}
                  text={selectedDate?.getHours()}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </span>
              <span style={{ width: "150px" }}>
                <SelectOne
                  title={"분"}
                  id={"minute"}
                  unit={"분"}
                  list={minuteArr}
                  text={selectedDate?.getMinutes()}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </span>
              <span style={{ width: "150px" }}>
                <SelectOne
                  title={"AM/PM"}
                  id={"ampm"}
                  unit={""}
                  list={ampm}
                  text={selectedDate?.getMinutes()}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </span>
            </div>
          </div>
          {/* 시간대 */}
          <div className="reserve-content-item">{timeZone}</div>
        </section>
        <section className="reserve-footer">
          <p className="reserve-footer-text">예약 게시물</p>
        </section>
      </div>
    </div>
  );
};

export default Reserve;
