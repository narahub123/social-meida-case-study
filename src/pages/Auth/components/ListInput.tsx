import "./listInput.css";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import {
  handleFocus,
  handleKeyDown,
  handleOpenDropdown,
  handleSelectItem,
} from "../../../utils/authUtils";
import { BirthType } from "../../../types/authTypes";

interface ListInputProps {
  field: string;
  unit: string;
  array: any[];
  focused: string;
  birth: BirthType;
  setFocused: (value: string) => void;
  setBirth: React.Dispatch<React.SetStateAction<BirthType>>;
}

const ListInput = ({
  field,
  unit,
  array,
  focused,
  birth,
  setFocused,
  setBirth,
}: ListInputProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  // 목록에서의 순서 상태
  const [index, setIndex] = useState(0);

  // 드롭다운 이외의 부분을 누르면 드롭다운이 닫힘
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

  // 드롭다운 위치 조정
  useEffect(() => {
    if (index < 0 || !listRef.current) return;

    const list = listRef.current;
    const itemHeight = list.children[0].clientHeight;
    const middleIndex = 3;
    const scrollTop = itemHeight * (index - middleIndex); // 스크롤 위치를 계산합니다.
    list.scrollTo({ top: scrollTop, behavior: "smooth" }); // 부드럽게 스크롤합니다.
  }, [index]);

  return (
    <div
      className="list-input"
      onClick={() =>
        handleOpenDropdown(
          field,
          openDropdown,
          setOpenDropdown,
          setFocused,
          inputRef
        )
      }
      ref={ref}
    >
      <div
        className={`list-input-wrapper${
          focused === field || birth[field as keyof BirthType] !== 0
            ? " focused"
            : ""
        }`}
      >
        <div className="list-input-left">
          <div className="list-input-left-title">{unit}</div>
          <input
            type="text"
            className="list-input-left-input"
            ref={inputRef}
            onFocus={() =>
              handleFocus(field, setFocused, inputRef, array, index, unit)
            }
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                inputRef,
                openDropdown,
                setOpenDropdown,
                field,
                index,
                setIndex,
                setBirth,
                array,
                unit
              )
            }
          />
        </div>
        <div className="list-input-right">
          <LuChevronDown
            className={`list-input-right-icon icon${
              openDropdown && focused === field ? " open" : ""
            }`}
          />
        </div>
      </div>
      <ul
        className={`list-input-list-container${
          openDropdown && focused === field ? " open" : ""
        }`}
        ref={listRef}
      >
        {array.map((item, idx) => (
          <li
            className={`list-input-list-item${
              array[index] === item ? " selected" : ""
            }`}
            key={item}
            onClick={(e) =>
              handleSelectItem(
                e,
                idx,
                field,
                unit,
                array,
                inputRef,
                openDropdown,
                setIndex,
                setBirth,
                setOpenDropdown
              )
            }
          >
            {item + unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListInput;
