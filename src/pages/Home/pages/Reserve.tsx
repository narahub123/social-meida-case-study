import { LuCalendar, LuCalendarDays, LuChevronDown, LuX } from "react-icons/lu";
import "./reserve.css";
import { RiCalendarScheduleLine } from "react-icons/ri";
import SelectOne from "../components/SelectOne";
import { dateArr, monthArr, yearArr } from "../data/home.data";
import Calendar from "../../../components/Calendar/Calendar";

const Reserve = () => {
  return (
    <div className="reserve">
      <div className="reserve-wrapper">
        <section className="reserve-header">
          <LuX className="reserve-header-close icon" />
          <span className="reserve-header-title">예약하기</span>
          <button className="reserve-header-confirm">확인</button>
        </section>
        <section className="reserve-content">
          <div className="reserve-content-message-container">
            <RiCalendarScheduleLine className="reserve-content-message-icon icon" />
            <p className="reserve-content-message-text">
              2024년 9월 18일(수) 오후 4:47에 전송 예송
            </p>
          </div>
          <div className="reserve-content-item">
            <div className="reserve-content-item-title">날짜</div>
            <div className="reserve-content-item-container">
              <span style={{ width: "150px" }}>
                <SelectOne
                  title={"년"}
                  id={"year"}
                  unit={"년"}
                  list={yearArr}
                />
              </span>
              <span style={{ width: "150px" }}>
                <SelectOne
                  title={"월"}
                  id={"year"}
                  unit={"월"}
                  list={monthArr}
                />
              </span>
              <span style={{ width: "150px" }}>
                <SelectOne
                  title={"일"}
                  id={"year"}
                  unit={"일"}
                  list={dateArr}
                />
              </span>

              <span>
                <div className="reserve-content-item-wrapper">
                  <LuCalendarDays className=" icon" />
                  <div className="reserve-content-calendar-wrapper">
                    <Calendar />
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className="reserve-content-item">시간</div>
          <div className="reserve-content-item">시간대</div>
        </section>
        <section className="reserve-footer">
          <p className="reserve-footer-text">예약 게시물</p>
        </section>
      </div>
    </div>
  );
};

export default Reserve;
