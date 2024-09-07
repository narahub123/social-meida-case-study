import { useRef, useState } from "react";
import { genderList } from "../../../data/authData";
import { getFocused, showGenderName } from "../../../../../utils/auth.utils";
import { SignupInfoType } from "../../../../../types/auth.types";

interface GenderInputSignupProps {
  field: string;
  title: string;
  focused: string;
  setFocused: React.Dispatch<React.SetStateAction<string>>;
  signupInfo: SignupInfoType;
  setSignupInfo: React.Dispatch<React.SetStateAction<SignupInfoType>>;
}

const GenderInputSignup = ({
  field,
  title,
  focused,
  setFocused,
  signupInfo,
  setSignupInfo,
}: GenderInputSignupProps) => {
  const [index, setIndex] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDownObject = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!inputRef.current) return;

    if (e.key === "Enter") {
      setOpenDropdown(!openDropdown);
    }

    if (e.key === "Escape") {
      setOpenDropdown(false);
    }

    let newIndex = index;
    if (e.key === "ArrowDown") {
      newIndex = index + 1;
      if (newIndex > genderList.length - 1) return; // 목록 갯수보다 큰 경우
      const value = genderList[newIndex].value;

      setIndex(newIndex);
      setSignupInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    if (e.key === "ArrowUp") {
      newIndex = index - 1;
      if (newIndex < 0) return; // 0보다 작은 경우
      const value = genderList[newIndex].value;
      setIndex(newIndex);
      setSignupInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    inputRef.current.value = genderList[newIndex].name;
  };

  const handleChooseGender = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (!inputRef.current) return;
    const gender = e.currentTarget.id;

    if (!gender) return;

    inputRef.current.value = showGenderName(gender);

    setSignupInfo((prev) => ({
      ...prev,
      [field]: gender,
    }));

    setOpenDropdown(false);
  };

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
          focused === field || (signupInfo[field] !== "" && signupInfo[field])
            ? " focused"
            : ""
        }`}
      >
        <div className="gender-input-info">
          <span
            className={`gender-input-info-title${
              focused === field ||
              (signupInfo[field] !== "" && signupInfo[field])
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
            focused === field || (signupInfo[field] !== "" && signupInfo[field])
              ? " focused"
              : ""
          }`}
          onFocus={() => setFocused(field)}
          onKeyDown={(e) => handleKeyDownObject(e)}
        />
        <ul className={`gender-input-list${openDropdown ? " open" : ""}`}>
          {genderList.map((gender) => (
            <li
              className={`gender-input-list-item${
                focused === field ||
                (signupInfo[field] !== "" && signupInfo[field])
                  ? " open"
                  : ""
              }${gender.name === genderList[index].name ? " selected" : ""}`}
              key={gender.value}
              id={gender.value}
              onClick={(e) => handleChooseGender(e)}
            >
              {gender.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GenderInputSignup;
