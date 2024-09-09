import "./stage1.css";
import { useState } from "react";
import NormalInput from "../../components/NormalInput";
import { Stage0Props } from "./Stage0";
import { UserSignupValidType } from "../../../../types/auth.types";
import { LuLoader2 } from "react-icons/lu";
import { requestAuthCode, verifyAuthCodeAPI } from "../../../../apis/auth.apis";

interface Stage1Props extends Stage0Props {}

const Stage1 = ({ userSignup, setUserSignup, setStage }: Stage1Props) => {
  const [focused, setFocused] = useState("");
  const [isValid, setIsValid] = useState<UserSignupValidType>({
    emailAuth: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [text, setText] = useState("normal");

  const handleResendAuthCode = async () => {
    const userId = userSignup.userId as string;
    await requestAuthCode(userId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const verifyAuthCode = async () => {
    const authCode = userSignup.emailAuth as string;
    const userId = userSignup.userId as string;

    await verifyAuthCodeAPI(authCode, userId)
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => {
        console.log(err);

        if (err.success === "expired") {
          setText("expired");
        }

        setMessage(err.message);
      });
  };

  return (
    <>
      <section className="email-signup-section">
        <div className="email-signup-title">코드를 보내드렸습니다.</div>
        <div className="email-signup-depict">{` 인증을 위해 아래에 입력하세요.`}</div>
      </section>
      <section className="email-signup-section">
        <NormalInput
          title={"인증코드"}
          field={"emailAuth"}
          focused={focused}
          setFocused={setFocused}
          userSignup={userSignup}
          setUserSignup={setUserSignup}
          isValid={isValid}
          setIsValid={setIsValid}
          setLoading={setLoading}
        />
        <p>{message}</p>
        <p className="email-signup-resend" onClick={handleResendAuthCode}>
          이메일을 받지 못하셨나요?
        </p>
      </section>
      <section className="email-signup-section">
        <button
          className={`email-signup-button valid${loading ? " loading" : ""}`}
          disabled={loading}
          onClick={
            text === "expired"
              ? () => handleResendAuthCode()
              : () => verifyAuthCode()
          }
        >
          {loading ? (
            <LuLoader2
              className={`email-signup-button-spinner${
                loading ? " loading" : ""
              }`}
            />
          ) : text === "expired" ? (
            "인증 코드 재발송"
          ) : (
            "인증 코드 확인"
          )}
        </button>
      </section>
    </>
  );
};

export default Stage1;
