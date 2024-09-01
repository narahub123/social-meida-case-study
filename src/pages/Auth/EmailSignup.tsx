import { useEffect, useRef, useState } from "react";
import "./emailsignup.css";

import { LuChevronDown, LuX } from "react-icons/lu";
import { months, years } from "./data/auth";
import { debounce } from "../../utils/debounce";
import { UserSignupType } from "../../types/auth";
import ListInput from "./components/ListInput";

interface EmailSignupProps {
  setOpenEmailSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BirthType {
  month: number;
  date: number;
  year: number;
}

const EmailSignup = ({ setOpenEmailSignup }: EmailSignupProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const yearListRef = useRef<HTMLUListElement>(null);
  const monthListRef = useRef<HTMLUListElement>(null);
  const dateListRef = useRef<HTMLUListElement>(null);

  const [isFocused, setIsFocused] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");
  const [userSignup, setUserSignup] = useState<UserSignupType>({
    username: "",
    email: "",
    birth: "",
  });
  const [birth, setBirth] = useState<BirthType>({
    year: 0,
    month: 0,
    date: 0,
  });
  const [index, setIndex] = useState({
    year: -1,
    month: -1,
    date: -1,
  });

  // 유효성 확인
  const [isValid, setIsValid] = useState(false);

  // 유효성 경고 메시지
  const [messages, setMessages] = useState("");

  // 드롭다운 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    // 드롭다운 외부 클릭 감지
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement; // 타입 단언

      // target이 HTMLElement인지 확인
      if (target.closest(".email-signup-birth-input-wrapper") === null) {
        setOpenDropdown("");
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 클릭 이벤트 리스너 제거
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // usersignup 유효성 체크
  useEffect(() => {
    const valid =
      Object.values(userSignup).every((elem) => elem.length !== 0) &&
      messages === "";

    setIsValid(valid);
  }, [userSignup]);

  // username input을 클릭하면 input에 focus 주기
  if (isFocused === "username" && nameRef.current) {
    nameRef.current.focus();
  }
  // email input을 클릭하면 input에 focus 주기
  if (isFocused === "email" && emailRef.current) {
    emailRef.current.focus();
  }

  // 변경된 값 userSigin에 추가하기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const messages = [];
    // 유효성 체크
    if (id === "username") {
      if (value.length > 50) return;
    }
    if (id === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        messages.push(`이메일 형식이 맞지 않습니다.`);
      }
    }

    // 기존 틀을 유지하면서 새 값 갱신하기
    const newUsersignup = (prev: UserSignupType) => ({
      ...prev,
      [id]: value,
    });

    // 경고 메시지
    setMessages(messages.join(" "));
    setUserSignup(newUsersignup);
  };

  // 렌더링 줄이기
  const debouncedOnChange = debounce<typeof onChange>(onChange, 500);

