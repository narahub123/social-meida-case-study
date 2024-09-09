import { useEffect, useState } from "react";
import { LanguageListType } from "../../../../../types/settings.types";
import { SignupInfoType } from "../../../../../types/auth.types";
import { languageList } from "../../../../../data/settingsData";
import LanguageCheck from "../../../EmailSignup/components/LanguageCheck";
import { LuLoader2 } from "react-icons/lu";
import { googleOauthSignup, signupAPI } from "../../../../../apis/auth.apis";
import { useNavigate } from "react-router-dom";

interface GoogleLanguageProps {
  signupInfo: SignupInfoType;
  setSignupInfo: React.Dispatch<React.SetStateAction<SignupInfoType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}
const GoogleLanguage = ({
  signupInfo,
  setSignupInfo,
  setStage,
}: GoogleLanguageProps) => {
  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);
  const [selected, setSelected] = useState("Korean");
  const [langList, setLangList] = useState<(LanguageListType | undefined)[]>(
    []
  );
  useEffect(() => {
    setSignupInfo((prev) => ({
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

  const handleGoogleSignup = async (signupInfo: SignupInfoType) => {
    setLoding(true);
    await googleOauthSignup(signupInfo)
      .then((res) => {
        if (res.success === "ok") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoding(false));
  };

  return (
    <div className="google-oauth-content">
      <section className="google-oauth-content-header">
        <div className="email-signup-title">사용하는 언어가 무엇인가요?</div>
        <div className="email-signup-detail">
          원하는 언어를 선택하여 게시물, 사람들, 트렌드를 볼 수 있습니다.
        </div>
      </section>
      <section className="google-oauth-content-main">
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
                index={0}
              />
            ))}
        </div>
      </section>
      <section className="google-oauth-content-bottom">
        <button
          className={`email-signup-button valid${loading ? " loading" : ""}`}
          disabled={loading}
          onClick={() => handleGoogleSignup(signupInfo)}
          style={{ width: "100%" }}
        >
          {loading ? (
            <LuLoader2
              className={`email-signup-button-spinner${
                loading ? " loading" : ""
              }`}
            />
          ) : (
            "제출"
          )}
        </button>
      </section>
    </div>
  );
};

export default GoogleLanguage;
