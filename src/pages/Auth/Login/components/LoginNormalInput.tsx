import { useState } from "react";
import { LoginInfoType } from "../../../../types/auth.types";
import { classifyField } from "../../../../utils/auth.utils";
import { debounce } from "../../../../utils/debounce";
import "./loginNormalInput.css";

interface LoginNormalInputProps {
  focused: boolean;
  divRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfoType>>;
}

const LoginNormalInput = ({
  focused,
  divRef,
  inputRef,
  setLoginInfo,
}: LoginNormalInputProps) => {
  const [message, setMessage] = useState("");
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 필드 구별
    const field = classifyField(value);

    if (field === "wrong") {
      setMessage("잘못된 형식의 정보입니다. 다시 확인해 주세요");
      setLoginInfo( { wrong: "" });
      return;
    }
    // 중간에 포멧이 바뀔 수도 있기 때문에
    // 기존 정보를 가지고 업데이트 하기 보다는 새로 작성하는 방법을 사용
    setLoginInfo({ [field]: value });
  };

  const debouncedHandleValue = debounce<typeof handleValue>(handleValue, 500);
  return (
    <>
      <div
        className={`login-normal-input${focused ? " focused" : ""}`}
        ref={divRef}
      >
        <p className={`login-normal-input-title${focused ? " focused" : ""}`}>
          사용자 아이디 혹은 이메일 주소
        </p>
        <input
          type="text"
          ref={inputRef}
          className={`login-normal-input-input${focused ? " focused" : ""}`}
          onChange={debouncedHandleValue}
        />
      </div>
      <div
        className={`login-normal-warning${message !== "" ? " warning" : ""}`}
      >
        {message}
      </div>
    </>
  );
};

export default LoginNormalInput;
