import { useState } from "react";
import NormalInput from "../../../components/NormalInput";

const KakaoUsername = () => {
  const [focused, setFocused] = useState("");
  return (
    <div className="kakao-oauth-signup-main">
      <section className="kakao-oauth-signup-main-header">
        <div className="kakao-oauth-signup-main-header-title">
          카카오 계정 생성하기
        </div>
      </section>
      <section className="kakao-oauth-signup-main-content"></section>
      <section className="kakao-oauth-signup-main-bottom"></section>
    </div>
  );
};

export default KakaoUsername;
