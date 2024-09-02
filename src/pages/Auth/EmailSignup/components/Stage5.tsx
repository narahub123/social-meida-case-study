import "./stage5.css";
import { LuBell } from "react-icons/lu";
import { Stage0Props } from "./Stage0";
import { handleNext } from "../../../../utils/auth";
import { useState } from "react";
import { UserSignupValidType } from "../../../../types/auth";

const Stage5 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const [isValid, setIsValid] = useState<UserSignupValidType>({
    alarm: false,
  });
  return (
    <>
      <section className="email-signup-section">
        <LuBell className="email-signup-header-icon" />
      </section>
      <section className="email-signup-section">
        <div className="email-signup-title">알림 켜기</div>
        <div className="email-signup-detail">
          지금 일어나는 일에 대한 소식을 받고 x를 최대한 활용해 보세요.
        </div>
      </section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button`}
          //   onClick={() => handleNext(6, setStage)} // 알람 설정
        >
          알림 허용
        </button>
      </section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button${isValid.alarm ? " valid" : ""}`}
          onClick={() => handleNext(6, setStage)}
        >
          {isValid ? "다음" : "지금은 넘어가기"}
        </button>
      </section>
    </>
  );
};

export default Stage5;
