import "./languageCheck.css";
import React from "react";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";

interface LanguageCheckProps {
  selectedName: string | undefined;
  englishName: string | undefined;
  ownName: string | undefined;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  index: number;
}

const LanguageCheck = ({
  selectedName,
  englishName,
  ownName,
  selected,
  setSelected,
  index,
}: LanguageCheckProps) => {
  const handleClickCheckbox = (language: string | undefined) => {
    if (!language) return;
    setSelected(language);
  };
  return (
    <div className="language-check">
      <span className="language-check-info">
        <p className="language-check-info-selected-name">{selectedName}</p>
        <p className="language-check-info-detail">
          <span className="language-check-info-detail-english">
            {englishName}
          </span>
          <span className="language-check-info-detail-divider">/</span>
          <span className="language-check-info-detail-own">{ownName}</span>
        </p>
      </span>
      <span
        className={`language-check-selection${
          selected === englishName ? " selected" : ""
        }`}
        onClick={() => handleClickCheckbox(englishName)}
      >
        {selected === englishName ? (
          <IoCheckbox
            tabIndex={index}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClickCheckbox(englishName);
              }
            }}
          />
        ) : (
          <IoSquareOutline
            tabIndex={index}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClickCheckbox(englishName);
              }
            }}
          />
        )}
      </span>
    </div>
  );
};

export default LanguageCheck;
