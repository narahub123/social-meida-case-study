import { useRef, useState } from "react";
import "./normalInput.css";
import { UserSignupType, UserSignupValidType } from "../../../types/auth.types";
import { debouncedInputChange, handleClick } from "../../../utils/auth.utils";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
interface NormalInputProps {
  title: string;
  field: string;
  limitOfLetters?: number;
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
  userSignup: UserSignupType;
  setUserSignup: React.Dispatch<React.SetStateAction<UserSignupType>>;
  isValid: UserSignupValidType;
  setIsValid: React.Dispatch<React.SetStateAction<UserSignupValidType>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const NormalInput = ({
  title,
  field,
  limitOfLetters,
  focused,
  setFocused,
  userSignup,
  setUserSignup,
  isValid,
  setIsValid,
  setLoading,
}: NormalInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState("");
  const defaultVisible = field === "password" ? false : true;
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const handlePasswordHideVisible = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <div
      className="normal-input"
      onClick={() => handleClick(field, setFocused, inputRef)}
    >
      <div
        className={`normal-input-container${
          focused === field || userSignup[field] !== "" ? " focused" : ""
        }`}
      >
        <div className="normal-input-info">
          <span
            className={`normal-input-info-title${
              focused === field || userSignup[field] !== "" ? " active" : ""
            }`}
          >
            {title}
          </span>
          {limitOfLetters && (
            <span
              className={`normal-input-info-count${
                focused === field ? " active" : ""
              }`}
            >
              {typeof userSignup[field] === "string" &&
                userSignup[field].length}
              /{limitOfLetters}
            </span>
          )}
        </div>
        <input
          type={isVisible ? "text" : "password"}
          id={field}
          className={`normal-input-input${
            focused === field || userSignup[field] !== "" ? " focused" : ""
          }`}
          ref={inputRef}
          onChange={(e) =>
            debouncedInputChange(
              e,
              setMessages,
              setIsValid,
              setUserSignup,
              setLoading
            )
          }
          onFocus={() => setFocused(field)}
        />
        {field === "password" && (
          <div
            className={`normal-input-eye${
              focused === field || userSignup[field] !== "" ? " focused" : ""
            }`}
            // 비밀번호 노출/숨김
            onClick={(e) => handlePasswordHideVisible(e)}
          >
            {isVisible ? <IoMdEye /> : <IoMdEyeOff />}
          </div>
        )}
        {field === "userId" && (
          <div
            className={`normal-input-correction${
              isValid.userId ? " valid" : ""
            }`}
          >
            <FaCheckCircle />
          </div>
        )}
      </div>
      {messages && focused === field && userSignup[field] && (
        <ul className={`normal-input-messages`}>
          {messages.split(". ").map((msg, idx) => (
            <li
              key={idx}
              className={`normal-input-messages-item${
                isValid[field] ? " valid" : ""
              }`}
            >
              {msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NormalInput;
