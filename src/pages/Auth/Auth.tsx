import "./auth.css";
import AuthButton from "./components/AuthButton";

const Auth = () => {
  return (
    <div className="auth">
      <section className="auth-signin">
        <div className="auth-signin-title">지금 가입하세요</div>
        <div className="auth-signin-btns">
          <AuthButton
            logo="/images/google-logo.webp"
            text="구글에서 가입하기"
          />
          <AuthButton
            logo="/images/naver-logo.webp"
            text="네이버에서 가입하기"
          />
          <AuthButton
            logo="/images/kakao-logo.webp"
            text="카카오에서 가입하기"
          />

          <div className="auth-signin-divider">
            <p className="auth-signin-divider-line"></p>
            <span>또는</span>
            <p className="auth-signin-divider-line"></p>
          </div>

          <AuthButton logo="" text="계정 만들기" />
        </div>
      </section>
      <section className="auth-login">
        <div className="auth-login-title">이미 가입하셨나요?</div>
        <div className="auth-login-btn">
          <AuthButton logo="" text="로그인" />
        </div>
      </section>
    </div>
  );
};

export default Auth;
