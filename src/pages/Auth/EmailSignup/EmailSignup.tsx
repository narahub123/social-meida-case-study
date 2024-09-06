import "./emailsignup.css";
import { useEffect, useState } from "react";
import { UserSignupType } from "../../../types/auth.types";
import Stage0 from "./components/Stage0";
import { LuX } from "react-icons/lu";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";
import Stage3 from "./components/Stage3";
import Stage4 from "./components/Stage4";
import Stage5 from "./components/Stage5";
import Stage6 from "./components/Stage6";
import Stage8 from "./components/Stage8";
import Stage7 from "./components/Stage7";
import { fetchIPInfo, getUserLocation } from "../../../utils/auth.utils";

interface EmailSignupProps {
  setOpenEmailSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailSignup = ({ setOpenEmailSignup }: EmailSignupProps) => {
  const [userSignup, setUserSignup] = useState<UserSignupType>({
    username: "",
    email: "",
    birth: "",
  });

  const [stage, setStage] = useState("username");

  useEffect(() => {
    // 주소
    getUserLocation(setUserSignup);
    // ip
    fetchIPInfo(setUserSignup);
  }, []);

  console.log(userSignup);

  return (
    <div className="email-signup">
      <div className="email-signup-wrapper">
        <div className="email-signup-container">
          <LuX
            className="email-signup-close icon"
            title="닫기"
            onClick={() => setOpenEmailSignup(false)}
          />
          {stage === "username" && (
            <Stage0
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === "authCode" && (
            <Stage1
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === "password" && (
            <Stage2
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === "profile" && (
            <Stage3
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === "userId" && (
            <Stage4
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === "alarm" && (
            <Stage5
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === "alarm-setup" && (
            <Stage8
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === "language" && (
            <Stage6
              userSignup={userSignup}
              setUserSignup={setUserSignup}
              setStage={setStage}
            />
          )}
          {stage === "follow" && (
            <Stage7
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
