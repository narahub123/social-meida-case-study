import { useRef, useState } from "react";
import "./normalInput.css";
import { UserSignupType, UserSignupValidType } from "../../../types/auth";
import { debouncedInputChange, handleClick } from "../../../utils/auth";
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
}: NormalInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState("");
  const defaultVisible = field === "password" ? false : true;
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [correct, setCorrect] = useState(true);

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
              {userSignup[field].length}/{limitOfLetters}
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
            debouncedInputChange(e, setMessages, setIsValid, setUserSignup)
          }
          onFocus={() => setFocused(field)}
          onBlur={() => setFocused("")}
        />
        {field === "password" && (
          <div
            className={`normal-input-eye${
              focused === field || userSignup[field] !== "" ? " focused" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(!isVisible);
            }}
          >
            {isVisible ? <IoMdEye /> : <IoMdEyeOff />}
          </div>
        )}
        {field === "userId" && (
          <div
            className={`normal-input-correction${correct ? " correct" : ""}`}
          >
            <FaCheckCircle />
          </div>
        )}
      </div>
      {messages && focused === field && (
        <ul className={`normal-input-messages`}>
          {messages.split(". ").map((msg) => (
            <li
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
