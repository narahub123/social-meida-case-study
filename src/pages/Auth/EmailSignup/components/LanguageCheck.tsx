import "./languageCheck.css";
import React from "react";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";

interface LanguageCheckProps {
  language: string;
  title: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageCheck = ({
  language,
  title,
  selected,
  setSelected,
}: LanguageCheckProps) => {
  const handleClickCheckbox = (language: string) => {
    setSelected(language);
  };
  return (
    <div className="language-check">
      <span className="language-check-info">
        <p className="language-check-info-title">{title}</p>
        <p className="language-check-info-detail">{language}</p>
      </span>
      <span
        className={`language-check-selection${
          selected === language ? " selected" : ""
        }`}
        onClick={() => handleClickCheckbox(language)}
      >
        {selected === language ? <IoCheckbox /> : <IoSquareOutline />}
      </span>
    </div>
  );
};

export default LanguageCheck;
