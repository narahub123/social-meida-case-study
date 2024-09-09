import { useEffect, useRef, useState } from "react";
import AuthButton from "../../components/AuthButton";
import AuthDivider from "../../components/AuthDivider";
import LoginNormalInput from "../components/LoginNormalInput";
import { LoginProps } from "../Login";
import { LoginInfoType } from "../../../../types/auth.types";
import { googleLoginAPI } from "../../../../apis/auth.apis";

interface LoginListProps extends LoginProps {
  loginInfo: LoginInfoType;
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfoType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const LoginList = ({
  setOpenLogin,
  loginInfo,
  setLoginInfo,
  setStage,
}: LoginListProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  let state = `${loginInfo.ip}_${loginInfo.location}`;

  // input 필드를 감싸는 div 이외의 부분을 클릭하면 focus가 풀림
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (divRef.current && !divRef.current.contains(target)) {
        setFocused(false);
      }

      // input을 감싸는 div를 클릭하면 input에 focus가 주어짐
      if (divRef.current && divRef.current.contains(target)) {
        setFocused(true);

        if (inputRef.current) {
          // transition 때문에 focus가 풀리는 문제로
          // setTimeout을 주어서 focus 주는 시간 지연
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const abled =
    (loginInfo[`userId`] && loginInfo[`userId`] !== "") ||
    (loginInfo[`email`] && loginInfo[`email`] !== "");

  const handleNext = (
    value: string,
    abled: boolean,
    setStage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!abled) return;

    setStage(value);
  };

  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_LOGIN_REDIRECT_URI;
    state += "_google";

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile&state=${state}`;
  };

  const handleNaverLogin = () => {
    const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_LOGIN_REDIRECT_URI;
    state += "_naver";

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${state}`;
  };

  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URL;
    state += "_kakao";

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&state=${state}`;
  };

  return (
    <div className="login-main">
      <section className="login-main-header">
        <div className="login-main-header-logo">PlayGround</div>
        <div className="login-main-header-title">PlayGround에 가입하세요</div>
      </section>
      <section className="login-main-content">
        <div className="login-main-wrapper" onClick={() => handleGoogleLogin()}>
          <AuthButton logo="/images/google-logo.webp" text="구글 로그인" />
        </div>
        <div className="login-main-wrapper" onClick={() => handleNaverLogin()}>
          <AuthButton logo="/images/naver-logo.webp" text="네이버 로그인" />
        </div>
        <div className="login-main-wrapper" onClick={() => handleKakaoLogin()}>
          <AuthButton logo="/images/kakao-logo.webp" text="카카오 로그인" />
        </div>
        <AuthDivider text="또는" />
        <LoginNormalInput
          title="사용자 아이디 혹은 이메일 주소"
          field="mixed"
          focused={focused}
          divRef={divRef}
          inputRef={inputRef}
          loginInfo={loginInfo}
          setLoginInfo={setLoginInfo}
        />
        <div
          className="login-main-wrapper"
          onClick={
            abled ? () => handleNext("normalLogin", abled, setStage) : undefined
          }
        >
          <AuthButton logo="" text="다음" disabled={!abled} />
        </div>
        <AuthButton logo="" text="비밀번호를 잊으셨나요?" />
      </section>
      <section className="login-main-bottom">
        계정이 없으신가요?
        <span
          className="login-main-bottom-link"
          onClick={() => setOpenLogin(false)}
        >
          가입하기
        </span>
      </section>
    </div>
  );
};

export default LoginList;
