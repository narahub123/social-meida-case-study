import "./stage8.css";
import { handleNext } from "../../../../utils/authUtils";
import { Stage0Props } from "./Stage0";
import AlarmCheck from "./AlarmCheck";
import { useEffect, useState } from "react";

const Stage8 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const [alarms, setAlarms] = useState({
    message: false,
    comment: false,
    following: false,
    newPost: false,
  });

  useEffect(() => {
    setUserSignup((prev) => ({
      ...prev,
      alarms,
    }));
  }, [alarms]);

  return (
    <>
      <section className="email-signup-section">
        <div className="email-signup-title">
          알림 설정을 할 목록을 선택해주세요.
        </div>
      </section>
      <section className="email-signup-section">
        <div className="email-signup-check-list">
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
        </div>
      </section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button valid`}
          onClick={() => handleNext("language", setStage)}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage8;
