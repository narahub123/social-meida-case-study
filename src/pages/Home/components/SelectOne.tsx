import { LuChevronDown } from "react-icons/lu";
import "./selectOne.css";
import { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

interface SelectOneProps {
  title: string;
  id: string;
  unit: string;
  list: any[];
}

const SelectOne = ({ title, id, unit, list }: SelectOneProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [openList, setOpenList] = useState(false);

  useClickOutside(divRef, setOpenList);

  return (
    <div
      className={`select-one${focused ? " focused" : ""}`}
      onClick={() => {
        setFocused(!focus);
        setOpenList(!openList);
      }}
      ref={divRef}
    >
      <div className="select-one-wrapper">
        <span className="select-one-info-container">
          <div className="select-one-info-title">{title}</div>
          <div className="select-one-info-text">정보</div>
        </span>
        <span className="select-one-icon-container">
          <LuChevronDown className="select-one-icon icon" />
        </span>
      </div>
      <ul className={`select-one-list-container${openList ? " open" : ""}`}>
        {list.map((a) => (
          <li className="select-one-list-item" key={a}>
            {a + unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectOne;
