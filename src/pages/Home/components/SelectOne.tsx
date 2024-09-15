import { LuChevronUp } from "react-icons/lu";
import "./selectOne.css";
import { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

interface SelectOneProps {
  title: string;
  id: string;
  unit: string;
  list: any[];
  text: string | number | undefined;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const SelectOne = ({
  title,
  id,
  unit,
  list,
  text,
  selectedDate,
  setSelectedDate,
}: SelectOneProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [openList, setOpenList] = useState(false);

  useClickOutside(divRef, setOpenList);

  const selectItem = (value: number) => {
    const date = selectedDate ? new Date(selectedDate) : new Date();

    if (id === "year") {
      date.setFullYear(value);
    }
    if (id === "month") {
      date.setMonth(value - 1);
    }
    if (id === "date") {
      date.setDate(value);
    }
    if (id === "hour") {
      date.setHours(value);
    }
    if (id === "minute") {
      date.setMinutes(value);
    }
    if (id === "ampm") {
      if (value === 0 && selectedDate && selectedDate?.getHours() > 12) {
        date.setHours(date.getHours() - 12);
      }
      if (value === 1 && selectedDate && selectedDate?.getHours() < 13) {
        date.setHours(date.getHours() + 12);
      }
    }
    setSelectedDate(date);
  };

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
          <p className="select-one-info-text">
            {id === "month" && typeof text === "number"
              ? text + 1
              : selectedDate &&
                id === "ampm" &&
                selectedDate?.getHours() > 0 &&
                selectedDate?.getHours() < 12
              ? "AM"
              : selectedDate && id === "ampm" && selectedDate?.getHours() > 13
              ? "PM"
              : text}
          </p>
        </span>
        <span className="select-one-icon-container">
          <LuChevronUp
            className={`select-one-icon${openList ? " open" : ""} icon`}
          />
        </span>
      </div>
      <ul className={`select-one-list-container${openList ? " open" : ""}`}>
        {list.map((a) => (
          <li
            className="select-one-list-item"
            key={a}
            onClick={() => selectItem(a)}
          >
            <p className="select-one-list-item-text">
              {id === "ampm" && a === 0
                ? "AM"
                : id === "ampm" && a === 1
                ? "PM"
                : a + unit}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectOne;
