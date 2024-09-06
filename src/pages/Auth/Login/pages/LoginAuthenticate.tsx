import React, { useEffect, useRef, useState } from "react";
import LoginNormalInput from "../components/LoginNormalInput";
import { LoginProps } from "../Login";
import { LoginInfoType } from "../../../../types/auth.types";
import AuthButton from "../../components/AuthButton";
import { requestAuthCode, verifyAuthCodeAPI } from "../../../../apis/auth.apis";

interface LoginAuthenticateProps extends LoginProps {
  loginInfo: LoginInfoType;
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfoType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const LoginAuthenticate = ({
  setOpenLogin,
  loginInfo,
  setLoginInfo,
  setStage,
}: LoginAuthenticateProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const verifyAuthCode = async () => {
    const authCode = loginInfo.authCode;
    const userId = loginInfo.userId;
    const email = loginInfo.email;

    setLoading(true);
    await verifyAuthCodeAPI(authCode, userId, email)
      .then((res) => {
        console.log(res);

        setStage("loginList");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
        setLoginInfo((prev) => ({
          ...prev,
          authCode: "",
        }));
      });
  };

  const resendAuthCode = async () => {
    const userId = loginInfo[`userId`];
    const email = loginInfo[`email`];
    setLoading(true);
    await requestAuthCode(userId, email)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-main">
      <section className="login-main-header">
        <p className="login-main-header-title">
          인증 코드 확인을 하지 않은 가입자입니다.
        </p>
        <p className="login-main-header-detail">
          등록하신 이메일에 전송된 메시지를 확인 후 인증 코드를 입력해주세요.
        </p>
      </section>
      <section className="login-main-content">
        <LoginNormalInput
          title={"인증 코드"}
          field="authCode"
          focused={focused}
          divRef={divRef}
          inputRef={inputRef}
          loginInfo={loginInfo}
          setLoginInfo={setLoginInfo}
          width="100%"
        />

        <div className="login-main-warnning">{message}</div>

        <div
          className="login-main-resendEmail"
          onClick={() => resendAuthCode()}
        >
          인증코드 다시 받기
        </div>
      </section>
      <section className="login-main-bottom">
        <div
          className="login-main-wrapper"
          onClick={loginInfo[`authCode`] ? () => verifyAuthCode() : undefined}
        >
          <AuthButton
            logo=""
            text="인증 코드 확인하기"
            width="100%"
            disabled={!loginInfo[`authCode`]}
            loading={loading}
          />
        </div>
      </section>
    </div>
  );
};

export default LoginAuthenticate;
