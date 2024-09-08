import { useEffect } from "react";
import { PreferencesType } from "../../../../../types/settings.types";
import AuthButton from "../../../components/AuthButton";
import { useSearchParams } from "react-router-dom";

interface NaverAlarmProps {
  setNaverSignupInfo: React.Dispatch<React.SetStateAction<PreferencesType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const NaverAlarm = ({ setNaverSignupInfo, setStage }: NaverAlarmProps) => {
  const [searchParams] = useSearchParams();

  // 이메일 정보 저장
  useEffect(() => {
    const userId = searchParams.get("userId");
    if (!userId) return;

    setNaverSignupInfo((prev) => ({
      ...prev,
      userId,
    }));
  }, []);

  const handleNext = (stage: string) => {
    setNaverSignupInfo((prev) => ({
      ...prev,
      alarms: {
        message: false,
        comment: false,
        following: false,
        newPost: false,
      },
    }));

    setStage(stage);
  };
  return (
    <div className="naver-oauth-signup-main">
      <section className="naver-oauth-signup-main-header">
        <div className="naver-oauth-signup-main-header-title">알림 켜기</div>
      </section>
      <section className="naver-oauth-signup-main-content">
        <div className="naver-oauth-signup-main-content-item">
          <div
            className="naver-oauth-signup-main-content-wrapper"
            onClick={() => setStage("set-alarms")}
          >
            <AuthButton logo="" text="알림 설정하기" width="100%" />
          </div>
          <div
            className="naver-oauth-signup-main-content-wrapper"
            onClick={() => handleNext("language")}
          >
            <AuthButton logo="" text="건너뛰기" width="100%" />
          </div>
        </div>
      </section>
      <section className="naver-oauth-signup-main-bottom"></section>
    </div>
  );
};

export default NaverAlarm;
