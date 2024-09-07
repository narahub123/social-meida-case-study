import { useEffect, useState } from "react";
import { SignupInfoType } from "../../../../../types/auth.types";
import AlarmCheck from "../../../EmailSignup/components/AlarmCheck";

interface GoogleSetAlarmProps {
  signupInfo: SignupInfoType;
  setSignupInfo: React.Dispatch<React.SetStateAction<SignupInfoType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const GoogleSetAlarm = ({
  signupInfo,
  setSignupInfo,
  setStage,
}: GoogleSetAlarmProps) => {
  const [alarms, setAlarms] = useState({
    message: false,
    comment: false,
    following: false,
    newPost: false,
  });

  useEffect(() => {
    setSignupInfo((prev) => ({
      ...prev,
      alarms,
    }));
  }, [alarms]);

  return (
    <div className="google-oauth-content">
      <section className="google-oauth-content-header">
        <div className="email-signup-title">
          알림 설정을 할 목록을 선택해주세요.
        </div>
      </section>
      <section className="google-oauth-content-main">
        <AlarmCheck
          title="메시지"
          detail="새로운 메시지를 받는 경우 알림을 받습니다."
          subField="message"
          setAlarms={setAlarms}
          index={0}
        />
        <AlarmCheck
          title="댓글"
          detail="새로운 댓글이 있는 경우 알림을 받습니다."
          subField="comment"
          setAlarms={setAlarms}
          index={0}
        />
        <AlarmCheck
          title="팔로잉"
          detail="새로운 팔로잉이 있는 경우 알림을 받습니다."
          subField="following"
          setAlarms={setAlarms}
          index={0}
        />
        <AlarmCheck
          title="새 글"
          detail="팔로어 중 새 글이 있는 경우 알림을 받습니다."
          subField="newPost"
          setAlarms={setAlarms}
          index={0}
        />
      </section>
      <section className="google-oauth-content-bottom">
        <button
          className={`email-signup-button valid`}
          onClick={() => setStage("language")}
          style={{ width: "100%" }}
        >
          다음
        </button>
      </section>
    </div>
  );
};

export default GoogleSetAlarm;
