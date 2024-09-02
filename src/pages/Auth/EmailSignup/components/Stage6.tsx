import "./stage6.css";
import { useState } from "react";
import { handleNext } from "../../../../utils/auth";
import { Stage0Props } from "./Stage0";
import { UserSignupValidType } from "../../../../types/auth";

const Stage6 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const [isValid, setIsValid] = useState<UserSignupValidType>({
    language: false,
  });
  return (
    <>
      <section className="email-signup-section">
        <div className="email-signup-title">사용하는 언어가 무엇인가요?</div>
        <div className="email-signup-detail">
          원하는 언어를 선택하여 게시물, 사람들, 트렌드를 볼 수 있습니다.
        </div>
      </section>
      <section className="email-signup-section">
        <div className="email-signup-language-container">
          <div className="email-signup-language-item">
            <span className="email-signup-language-title">영어 - English</span>
            <span className="email-signup-language-selection">
              <input type="checkbox" />
            </span>
          </div>
          <div className="email-signup-language-item">
            <span className="email-signup-language-title">한국어</span>
            <span className="email-signup-language-selection">
              <input type="checkbox" />
            </span>
          </div>
        </div>
      </section>

      <section className="email-signup-section">
        <button
          className={`email-signup-button${isValid.language ? " valid" : ""}`}
          onClick={() => handleNext(7, setStage)}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage6;
