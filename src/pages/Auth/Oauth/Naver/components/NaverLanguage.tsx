import { useEffect, useState } from "react";
import { languageList } from "../../../../../data/settingsData";
import LanguageCheck from "../../../EmailSignup/components/LanguageCheck";
import {
  LanguageListType,
  PreferencesType,
} from "../../../../../types/settings.types";
import AuthButton from "../../../components/AuthButton";
import { saveSettingsAPI } from "../../../../../apis/auth.apis";
import { SignupInfoType } from "../../../../../types/auth.types";
import { useNavigate } from "react-router-dom";

interface NaverLanguageProps {
  setOpenNaverSignup: React.Dispatch<React.SetStateAction<boolean>>;
  naverSignupInfo: PreferencesType;
  setNaverSignupInfo: React.Dispatch<React.SetStateAction<SignupInfoType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const NaverLanguage = ({
  setOpenNaverSignup,
  naverSignupInfo,
  setNaverSignupInfo,
  setStage,
}: NaverLanguageProps) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("Korean");
  const [langList, setLangList] = useState<(LanguageListType | undefined)[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    setNaverSignupInfo((prev) => ({
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

  const handleSaveSettings = async (settings: PreferencesType) => {
    setLoading(true);
    await saveSettingsAPI(settings)
      .then((res) => {
        console.log(res);
        setOpenNaverSignup(false);
        // post 페이지로 이동
        navigate("/auth");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(naverSignupInfo);

  return (
    <div className="naver-oauth-signup-main">
      <section className="naver-oauth-signup-main-header">
        <div className="naver-oauth-signup-main-header-title">언어 설정</div>
      </section>
      <section className="naver-oauth-signup-main-content">
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
      </section>
      <section className="naver-oauth-signup-main-bottom">
        <div
          className="naver-oauth-signup-main-wrapper"
          onClick={() => handleSaveSettings(naverSignupInfo)}
        >
          <AuthButton logo="" text="설정 저장" loading={loading} width="100%" />
        </div>
      </section>
    </div>
  );
};

export default NaverLanguage;
