import { useState } from "react";
import NormalInput from "../../components/NormalInput";
import { Stage0Props } from "./Stage0";
import { UserSignupValidType } from "../../../../types/auth";

interface Stage1Props extends Stage0Props {}

const Stage1 = ({ userSignup, setUserSignup, setStage }: Stage1Props) => {
  const [focused, setFocused] = useState("");
  const [isValid, setIsValid] = useState<UserSignupValidType>({
    emailAuth: false,
  });

  const handleNext = () => {
    setStage(2);
  };

  return (
    <>
      <section className="email-signup-section">
        <div className="email-signup-title">코드를 보내드렸습니다.</div>
        <div className="email-signup-depict">{` 인증을 위해 아래에 입력하세요.`}</div>
      </section>
      <section className="email-signup-section">
        <NormalInput
          title={"인증코드"}
          field={"emailAuth"}
          focused={focused}
          setFocused={setFocused}
          userSignup={userSignup}
          setUserSignup={setUserSignup}
          setIsValid={setIsValid}
        />
        <p className="email-signup-noemail">이메일을 받지 못하셨나요?</p>
      </section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button${
            isValid["emailAuth"] ? " valid" : ""
          }`}
          onClick={() => handleNext()}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage1;
