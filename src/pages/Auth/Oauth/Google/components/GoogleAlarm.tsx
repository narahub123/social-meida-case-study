import { LuBell } from "react-icons/lu";
import { SignupInfoType } from "../../../../../types/auth.types";

interface GoogleAlarmProps {
  signupInfo: SignupInfoType;
  setSignupInfo: React.Dispatch<React.SetStateAction<SignupInfoType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const GoogleAlarm = ({
  signupInfo,
  setSignupInfo,
  setStage,
}: GoogleAlarmProps) => {
  return (
    <div className="google-oauth-content">
      <section className="google-oauth-content-header">
        <LuBell className="email-signup-header-icon" />
        <div className="email-signup-title">알림 켜기</div>
        <div className="email-signup-detail">
          지금 일어나는 일에 대한 소식을 받고 PG를 최대한 활용해 보세요.
        </div>
      </section>
      <section className="google-oauth-content-main">
        <button
          className={`email-signup-button alarm`}
          onClick={() => setStage("set-alarm")} // 알람 설정
        >
          알림 허용
        </button>
        <button
          className={`email-signup-button valid`}
          onClick={() => setStage("language")}
        >
          지금은 넘어가기
        </button>
      </section>
      <section className="google-oauth-content-bottom">밑</section>
    </div>
  );
};

export default GoogleAlarm;
