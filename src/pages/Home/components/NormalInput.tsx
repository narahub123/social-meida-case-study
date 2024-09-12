import useClickOutside from "../../../hooks/useClickOutside";
import { VoteType } from "../../../types/home.types";
import { debounce } from "../../../utils/debounce";
import "./normalInput.css";
import { useEffect, useRef, useState } from "react";

interface NormalInputProps {
  id: string;
  text: string;
  vote: VoteType;
  setVote: React.Dispatch<React.SetStateAction<VoteType>>;
}
const NormalInput = ({ id, text, vote, setVote }: NormalInputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const MAX_CHOICE_TEXT = 25;

  // focused 조건
  const condition = focused || vote["choices"][id];

  useClickOutside(containerRef, setFocused);

  const handleChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (!id) return;
    setVote((prev) => ({
      ...prev,
      choices: {
        ...prev["choices"],
        [id]: value,
      },
    }));
  };

  const debouncedHandleChoice = debounce(handleChoice, 500);
  return (
    <div
      className={`input-normal${condition ? " focused" : ""}`}
      ref={containerRef}
      tabIndex={1}
      onFocus={() => setFocused(true)}
    >
      <div className={`input-normal-info${condition ? " focused" : ""}`}>
        <p className={`input-normal-info-title${condition ? " focused" : ""}`}>
          {text}
        </p>
        <p
          className={`input-normal-info-textcount${
            condition ? " focused" : ""
          }`}
        >
          {`${vote["choices"][id].length} / ${MAX_CHOICE_TEXT}`}
        </p>
      </div>
      <input
        type="text"
        id={id}
        className={`input-normal-input${condition ? " focused" : ""}`}
        onChange={debouncedHandleChoice}
      />
    </div>
  );
};

export default NormalInput;
