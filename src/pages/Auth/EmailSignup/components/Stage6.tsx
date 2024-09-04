import "./stage6.css";
import { useEffect, useState } from "react";
import { handleNext } from "../../../../utils/auth";
import { Stage0Props } from "./Stage0";
import LanguageCheck from "./LanguageCheck";

const Stage6 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const [selected, setSelected] = useState("Korean");

  useEffect(() => {
    setUserSignup((prev) => ({
      ...prev,
      language: selected,
    }));
  }, [selected]);

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
          <LanguageCheck
            title={"한국어"}
            language={"Korean"}
            selected={selected}
            setSelected={setSelected}
          />
          <LanguageCheck
            title={"영어"}
            language={"English"}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </section>

      <section className="email-signup-section">
        <button
          className={`email-signup-button valid`}
          onClick={() => handleNext("follow", setStage)}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage6;
