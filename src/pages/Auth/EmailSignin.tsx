import { useRef, useState } from "react";
import "./emailSignin.css";
import { UserSigninType } from "../../types/auth";
import { LuChevronDown } from "react-icons/lu";
import { months } from "./data/auth";

const EmailSignin = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState("");
  const [userSignin, setUserSignin] = useState<UserSigninType>({
    username: "",
    email: "",
  });
  const [birth, setBirth] = useState<{
    month: number;
    date: number;
    year: number;
  }>({
    month: 0,
    date: 0,
    year: 0,
  });

  if (isFocused === "username" && nameRef.current) {
    nameRef.current.focus();
  }
  if (isFocused === "email" && emailRef.current) {
    emailRef.current.focus();
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const newUserSignin = {
      [id]: value,
    };

    setUserSignin(newUserSignin);
  };

  const handleBirth = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    value: number
  ) => {
    e.stopPropagation();
    const { id } = e.currentTarget;

    if (value) {
      setBirth((prev) => ({
        ...prev,
        [id]: value, // '1월', '2월' 형식에서 '월'을 제거
      }));
    }

    setIsFocused("");
    if (monthRef.current && id === "month") {
      monthRef.current.value = value + "월";
    }

    if (dateRef.current && id === "date") {
      dateRef.current.value = value + "일";
    }

    if (yearRef.current && id === "year") {
      yearRef.current.value = value + "년";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setBirth((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const yearArray = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => 1900 + i
  );

  const lastDate = (month: number) => {
    const today = new Date();
    const year = birth.year || today.getFullYear();
    const lastDateOfMonth = new Date(year, month, 0).getDate();
    return lastDateOfMonth;
  };

  const datesArray = Array.from(
    { length: lastDate(birth.month) },
    (_, i) => i + 1
  );

  return (
    <div className="email-signin">
      <div className="email-signin-wrapper">
        <div className="email-signin-container">
          <div className="email-signin-title">계정을 생성하세요</div>
          {/* 이름 */}
          <div
            className={`email-signin-input-container${
              isFocused === "username" ? " focused" : ""
            }`}
            onClick={() => setIsFocused("username")}
            onBlur={() => setIsFocused("")}
          >
            <div className="email-signin-input-info">
              <span
                className={`email-signin-input-info-title${
                  isFocused === "username" || userSignin.username !== ""
                    ? " active"
                    : ""
                }`}
              >
                이름
              </span>
              <span
                className={`email-signin-input-info-length${
                  isFocused === "username" ? " active" : ""
                }`}
              >
                {userSignin.username ? userSignin.username.length : 0}/50
              </span>
            </div>
            <input
              type="text"
              className={`email-signin-input${
                isFocused === "username" || userSignin.username !== ""
                  ? " active"
                  : ""
              }`}
              id="username"
              ref={nameRef}
              onChange={(e) => onChange(e)}
            />
          </div>
          {/* 이메일 */}
          <div
            className={`email-signin-input-container${
              isFocused === "email" ? " focused" : ""
            }`}
            onClick={() => setIsFocused("email")}
            onBlur={() => setIsFocused("")}
          >
            <div className="email-signin-input-info">
              <span
                className={`email-signin-input-info-title${
                  isFocused === "email" || userSignin.email ? " active" : ""
                }`}
              >
                이메일
              </span>
              <span
                className={`email-signin-input-info-length${
                  isFocused === "email" ? " active" : ""
                }`}
              ></span>
            </div>
            <input
              type="text"
              className={`email-signin-input${
                isFocused === "email" || userSignin.email !== ""
                  ? " active"
                  : ""
              }`}
              id="email"
              ref={emailRef}
              onChange={(e) => onChange(e)}
            />
          </div>
          {/* 생년월일 */}
          <div className="email-signin-birth-container">
            <div className="email-signin-birth-title">생년월일</div>
            <div className="email-signin-birth-selection-container">
              {/* 년 */}
              <div
                className={`email-signin-birth-input-wrapper${
                  isFocused === "year" ? " focused" : ""
                }`}
                onClick={() => setIsFocused("year")}
              >
                <div className="email-signin-birth-input-container">
                  <p className="email-signin-birth-input-title">년</p>
                  <input
                    type="text"
                    className="email-signin-birth-input"
                    id="year"
                    onChange={(e) => handleChange(e)}
                    ref={yearRef}
                  />
                </div>
                <div className="email-signin-birth-input-icon icon">
                  <LuChevronDown />
                </div>
                <ul
                  className={`email-signin-birth-input-list${
                    isFocused === "year" ? " focused" : ""
                  }`}
                >
                  {yearArray.map((year, idx) => (
                    <li
                      key={idx}
                      id="year"
                      className={`email-signin-birth-input-item${
                        birth.year === idx + 1 ? " selected" : ""
                      }`}
                      onClick={(e) => handleBirth(e, year)}
                    >
                      {year + "년"}
                    </li>
                  ))}
                </ul>
              </div>
              {/* 월 */}
              <div
                className={`email-signin-birth-input-wrapper${
                  isFocused === "month" ? " focused" : ""
                }`}
                onClick={() => setIsFocused("month")}
              >
                <div className="email-signin-birth-input-container">
                  <p className="email-signin-birth-input-title">월</p>
                  <input
                    type="text"
                    className="email-signin-birth-input"
                    id="month"
                    onChange={(e) => handleChange(e)}
                    ref={monthRef}
                  />
                </div>
                <div className="email-signin-birth-input-icon icon">
                  <LuChevronDown />
                </div>
                <ul
                  className={`email-signin-birth-input-list${
                    isFocused === "month" ? " focused" : ""
                  }`}
                >
                  {months.map((month, idx) => (
                    <li
                      key={idx}
                      id="month"
                      className={`email-signin-birth-input-item${
                        birth.month === idx + 1 ? " selected" : ""
                      }`}
                      onClick={(e) => handleBirth(e, idx + 1)}
                    >
                      {month + "월"}
                    </li>
                  ))}
                </ul>
              </div>
              {/* 일 */}
              <div
                className={`email-signin-birth-input-wrapper${
                  isFocused === "date" ? " focused" : ""
                }`}
                onClick={() => setIsFocused("date")}
              >
                <div className="email-signin-birth-input-container">
                  <p className="email-signin-birth-input-title">일</p>
                  <input
                    type="text"
                    className="email-signin-birth-input"
                    id="date"
                    onChange={(e) => handleChange(e)}
                    ref={dateRef}
                  />
                </div>
                <div className="email-signin-birth-input-icon icon">
                  <LuChevronDown />
                </div>
                <ul
                  className={`email-signin-birth-input-list${
                    isFocused === "date" ? " focused" : ""
                  }`}
                >
                  {datesArray.map((date, idx) => (
                    <li
                      key={idx}
                      id="date"
                      className={`email-signin-birth-input-item${
                        birth.date === idx + 1 ? " selected" : ""
                      }`}
                      onClick={(e) => handleBirth(e, idx + 1)}
                    >
                      {date + "일"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <button className="email-signin-button">다음</button>
        </div>
      </div>
    </div>
  );
};

export default EmailSignin;
