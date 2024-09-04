import "./stage6.css";
import { useEffect, useState } from "react";
import { handleNext } from "../../../../utils/auth";
import { Stage0Props } from "./Stage0";
import LanguageCheck from "./LanguageCheck";
import { languageList } from "../../../../data/settings";
import { LanguageListType } from "../../../../types/settings";
import { UserSignupType } from "../../../../types/auth";
import { signupAPI } from "../../../../apis/auth";

const Stage6 = ({ userSignup, setUserSignup, setStage }: Stage0Props) => {
  const [selected, setSelected] = useState("Korean");
  const [langList, setLangList] = useState<(LanguageListType | undefined)[]>(
    []
  );

  useEffect(() => {
    setUserSignup((prev) => ({
      ...prev,
      language: selected,
    }));
  }, [selected]);

  useEffect(() => {
    // 선택된 언어를 첫 요소로 설정
    const first = languageList.find(
      (language) => language.English === selected
    );
    // 선택된 언어를 제외한 언어들은 선택된 언어를 기준으로 정렬
    const rest = languageList
      .filter((language) => language.English !== selected)
      .sort((a, b) => {
        return a[selected as keyof LanguageListType].localeCompare(
          b[selected as keyof LanguageListType]
        );
      });

    // 합치기
    const newLangList = [first, ...rest];

    setLangList(newLangList);
  }, [selected]);

  const handleSignup = async (userSignup: UserSignupType) => {
    await signupAPI(userSignup)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
          {langList &&
            langList.map((language) => (
              <LanguageCheck
                key={language?.ownName}
                selectedName={language?.[selected as keyof typeof language]}
                englishName={language?.English}
                ownName={language?.ownName}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
        </div>
      </section>

      <section className="email-signup-section">
        {/* <button
          className={`email-signup-button valid`}
          onClick={() => handleNext("follow", setStage)}
        >
          다음
        </button> */}
        <button
          className={`email-signup-button valid`}
          onClick={() => handleSignup(userSignup)}
        >
          다음
        </button>
      </section>
    </>
  );
};

export default Stage6;
