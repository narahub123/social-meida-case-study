import { LuX } from "react-icons/lu";
import "./login.css";
import AuthButton from "../components/AuthButton";
import AuthDivider from "../components/AuthDivider";
import { useEffect, useRef, useState } from "react";
import LoginNormalInput from "./components/LoginNormalInput";
import { LoginInfoType } from "../../../types/auth.types";

interface LoginProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setOpenLogin }: LoginProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    password: "",
  });

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

  const abled = Object.values(loginInfo).every((value) => value !== "");

  console.log(loginInfo);

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-container">
          {/* 닫기 버튼 */}
          <LuX className="login-close" onClick={() => setOpenLogin(false)} />
          {/* 본문 */}
          <div className="login-main">
            <section className="login-main-header">
              <div className="login-main-header-logo">PlayGround</div>
              <div className="login-main-header-title">
                PlayGround에 가입하세요
              </div>
            </section>
            <section className="login-main-content">
              <AuthButton logo="/images/google-logo.webp" text="구글 로그인" />
              <AuthButton logo="/images/naver-logo.webp" text="네이버 로그인" />
              <AuthButton logo="/images/kakao-logo.webp" text="카카오 로그인" />
              <AuthDivider text="또는" />
              <LoginNormalInput
                focused={focused}
                divRef={divRef}
                inputRef={inputRef}
                setLoginInfo={setLoginInfo}
              />
              <AuthButton logo="" text="다음" disabled={!abled} />
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
        </div>
      </div>
    </div>
  );
};

export default Login;
