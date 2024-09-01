import "./emailsignup.css";
import { useState } from "react";
import { UserSignupType } from "../../../types/auth";
import Stage0 from "./components/Stage0";
import { LuX } from "react-icons/lu";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";
import Stage3 from "./components/Stage3";

interface EmailSignupProps {
  setOpenEmailSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailSignup = ({ setOpenEmailSignup }: EmailSignupProps) => {
  const [userSignup, setUserSignup] = useState<UserSignupType>({
    username: "",
    email: "",
    birth: "",
    emailAuth: "",
    password: "",
  });

  const [stage, setStage] = useState(3);

  return (
    <div className="email-signup">
      <div className="email-signup-wrapper">
        <div className="email-signup-container">
          <LuX
            className="email-signup-close icon"
            title="닫기"
            onClick={() => setOpenEmailSignup(false)}
          />
          {stage === 0 && (
            <Stage0
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === 1 && (
            <Stage1
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === 2 && (
            <Stage2
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === 3 && (
            <Stage3
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSignup;
