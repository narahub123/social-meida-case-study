import "./googleUserId.css";
import { useEffect, useState } from "react";
import { BirthType, SignupInfoType } from "../../../../../types/auth.types";
import AuthButton from "../../../components/AuthButton";
import { validUserId } from "../../../../../utils/auth.utils";
import ListInput from "../../../components/ListInput";
import { dates, months, years } from "../../../data/authData";
import GenderInputSignup from "./GenderInputSignup";

interface GoogleUserIdProps {
  signupInfo: SignupInfoType;
  setSignupInfo: React.Dispatch<React.SetStateAction<SignupInfoType>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const GoogleUserId = ({
  signupInfo,
  setSignupInfo,
  setStage,
}: GoogleUserIdProps) => {
  const [focused, setFocused] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [birth, setBirth] = useState<BirthType>({
    year: 0,
    month: 0,
    date: 0,
  });

  // birth 내용 조합해서 signupInfo에 추가하기
  useEffect(() => {
    if (Object.values(birth).every((elem) => elem !== 0)) {
      const year = birth.year;
      const month = birth.month.toString().padStart(2, "0");
      const date = birth.date.toString().padStart(2, "0");

      const birthString = `${year}${month}${date}`;

      setSignupInfo((prev) => ({
        ...prev,
        birth: birthString,
      }));
    }
  }, [birth]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    let { value } = e.target;

    const warning: string[] = [];
    if (id === "userId") {
      const isValid = validUserId(value, warning);

      if (!isValid) {
        value = "";
      }
    }

    setMessages(warning);
    setSignupInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const abled = !!(signupInfo.userId && signupInfo.gender && signupInfo.birth);

  console.log(abled);

  return (
    <div className="google-oauth-content">
      <section className="google-oauth-content-header">
        <p className="google-oauth-content-header-title">
          계정 생성을 위해 추가적으로 정보를 등록해주세요.
        </p>
      </section>
      <section className="google-oauth-content-main">
        <div className="google-oauth-content-main-item">
          <p className="google-oauth-content-main-item-title">사용자 아이디</p>
          <p className="google-oauth-content-main-item-detail">
            구글 아이디를 사용하신다면 변경하지 마세요.
          </p>
          <div className="filled-input">
            <div className="filled-input-container">
              <p className="filled-input-title">사용자 아이디</p>
              <input
                type="text"
                className="filled-input-input"
                id={"userId"}
                placeholder={
                  focused === "userId" ? "" : (signupInfo.userId as string)
                }
                onChange={(e) => handleChangeValue(e)}
                onFocus={() => setFocused("userId")}
                onBlur={() => setFocused("")}
              />
            </div>
            <div className="filled-input-message">
              {messages.map((msg) => (
                <p className="filled-input-message-item">{msg}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="google-oauth-content-main-item">
          <GenderInputSignup
            field="gender"
            title="성별"
            focused={focused}
            setFocused={setFocused}
            signupInfo={signupInfo}
            setSignupInfo={setSignupInfo}
          />
        </div>
        <div className="google-oauth-content-main-item">
          <div className="google-oauth-content-main-item-title">생년월일</div>
          <div className="email-signup-birth-selection-container">
            {/* 년 */}
            <ListInput
              field="year"
              unit={"년"}
              array={years}
              birth={birth}
              setBirth={setBirth}
              focused={focused}
              setFocused={setFocused}
              width="130px"
            />
            {/* 월 */}
            <ListInput
              field="month"
              unit={"월"}
              array={months}
              birth={birth}
              setBirth={setBirth}
              focused={focused}
              setFocused={setFocused}
              width="130px"
            />
            {/* 일 */}
            <ListInput
              field="date"
              unit={"일"}
              array={dates(birth.month, birth.year)}
              birth={birth}
              setBirth={setBirth}
              focused={focused}
              setFocused={setFocused}
              width="130px"
            />
          </div>
        </div>
      </section>
      <section className="google-oauth-content-bottom">
        <div
          className={`google-oauth-btn-wrapper`}
          onClick={abled ? () => setStage("alarm") : undefined}
        >
          <AuthButton logo="" text="다음" width="100%" disabled={!abled} />
        </div>
      </section>
    </div>
  );
};

export default GoogleUserId;
