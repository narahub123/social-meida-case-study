import { useState } from "react";
import { handleNext } from "../../../../utils/auth";
import { Stage0Props } from "./Stage0";
import { UserSignupValidType } from "../../../../types/auth";

const Stage7 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const [isValid, setIsValid] = useState<UserSignupValidType>({
    following: false,
  });
  return (
    <>
      <section className="email-signup-section">
        <div className="email-signup-title">
          1개 이상의 계정을 팔로우해 보세요.
        </div>
      </section>
      <section className="email-signup-section">{/* 계정 배열 */}</section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button${isValid.following ? " valid" : ""}`}
          onClick={() => handleNext(8, setStage)}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage7;
