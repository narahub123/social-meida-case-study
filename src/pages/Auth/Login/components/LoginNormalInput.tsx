import "./loginNormalInput.css";
import { useState } from "react";
import { LoginInfoType } from "../../../../types/auth.types";
import { classifyField, validatePassword } from "../../../../utils/auth.utils";
import { debounce } from "../../../../utils/debounce";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface LoginNormalInputProps {
  title: string;
  field: string;
  focused: boolean;
  divRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfoType>>;
  width?: string;
}

const LoginNormalInput = ({
  title,
  field,
  focused,
  divRef,
  inputRef,
  setLoginInfo,
  width = "300px",
}: LoginNormalInputProps) => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;

    // 필드가 확정되지 않는 경우
    if (field === "mixed") {
      // 필드 구별
      const classifiedField = classifyField(value);

      if (classifiedField === "wrong") {
        setMessage("잘못된 형식의 정보입니다. 다시 확인해 주세요");
        setLoginInfo({ wrong: "" });
        return;
      }
      // 중간에 포멧이 바뀔 수도 있기 때문에
      // 기존 정보를 가지고 업데이트 하기 보다는 새로 작성하는 방법을 사용
      setLoginInfo({ [classifiedField]: value });
      setMessage("");
    }
    // 필드가 확정된 경우
    else {
      if (field === "password") {
        const isValid = validatePassword(value);

        if (!isValid) {
          setLoginInfo((prev) => ({
            ...prev,
            password: "",
          }));
          setMessage("잘못된 형식의 비밀번호입니다.");

          return;
        }
      }

      setLoginInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
      setMessage("");
    }
  };

  const debouncedHandleValue = debounce<typeof handleValue>(handleValue, 500);

  const handleVisible = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };
  return (
    <>
      <div
        className={`login-normal-input${focused ? " focused" : ""}`}
        ref={divRef}
        style={{ width }}
      >
        <p className={`login-normal-input-title${focused ? " focused" : ""}`}>
          {title}
        </p>
        {field !== "password" && (
          <input
            type="text"
            ref={inputRef}
            className={`login-normal-input-input${focused ? " focused" : ""}`}
            onChange={debouncedHandleValue}
          />
        )}
        {field === "password" && (
          <>
            <input
              type={isVisible ? "text" : "password"}
              ref={inputRef}
              className={`login-normal-input-input${focused ? " focused" : ""}`}
              onChange={debouncedHandleValue}
            />
            {isVisible ? (
              <IoMdEye
                className="login-normal-input-input-icon"
                onClick={(e) => handleVisible(e)}
              />
            ) : (
              <IoMdEyeOff
                className="login-normal-input-input-icon"
                onClick={(e) => handleVisible(e)}
              />
            )}
          </>
        )}
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
