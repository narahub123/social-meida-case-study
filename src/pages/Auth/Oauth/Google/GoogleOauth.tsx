import "./googleOauth.css";
import { LuX } from "react-icons/lu";
import { SignupInfoType } from "../../../../types/auth.types";
import { useEffect, useState } from "react";
import GoogleUserId from "./components/GoogleUserId";
import GoogleAlarm from "./components/GoogleAlarm";
import GoogleSetAlarm from "./components/GoogleSetAlarm";
import GoogleLanguage from "./components/GoogleLanguage";
import { fetchIPInfo, getUserLocation } from "../../../../utils/auth.utils";
import GoogleDuplicate from "./components/GoogleDuplicate";

interface GoogleOauthProps {
  signupInfo: SignupInfoType;
  setSignupInfo: React.Dispatch<React.SetStateAction<SignupInfoType>>;
  openGoogleSignup: boolean;
  setOpenGoogleSignup: React.Dispatch<React.SetStateAction<boolean>>;
  duplicate: string;
  setDuplicate: React.Dispatch<React.SetStateAction<string>>;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleOauth = ({
  signupInfo,
  setSignupInfo,
  openGoogleSignup,
  setOpenGoogleSignup,
  duplicate,
  setDuplicate,
  setOpenLogin,
}: GoogleOauthProps) => {
  const [stage, setStage] = useState("userId");
  useEffect(() => {
    // 주소
    getUserLocation(setSignupInfo);
    // ip
    fetchIPInfo(setSignupInfo);
  }, []);

  if (stage === "login") {
    setOpenGoogleSignup(false);
  }

  return (
    <div className="google-oauth">
      <div className="google-oauth-wrapper">
        <div className="google-oauth-container">
          <LuX
            className="google-oauth-close"
            onClick={() => setOpenGoogleSignup(false)}
          />
          {duplicate === "duplicate" && (
            <GoogleDuplicate
              signupInfo={signupInfo}
              setSignupInfo={setSignupInfo}
              setStage={setStage}
              setDuplicate={setDuplicate}
              openGoogleSignup={openGoogleSignup}
              setOpenGoogleSignup={setOpenGoogleSignup}
              setOpenLogin={setOpenLogin}
            />
          )}
          {!duplicate && stage === "userId" && (
            <GoogleUserId
              signupInfo={signupInfo}
              setSignupInfo={setSignupInfo}
              setStage={setStage}
            />
          )}
          {stage === "alarm" && (
            <GoogleAlarm
              signupInfo={signupInfo}
              setSignupInfo={setSignupInfo}
              setStage={setStage}
            />
          )}
          {stage === "set-alarm" && (
            <GoogleSetAlarm
              signupInfo={signupInfo}
              setSignupInfo={setSignupInfo}
              setStage={setStage}
            />
          )}
          {stage === "language" && (
            <GoogleLanguage
              signupInfo={signupInfo}
              setSignupInfo={setSignupInfo}
              setStage={setStage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleOauth;
