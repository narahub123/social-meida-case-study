import { useState } from "react";
import { integrateSocialAPI } from "../../../../../apis/auth.apis";
import { SignupInfoType } from "../../../../../types/auth.types";
import AuthButton from "../../../components/AuthButton";
import { handleGoogleClick } from "../../../../../utils/auth.utils";

interface GoogleDuplicateProps {
  signupInfo: SignupInfoType;
  setSignupInfo: React.Dispatch<React.SetStateAction<SignupInfoType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  setDuplicate: React.Dispatch<React.SetStateAction<string>>;
  openGoogleSignup: boolean;
  setOpenGoogleSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleDuplicate = ({
  signupInfo,
  setSignupInfo,
  setStage,
  setDuplicate,
  openGoogleSignup,
  setOpenGoogleSignup,
  setOpenLogin,
}: GoogleDuplicateProps) => {
  const [loading, setLoading] = useState(false);

  const integrateSocial = async () => {
    const email = signupInfo.email as string;

    setLoading(true);
    await integrateSocialAPI(email, "google")
      .then((res) => {
        console.log(res);
        if (res.success === "ok") {
          setOpenGoogleSignup(false);
          setOpenLogin(true);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "이미 등록된 계정입니다.") {
          setOpenGoogleSignup(false);
          setOpenLogin(true);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="google-oauth-content">
      <section className="google-oauth-content-header">
        <div className="google-oauth-content-header-title">
          이미 존재하는 이메일입니다.
        </div>
        <div className="google-oauth-content-header-detail">
          이메일 계정과 통합하시겠습니까?
        </div>
      </section>
      <section className="google-oauth-content-main">
        <div
          className="google-oauth-btn-wrapper"
          onClick={() => integrateSocial()}
        >
          <AuthButton
            logo=""
            text="계정 통합하기"
            width="100%"
            loading={loading}
          />
        </div>
        <div
          className="google-oauth-btn-wrapper"
          onClick={() =>
            handleGoogleClick(
              setSignupInfo,
              setDuplicate,
              setOpenGoogleSignup,
              openGoogleSignup
            )
          }
        >
          <AuthButton
            logo=""
            text="다른 구글 계정 사용하기"
            width="100%"
            loading={loading}
          />
        </div>
      </section>
      <section className="google-oauth-content-bottom"></section>
    </div>
  );
};

export default GoogleDuplicate;