  // birth 각 필드 추가하기
  const handleBirth = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    value: number
  ) => {
    e.stopPropagation();
    const { id } = e.currentTarget;

    const newBirth = {
      ...birth,
      [id]: value,
    };

    setBirth(newBirth);

    if (monthRef.current && id === "month") {
      monthRef.current.value = value + "월";
    }

    if (dateRef.current && id === "date") {
      dateRef.current.value = value + "일";
    }

    if (yearRef.current && id === "year") {
      yearRef.current.value = value + "년";
    }

    setOpenDropdown("");

    const valid = Object.values(newBirth).every((elem) => elem !== 0);

    if (valid) {
      const birthString = `${newBirth.year}${newBirth.month
        .toString()
        .padStart(2, "0")}${newBirth.date.toString().padStart(2, "0")}`;

      setUserSignup((prev) => ({
        ...prev,
        birth: birthString,
      }));
    }
  };

  const yearArray = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => 1900 + i
  ).reverse();

  const lastDate = (month: number) => {
    const today = new Date();
    const year = birth.year || today.getFullYear();
    const lastDateOfMonth = new Date(year, month, 0).getDate();
    return lastDateOfMonth;
  };

  const dates = Array.from({ length: lastDate(birth.month) }, (_, i) => i + 1);

  const handleClickBirth = (field: string) => {
    setIsFocused(field);
    setOpenDropdown(field);
    field === "year"
      ? yearRef.current?.focus()
      : field === "month"
      ? monthRef.current?.focus()
      : field === "date"
      ? dateRef.current?.focus()
      : "";
  };

  // keydown 이벤트 처리
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLLIElement>
  ) => {
    if (e.key === "Escape") {
      setOpenDropdown("");
    }

    const id = e.currentTarget.id;

    console.log(id);

    const idx = index[id as keyof typeof index];

    console.log(idx);

    let value =
      id === "year"
        ? yearArray[idx]
        : id === "month"
        ? months[idx]
        : dates[idx];
    if (e.key === "ArrowDown") {
      setIndex((prev) => ({
        ...prev,
        [id]: idx + 1,
      }));

      value =
        id === "year"
          ? yearArray[idx + 1]
          : id === "month"
          ? months[idx + 1]
          : dates[idx + 1];
    }

    if (e.key === "ArrowUp") {
      if (idx - 1 < 0) return;
      setIndex((prev) => ({
        ...prev,
        [id]: idx - 1,
      }));
      value =
        id === "year"
          ? yearArray[idx - 1]
          : id === "month"
          ? months[idx - 1]
          : dates[idx - 1];
    }

    setBirth((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "year")
      return yearRef.current ? (yearRef.current.value = value + "년") : "";

    if (id === "month")
      return monthRef.current ? (monthRef.current.value = value + "월") : "";

    if (id === "date")
      return dateRef.current ? (dateRef.current.value = value + "일") : "";
  };

  return (
    <div className="email-signup">
      <div className="email-signup-wrapper">
        <div className="email-signup-container">
          <LuX
            className="email-signup-close icon"
            title="닫기"
            onClick={() => setOpenEmailSignup(false)}
          />
          <div className="email-signup-title">계정을 생성하세요</div>
          {/* 이름 */}
          <section className="email-signup-section">
            <div
              className={`email-signup-input-container${
                isFocused === "username" ? " focused" : ""
              }`}
              onClick={() => setIsFocused("username")}
              onBlur={() => setIsFocused("")}
            >
              <div className="email-signup-input-info">
                <span
                  className={`email-signup-input-info-title${
                    isFocused === "username" || userSignup.username !== ""
                      ? " active"
                      : ""
                  }`}
                >
                  이름
                </span>
                <span
                  className={`email-signup-input-info-length${
                    isFocused === "username" ? " active" : ""
                  }`}
                >
                  {userSignup.username ? userSignup.username.length : 0}/50
                </span>
              </div>
              <input
                type="text"
                className={`email-signup-input${
                  isFocused === "username" || userSignup.username !== ""
                    ? " active"
                    : ""
                }`}
                id="username"
                ref={nameRef}
                onChange={debouncedOnChange}
              />
            </div>
          </section>
          {/* 이메일 */}
          <section className="email-signup-section">
            <div
              className={`email-signup-input-container${
                userSignup.email !== "" && messages !== ""
                  ? " warning"
                  : isFocused === "email"
                  ? " focused"
                  : ""
              }`}
              onClick={() => setIsFocused("email")}
              onBlur={() => setIsFocused("")}
            >
              <div className="email-signup-input-info">
                <span
                  className={`email-signup-input-info-title${
                    isFocused === "email" || userSignup.email !== ""
                      ? " active"
                      : ""
                  }`}
                >
                  이메일
                </span>
                <span
                  className={`email-signup-input-info-length${
                    isFocused === "email" ? " active" : ""
                  }`}
                ></span>
              </div>
              <input
                type="text"
                className={`email-signup-input${
                  isFocused === "email" || userSignup.email !== ""
                    ? " active"
                    : ""
                }`}
                id="email"
                ref={emailRef}
                onChange={debouncedOnChange}
                onFocus={() => setIsFocused("email")}
              />
            </div>
            <div className="email-signup-item-warning">
              {userSignup.email !== "" &&
                messages.split(". ").map((msg) => <p>{msg}</p>)}
            </div>
          </section>
          {/* 생년월일 */}
          <section className="email-signup-section">
            <div className="email-signup-birth-container">
              <div className="email-signup-birth-title">생년월일</div>
              <div className="email-signup-birth-selection-container">
                {/* 년 */}
                {/* <div
                  className={`email-signup-birth-input-wrapper${
                    isFocused === "year" ? " focused" : ""
                  }`}
                  onClick={() => handleClickBirth("year")}
                >
                  <div className="email-signup-birth-input-container">
                    <p className="email-signup-birth-input-title">년</p>
                    <input
                      type="text"
                      className="email-signup-birth-input"
                      id="year"
                      ref={yearRef}
                      onFocus={() => setIsFocused("year")}
                      onKeyDown={(e) => handleKeyDown(e)}
                    />
                  </div>
                  <div className="email-signup-birth-input-icon icon">
                    <LuChevronDown />
                  </div>
                  <ul
                    className={`email-signup-birth-input-list${
                      openDropdown === "year" ? " open" : ""
                    }`}
                    ref={yearListRef}
                  >
                    {yearArray.map((year, idx) => (
                      <li
                        key={idx}
                        id="year"
                        tabIndex={0}
                        className={`email-signup-birth-input-item${
                          birth.year === year
                            ? " selected"
                            : index.year === idx
                            ? " selected"
                            : ""
                        }`}
                        onClick={(e) => handleBirth(e, year)}
                        onKeyDown={(e) => handleKeyDown(e)}
                      >
                        {year + "년"}
                      </li>
                    ))}
                  </ul>
                </div> */}
                <ListInput
                  field="year"
                  unit={"년"}
                  array={years}
                  focused={isFocused}
                  setFocused={setIsFocused}
                />
                {/* 월 */}
                <ListInput
                  field="month"
                  unit={"월"}
                  array={months}
                  focused={isFocused}
                  setFocused={setIsFocused}
                />
                {/* <div
                  className={`email-signup-birth-input-wrapper${
                    isFocused === "month" ? " focused" : ""
                  }`}
                  onClick={() => handleClickBirth("month")}
                >
                  <div className="email-signup-birth-input-container">
                    <p className="email-signup-birth-input-title">월</p>
                    <input
                      type="text"
                      className="email-signup-birth-input"
                      id="month"
                      ref={monthRef}
                      onKeyDown={(e) => handleKeyDown(e)}
                    />
                  </div>
                  <div className="email-signup-birth-input-icon icon">
                    <LuChevronDown />
                  </div>
                  <ul
                    className={`email-signup-birth-input-list${
                      openDropdown === "month" ? " open" : ""
                    }`}
                    ref={monthListRef}
                  >
                    {months.map((month, idx) => (
                      <li
                        key={idx}
                        id="month"
                        className={`email-signup-birth-input-item${
                          birth.month === idx + 1 ? " selected" : ""
                        }`}
                        onClick={(e) => handleBirth(e, idx + 1)}
                        onKeyDown={(e) => handleKeyDown(e)}
                      >
                        {month + "월"}
                      </li>
                    ))}
                  </ul>
                </div> */}
                {/* 일 */}
                <ListInput
                  field="date"
                  unit={"일"}
                  array={dates}
                  focused={isFocused}
                  setFocused={setIsFocused}
                />
                {/* <div
                  className={`email-signup-birth-input-wrapper${
                    isFocused === "date" ? " focused" : ""
                  }`}
                  onClick={() => handleClickBirth("date")}
                >
                  <div className="email-signup-birth-input-container">
                    <p className="email-signup-birth-input-title">일</p>
                    <input
                      type="text"
                      className="email-signup-birth-input"
                      id="date"
                      ref={dateRef}
                      onKeyDown={(e) => handleKeyDown(e)}
                    />
                  </div>
                  <div className="email-signup-birth-input-icon icon">
                    <LuChevronDown />
                  </div>
                  <ul
                    className={`email-signup-birth-input-list${
                      openDropdown === "date" ? " open" : ""
                    }`}
                    ref={dateListRef}
                  >
                    {datesArray.map((date, idx) => (
                      <li
                        key={idx}
                        id="date"
                        className={`email-signup-birth-input-item${
                          birth.date === idx + 1 ? " selected" : ""
                        }`}
                        onClick={(e) => handleBirth(e, idx + 1)}
                        onKeyDown={(e) => handleKeyDown(e)}
                      >
                        {date + "일"}
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>
          </section>
          {/* 다음 버튼 */}
          <section className="email-signup-section">
            <button className={`email-signup-button${isValid ? " valid" : ""}`}>
              다음
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmailSignup;
