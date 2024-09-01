import "./listInput.css";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

interface ListInputProps {
  field: string;
  unit: string;
  array: any[];
  focused: string;
  setFocused: (value: string) => void;
}

const ListInput = ({
  field,
  unit,
  array,
  focused,
  setFocused,
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

  // dropdown 여닫기
  const handleOpenDropdown = () => {
    console.log(1);

    setOpenDropdown(!openDropdown);
    setFocused(field);
    inputRef.current?.focus();
  };

  // 리스트에서 아이템 선택하기
  const handleSelectItem = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    console.log(2);

    e.stopPropagation();
    console.log(index);

    setIndex(index);
    if (!inputRef.current) return;
    inputRef.current.value = array[index] + unit;

    // setOpenDropdown(!openDropdown);
  };

  // tab 이동으로 focus 주기
  const handleFocus = () => {
    console.log(3);

    setFocused(field);

    // 포커스를 주면 input 박스에 값 표시하기
    if (!inputRef.current) return;
    inputRef.current.value = array[index] + unit;
  };

  // 키로 목록 이동
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(5);
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
      if (newIndex > array.length - 1) return; // 목록 갯수보다 큰 경우
      setIndex(newIndex);
    }

    if (e.key === "ArrowUp") {
      newIndex = index - 1;
      if (newIndex < 0) return; // 0보다 작은 경우
      setIndex(newIndex);
    }

    inputRef.current.value = array[newIndex] + unit;
  };

  return (
    <div className="list-input" onClick={() => handleOpenDropdown()} ref={ref}>
      <div
        className={`list-input-wrapper${focused === field ? " focused" : ""}`}
      >
        <div className="list-input-left">
          <div className="list-input-left-title">{unit}</div>
          <input
            type="text"
            className="list-input-left-input"
            ref={inputRef}
            onFocus={() => handleFocus()}
            onKeyDown={(e) => handleKeyDown(e)}
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
            onClick={(e) => handleSelectItem(e, idx)}
          >
            {item + unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListInput;
