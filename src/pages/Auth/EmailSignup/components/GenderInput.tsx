import { useEffect, useRef, useState } from "react";
import { UserSignupType } from "../../../../types/authTypes";
import { genderList } from "../../data/authData";
import "./genderInput.css";
import {
  getFocused,
  handleChooseGender,
  handleKeyDownObject,
} from "../../../../utils/authUtils";

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
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`gender-input`}
      onClick={() =>
        getFocused(field, openDropdown, setOpenDropdown, setFocused)
      }
      ref={ref}
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
          onFocus={() => setFocused(field)}
          onKeyDown={(e) =>
            handleKeyDownObject(
              e,
              inputRef,
              openDropdown,
              setOpenDropdown,
              field,
              index,
              setIndex,
              genderList,
              setUserSignup
            )
          }
        />
        <ul className={`gender-input-list${openDropdown ? " open" : ""}`}>
          {genderList.map((gender) => (
            <li
              className={`gender-input-list-item${
                focused === field ||
                (userSignup[field] !== "" && userSignup[field])
                  ? " open"
                  : ""
              }${gender.name === genderList[index].name ? " selected" : ""}`}
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
