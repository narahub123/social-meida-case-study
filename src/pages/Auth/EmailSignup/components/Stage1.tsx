import "./stage1.css";
import { useState } from "react";
import NormalInput from "../../components/NormalInput";
import { Stage0Props } from "./Stage0";
import { UserSignupValidType } from "../../../../types/authTypes";
import { LuLoader2 } from "react-icons/lu";

interface Stage1Props extends Stage0Props {}

const Stage1 = ({ userSignup, setUserSignup, setStage }: Stage1Props) => {
  const [focused, setFocused] = useState("");
  const [isValid, setIsValid] = useState<UserSignupValidType>({
    emailAuth: false,
  });
  const [loading, setLoading] = useState(false);

  const handleResendAuthCode = () => {};
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
          isValid={isValid}
          setIsValid={setIsValid}
          setLoading={setLoading}
        />
        <p className="email-signup-resend" onClick={handleResendAuthCode}>
          이메일을 받지 못하셨나요?
        </p>
      </section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button valid${loading ? " loading" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <LuLoader2
              className={`email-signup-button-spinner${
                loading ? " loading" : ""
              }`}
            />
          ) : (
            "인증 코드 확인"
          )}
        </button>
      </section>
    </>
  );
};

export default Stage1;
