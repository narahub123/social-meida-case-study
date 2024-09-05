import { useState } from "react";
import { handleNext } from "../../../../utils/authUtils";
import NormalInput from "../../components/NormalInput";
import { Stage0Props } from "./Stage0";
import { UserSignupValidType } from "../../../../types/authTypes";

const Stage4 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const [focused, setFocused] = useState("");
  const [isValid, setIsValid] = useState<UserSignupValidType>({
    userId: false,
  });

  return (
    <>
      <section className="email-signup-section">
        <div className="email-signup-title">사용자 아이디를 정해주세요.</div>
        <div className="email-signup-detail">
          @사용자 아이디는 고유한 나만의 아이디입니다. 나중에 언제든 바꿀 수
          있습니다.
        </div>
      </section>
      <section className="email-signup-section">
        <NormalInput
          title={"사용자 아이디"}
          field={"userId"}
          focused={focused}
          setFocused={setFocused}
          userSignup={userSignup}
          setUserSignup={setUserSignup}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      </section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button${isValid.userId ? " valid" : ""}`}
          onClick={() => handleNext("alarm", setStage)}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage4;
