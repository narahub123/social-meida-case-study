import { useEffect, useState } from "react";
import ListInput from "../../components/ListInput";
import NormalInput from "../../components/NormalInput";
import { dates, months, years } from "../../data/authData";
import {
  BirthType,
  UserSignupType,
  UserSignupValidType,
} from "../../../../types/authTypes";
import { handleNext } from "../../../../utils/authUtils";
import GenderInput from "./GenderInput";

export interface Stage0Props {
  userSignup: UserSignupType;
  setUserSignup: React.Dispatch<React.SetStateAction<UserSignupType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const Stage0 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const [isFocused, setIsFocused] = useState("");
  // 유효성 확인
  const [isValid, setIsValid] = useState<UserSignupValidType>({
    username: false,
    email: false,
    birth: false,
  });

  const [birth, setBirth] = useState<BirthType>({
    year: 0,
    month: 0,
    date: 0,
  });

  // usersignup 유효성 체크
  const validation = Object.values(isValid).every((elem) => elem === true);

  // birth 내용 조합해서 userSignup에 추가하기
  useEffect(() => {
    if (Object.values(birth).every((elem) => elem !== 0)) {
      const year = birth.year;
      const month = birth.month.toString().padStart(2, "0");
      const date = birth.date.toString().padStart(2, "0");

      const birthString = `${year}${month}${date}`;

      setUserSignup((prev) => ({
        ...prev,
        birth: birthString,
      }));

      setIsValid((prev) => ({
        ...prev,
        birth: true,
      }));
    }
  }, [birth]);

  console.log(validation);
  console.log(isValid);

  return (
    <>
      {/* 제목 */}
      <section className="email-signup-section">
        <div className="email-signup-title">계정을 생성하세요</div>
      </section>
      {/* 이름 */}
      <section className="email-signup-section">
        <NormalInput
          title={"이름"}
          field={"username"}
          limitOfLetters={50}
          focused={isFocused}
          setFocused={setIsFocused}
          userSignup={userSignup}
          setUserSignup={setUserSignup}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      </section>
      <section className="email-signup-section">
        <GenderInput
          title="성별"
          field="gender"
          focused={isFocused}
          setFocused={setIsFocused}
          userSignup={userSignup}
          setUserSignup={setUserSignup}
        />
      </section>
      {/* 이메일 */}
      <section className="email-signup-section">
        <NormalInput
          title={"이메일"}
          field={"email"}
          focused={isFocused}
          setFocused={setIsFocused}
          userSignup={userSignup}
          setUserSignup={setUserSignup}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      </section>
      {/* 생년월일 */}
      <section className="email-signup-section">
        <div className="email-signup-birth-title">생년월일</div>
        <div className="email-signup-birth-selection-container">
          {/* 년 */}
          <ListInput
            field="year"
            unit={"년"}
            array={years}
            focused={isFocused}
            birth={birth}
            setFocused={setIsFocused}
            setBirth={setBirth}
          />
          {/* 월 */}
          <ListInput
            field="month"
            unit={"월"}
            array={months}
            focused={isFocused}
            birth={birth}
            setFocused={setIsFocused}
            setBirth={setBirth}
          />
          {/* 일 */}
          <ListInput
            field="date"
            unit={"일"}
            array={dates(birth.month, birth.year)}
            focused={isFocused}
            birth={birth}
            setFocused={setIsFocused}
            setBirth={setBirth}
          />
        </div>
      </section>
      {/* 다음 버튼 */}
      <section className="email-signup-section">
        <button
          className={`email-signup-button${validation ? " valid" : ""}`}
          onClick={() => handleNext("password", setStage)}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage0;
