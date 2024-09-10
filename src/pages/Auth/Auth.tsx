import { useEffect, useState } from "react";
import "./auth.css";
import AuthButton from "./components/AuthButton";
import EmailSignup from "./EmailSignup/EmailSignup";
import Login from "./Login/Login";
import GoogleOauth from "./Oauth/Google/GoogleOauth";
import { SignupInfoType } from "../../types/auth.types";
import {
  fetchIPInfo,
  getUserLocation,
  handleGoogleClick,
} from "../../utils/auth.utils";
import { useParams, useSearchParams } from "react-router-dom";
import NaverOauthSignup from "./Oauth/Naver/NaverOauthSignup";
import KakaoOauthSignup from "./Oauth/Kakao/KakaoOauthSignup";

const Auth = () => {
  const [params] = useSearchParams();
  const [openEmailSignup, setOpenEmailSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openGoogleSignup, setOpenGoogleSignup] = useState(false);
  const [openNaverSignup, setOpenNaverSignup] = useState(false);
  const [openKakaoSignup, setOpenKakaoSignup] = useState(false);
  const [signupInfo, setSignupInfo] = useState<SignupInfoType>({
    email: "",
  });
  const [duplicate, setDuplicate] = useState("");
  const [searchParams] = useSearchParams();

  // 네이버 로그인
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const naver_state = `${signupInfo.ip}_${signupInfo.location}`;
  const naver_redirect_url = `${baseUrl}/auth/naver/callback`;
  const naver_api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
    import.meta.env.VITE_NAVER_CLIENT_ID
  }&redirect_uri=${naver_redirect_url}&state=${naver_state}`;

  // 카카오 로그인
  const REST_API_KEY: string = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI: string = (import.meta.env.VITE_KAKAO_REDIRECT_URL =
    "http://localhost:8080/auth/kakao/callback");
  const KAKAO_API_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image, account_email`;

  // 주소 ip 알아내기
  useEffect(() => {
    // 주소
    getUserLocation(setSignupInfo);
    // ip
    fetchIPInfo(setSignupInfo);
  }, []);

  // 네이버 모달창 띄우기
  useEffect(() => {
    const naver = searchParams.get("naver");
    const kakao = searchParams.get("kakao");

    console.log(kakao);

    if (!naver && !kakao) return;

    if (naver === "success") {
      setOpenNaverSignup(true);
    } else if (kakao === "success") {
      const username = searchParams.get("username") as string;
      const userPic = searchParams.get("userPic") as string;
      const email = searchParams.get("email") as string;

      setSignupInfo((prev) => ({
        ...prev,
        username,
        userPic,
        email,
      }));

      setOpenKakaoSignup(true);
    }
  }, []);

  // 에러 메시지 존재 확인하기
  useEffect(() => {
    const error = params.get("error");
    if (!error) return;

    // 전달 받은 에러를 화면에 표시해야 함
    console.log(error);
  }, []);

  const handleLogin = () => {
    setOpenLogin(!openLogin);
  };

  const handleNaverSignup = () => {
    window.location.href = naver_api_url;
  };

  const handleKakaoSignup = () => {
    window.location.href = KAKAO_API_URL;
  };

  return (
    <>
      {openEmailSignup && (
        <EmailSignup setOpenEmailSignup={setOpenEmailSignup} />
      )}
      {openLogin && <Login setOpenLogin={setOpenLogin} />}
      {openGoogleSignup && (
        <GoogleOauth
          signupInfo={signupInfo}
          setSignupInfo={setSignupInfo}
          openGoogleSignup={openGoogleSignup}
          setOpenGoogleSignup={setOpenGoogleSignup}
          duplicate={duplicate}
          setDuplicate={setDuplicate}
          setOpenLogin={setOpenLogin}
        />
      )}
      {openNaverSignup && (
        <NaverOauthSignup setOpenNaverSignup={setOpenNaverSignup} />
      )}
      {openKakaoSignup && <KakaoOauthSignup />}
      <div className="auth">
        <section className="auth-signup">
          <div className="auth-signup-title">지금 가입하세요</div>
          <div className="auth-signup-btns">
            <div
              className="auth-signup-btns-wrapper"
              onClick={() =>
                handleGoogleClick(
                  setSignupInfo,
                  setDuplicate,
                  setOpenGoogleSignup,
                  setOpenLogin
                )
              }
            >
              <AuthButton
                logo="/images/google-logo.webp"
                text="구글에서 가입하기"
              />
            </div>
            <div
              className="auth-signup-btns-wrapper"
              onClick={() => handleNaverSignup()}
            >
              <AuthButton
                logo="/images/naver-logo.webp"
                text="네이버에서 가입하기"
              />
            </div>
            <div
              className="auth-signup-btns-wrapper"
              onClick={() => handleKakaoSignup()}
            >
              <AuthButton
                logo="/images/kakao-logo.webp"
                text="카카오에서 가입하기"
              />
            </div>

            <div className="auth-signup-divider">
              <p className="auth-signup-divider-line"></p>
              <span>또는</span>
              <p className="auth-signup-divider-line"></p>
            </div>

            <div
              className="auth-signup-wrapper"
              onClick={() => setOpenEmailSignup(!openEmailSignup)}
            >
              <AuthButton logo="" text="계정 만들기" />
            </div>
          </div>
        </section>
        <section className="auth-login">
          <div className="auth-login-title">이미 가입하셨나요?</div>
          <div className="auth-login-btn" onClick={handleLogin}>
            <AuthButton logo="" text="로그인" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Auth;
