import { useRef, useState } from "react";
import { UserSignupType } from "../../../../types/auth";
import { genderList } from "../../data/auth";
import "./genderInput.css";
import {
  getFocused,
  handleChooseGender,
  showGenderName,
} from "../../../../utils/auth";

interface GenderInputProps {
  title: string;
  field: string;
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
  userSignup: UserSignupType;
  setUserSignup: React.Dispatch<React.SetStateAction<UserSignupType>>;
}

const GenderInput = ({
  title,
  field,
  focused,
  setFocused,
  userSignup,
  setUserSignup,
}: GenderInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div
      className={`gender-input`}
      onClick={() =>
        getFocused(field, openDropdown, setOpenDropdown, setFocused)
      }
    >
      <div
        className={`gender-input-container${
          focused === field || (userSignup[field] !== "" && userSignup[field])
            ? " focused"
            : ""
        }`}
      >
        <div className="gender-input-info">
          <span
            className={`gender-input-info-title${
              focused === field ||
              (userSignup[field] !== "" && userSignup[field])
                ? " active"
                : ""
            }`}
          >
            {title}
          </span>
        </div>
        <input
          type="text"
          ref={inputRef}
          readOnly
          className={`gender-input-input${
            focused === field || (userSignup[field] !== "" && userSignup[field])
              ? " focused"
              : ""
          }`}
        />
        <ul className={`gender-input-list${openDropdown ? " open" : ""}`}>
          {genderList.map((gender) => (
            <li
              className={`gender-input-list-item${
                focused === field ||
                (userSignup[field] !== "" && userSignup[field])
                  ? " open"
                  : ""
              }`}
              key={gender.value}
              id={gender.value}
              onClick={(e) =>
                handleChooseGender(
                  e,
                  inputRef,
                  field,
                  setUserSignup,
                  setOpenDropdown
                )
              }
            >
              {gender.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenderInput;
