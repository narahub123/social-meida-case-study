import { LuX } from "react-icons/lu";
import "./login.css";
import { useEffect, useState } from "react";
import { LoginInfoType } from "../../../types/auth.types";
import LoginList from "./pages/LoginList";
import NormalLogin from "./pages/NormalLogin";
import LoginAuthenticate from "./pages/LoginAuthenticate";
import { fetchIPInfo, getUserLocation } from "../../../utils/auth.utils";

export interface LoginProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setOpenLogin }: LoginProps) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    password: "",
  });

  const [stage, setStage] = useState("loginList");

  // ip, 주소
  useEffect(() => {
    // 주소
    getUserLocation(setLoginInfo);
    // ip
    fetchIPInfo(setLoginInfo);
  }, []);

  console.log(loginInfo);

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-container">
          {/* 닫기 버튼 */}
          <LuX className="login-close" onClick={() => setOpenLogin(false)} />
          {/* 본문 */}
          {stage === "loginList" && (
            <LoginList
              loginInfo={loginInfo}
              setLoginInfo={setLoginInfo}
              setOpenLogin={setOpenLogin}
              setStage={setStage}
            />
          )}
          {stage === "normalLogin" && (
            <NormalLogin
              loginInfo={loginInfo}
              setLoginInfo={setLoginInfo}
              setOpenLogin={setOpenLogin}
              setStage={setStage}
            />
          )}
          {stage === "loginAuthCode" && (
            <LoginAuthenticate
              loginInfo={loginInfo}
              setLoginInfo={setLoginInfo}
              setOpenLogin={setOpenLogin}
              setStage={setStage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
