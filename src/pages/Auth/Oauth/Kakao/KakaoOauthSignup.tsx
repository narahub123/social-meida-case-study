import { LuX } from "react-icons/lu";
import "./kakaoOauthSignup.css";
import { useState } from "react";
import KakaoUsername from "./components/KakaoUsername";

const KakaoOauthSignup = () => {
  const [stage, setStage] = useState("username");
  return (
    <div className="kakao-oauth-signup">
      <div className="kakao-oauth-signup-wrapper">
        <div className="kakao-oauth-signup-container">
          <LuX className="kakao-oauth-signup-close" />
          {stage === "username" && <KakaoUsername />}
        </div>
      </div>
    </div>
  );
};

export default KakaoOauthSignup;
