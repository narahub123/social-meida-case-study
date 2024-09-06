import { useState } from "react";
import NormalInput from "../../components/NormalInput";
import { Stage0Props } from "./Stage0";
import { UserSignupValidType } from "../../../../types/auth.types";
import { handleNext } from "../../../../utils/auth.utils";
import { LuLoader2 } from "react-icons/lu";

const Stage2 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const [focused, setFocused] = useState("");
  const [isValid, setIsValid] = useState<UserSignupValidType>({
    password: false,
  });
  const [loading, setLoading] = useState(true);

  return (
    <>
      <section className="email-signup-section">
        <div className="email-signup-title">비밀번호가 필요합니다.</div>
      </section>
      <section className="email-signup-section">
        <NormalInput
          title={"비밀번호"}
          field={"password"}
          focused={focused}
          setFocused={setFocused}
          userSignup={userSignup}
          setUserSignup={setUserSignup}
          isValid={isValid}
          setIsValid={setIsValid}
          setLoading={setLoading}
        />
      </section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button${isValid.password ? " valid" : ""}`}
          disabled={!isValid.password}
          onClick={() => handleNext("profile", setStage)}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage2;
