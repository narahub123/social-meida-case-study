import { useRef, useState } from "react";
import "./normalInput.css";
import { UserSignupType, UserSignupValidType } from "../../../types/auth";
import { debouncedInputChange, handleClick } from "../../../utils/auth";
interface NormalInputProps {
  title: string;
  field: string;
  limitOfLetters?: number;
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
  userSignup: UserSignupType;
  setUserSignup: React.Dispatch<React.SetStateAction<UserSignupType>>;
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
  setIsValid,
}: NormalInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState("");

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
          type="text"
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
      </div>
      {messages && focused === field && (
        <div className={`normal-input-messages`}>{messages}</div>
      )}
    </div>
  );
};

export default NormalInput;
