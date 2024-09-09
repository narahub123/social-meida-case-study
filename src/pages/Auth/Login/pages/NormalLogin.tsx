import { useEffect, useRef, useState } from "react";
import LoginNormalInput from "../components/LoginNormalInput";
import { LoginProps } from "../Login";
import { LoginInfoType } from "../../../../types/auth.types";
import LoginDisabledInput from "../components/LoginDisabledInput";
import AuthButton from "../../components/AuthButton";
import { loginAPI } from "../../../../apis/auth.apis";
import { useNavigate } from "react-router-dom";

interface NormalLoginProps extends LoginProps {
  loginInfo: LoginInfoType;
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfoType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const NormalLogin = ({
  setOpenLogin,
  loginInfo,
  setLoginInfo,
  setStage,
}: NormalLoginProps) => {
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [initial, setInitial] = useState<{ key: string; value: string }>({
    key: "",
    value: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  //처음 페이지로 이동했을 때의 key와 value 값
  useEffect(() => {
    const key = Object.keys(loginInfo)[0];
    const value = Object.values(loginInfo)[0];

    if (!key || !value) return;

    setInitial({
      key,
      value,
    });
  }, []);

  console.log(loginInfo);

  const handleLogin = async (loginInfo: LoginInfoType) => {
    setLoading(true);
    await loginAPI(loginInfo)
      .then((res) => {
        console.log(res);
        // 로그인 성공시 이동
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.success === "unautenticated") {
          setStage("loginAuthCode");
        } else if (err.success === "unregistered") {
          setStage("loginList");
        } else if (err.success === "wrongpassword") {
          setMessage("비밀번호가 일치하지 않습니다.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-main">
      <section className="login-main-header">
        <div className="login-main-header-title">비밀번호를 입력하세요</div>
      </section>
      <section className="login-main-content">
        <LoginDisabledInput
          title={initial.key === "userId" ? "사용자 아이디" : "이메일"}
          value={initial.value}
        />
        <LoginNormalInput
          title={"비밀번호"}
          field="password"
          focused={focused}
          divRef={divRef}
          inputRef={inputRef}
          loginInfo={loginInfo}
          setLoginInfo={setLoginInfo}
          width="100%"
        />
        {message && <p>{message}</p>}
      </section>
      <section className="login-main-btn">
        <div
          className="login-main-wrapper"
          onClick={
            loginInfo[`password`] || !loading
              ? () => handleLogin(loginInfo)
              : undefined
          }
        >
          <AuthButton
            logo=""
            text="로그인하기"
            width="100%"
            disabled={!loginInfo[`password`]}
            loading={loading}
          />
        </div>
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

export default NormalLogin;
