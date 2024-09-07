import { useState } from "react";
import "./auth.css";
import AuthButton from "./components/AuthButton";
import EmailSignup from "./EmailSignup/EmailSignup";
import Login from "./Login/Login";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase";
import GoogleOauth from "./Oauth/Google/GoogleOauth";
import { SignupInfoType } from "../../types/auth.types";

const Auth = () => {
  const [openEmailSignup, setOpenEmailSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openGoogleSignup, setOpenGoogleSignup] = useState(false);
  const [signupInfo, setSignupInfo] = useState<SignupInfoType>({
    email: "",
  });

  const handleLogin = () => {
    setOpenLogin(!openLogin);
  };
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const username = user.displayName as string;
      const email = user.email as string;
      const userPic = user.photoURL as string;
      const userId = user.uid as string;

      setSignupInfo((prev) => ({
        ...prev,
        username: username,
        email: email,
        userPic: userPic,
        userId: userId,
      }));

      // const data = await res.json();
      setOpenGoogleSignup(!openGoogleSignup);
    } catch (error) {
      console.log("Could not login with google", error);
    }
  };

  console.log(signupInfo);

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
          setOpenGoogleSignup={setOpenGoogleSignup}
        />
      )}
      <div className="auth">
        <section className="auth-signup">
          <div className="auth-signup-title">지금 가입하세요</div>
          <div className="auth-signup-btns">
            <div
              className="auth-signup-btns-wrapper"
              onClick={handleGoogleClick}
            >
              <AuthButton
                logo="/images/google-logo.webp"
                text="구글에서 가입하기"
              />
            </div>

            <AuthButton
              logo="/images/naver-logo.webp"
              text="네이버에서 가입하기"
            />
            <AuthButton
              logo="/images/kakao-logo.webp"
              text="카카오에서 가입하기"
            />

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
