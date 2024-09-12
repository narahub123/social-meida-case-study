import { LuChevronDown } from "react-icons/lu";
import "./selectItem.css";
import React, { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { VoteType } from "../../../types/home.types";

interface SelectItemProps {
  title: string;
  array: number[];
  id: "date" | "hour" | "min";
  vote: VoteType;
  setVote: React.Dispatch<React.SetStateAction<VoteType>>;
}
const SelectItem = ({ title, id, array, vote, setVote }: SelectItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  useClickOutside(containerRef, setOpenDropdown);

  const handleSelect = (num: number) => {
    setVote((prev) => ({
      ...prev,
      duration: {
        ...prev.duration,
        [id]: num,
      },
    }));
  };
  return (
    <div
      className={`select-item${vote["duration"][id] ? " active" : ""}`}
      onClick={() => setOpenDropdown(!openDropdown)}
      ref={containerRef}
    >
      <div className="select-item-container">
        <span className="select-item-left">
          <p className="select-item-title">{title}</p>
          <p className="select-item-text">{vote["duration"][id]}</p>
        </span>
        <span className="select-item-right">
          <LuChevronDown
            className={`select-item-icon icon${openDropdown ? " open" : ""}`}
          />
        </span>
      </div>

      <ul className={`select-item-dropdown${openDropdown ? " active" : ""}`}>
        {array.map((item) => (
          <li
            key={item}
            className={`select-item-dropdown-item${
              vote[`duration`][id] === item ? " selected" : ""
            } ${openDropdown ? " active" : ""}`}
            onClick={() => handleSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectItem;
