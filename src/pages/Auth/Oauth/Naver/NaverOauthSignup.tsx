import "./naverOauthSignup.css";
import { useState } from "react";
import NaverAlarm from "./components/NaverAlarm";
import { LuX } from "react-icons/lu";
import NaverSetAlarms from "./components/NaverSetAlarms";
import NaverLanguage from "./components/NaverLanguage";
import { PreferencesType } from "../../../../types/settings.types";

interface NaverOauthSignupProps {
  setOpenNaverSignup: React.Dispatch<React.SetStateAction<boolean>>;
}
const NaverOauthSignup = ({ setOpenNaverSignup }: NaverOauthSignupProps) => {
  const [naverSignupInfo, setNaverSignupInfo] = useState<PreferencesType>({
    language: "Korean",
  });
  const [stage, setStage] = useState("alarm");

  console.log(stage);

  return (
    <div className="naver-oauth-signup">
      <div className="naver-oauth-signup-wrapper">
        <div className="naver-oauth-signup-container">
          <LuX className="naver-oauth-signup-close" />
          {stage === "alarm" && (
            <NaverAlarm
              setNaverSignupInfo={setNaverSignupInfo}
              setStage={setStage}
            />
          )}
          {stage === "set-alarms" && (
            <NaverSetAlarms
              setNaverSignupInfo={setNaverSignupInfo}
              setStage={setStage}
            />
          )}
          {stage === "language" && (
            <NaverLanguage
              setOpenNaverSignup={setOpenNaverSignup}
              naverSignupInfo={naverSignupInfo}
              setNaverSignupInfo={setNaverSignupInfo}
              setStage={setStage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NaverOauthSignup;
