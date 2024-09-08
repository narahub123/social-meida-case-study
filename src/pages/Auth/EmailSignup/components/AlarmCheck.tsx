import {
  IoCheckbox,
  IoCheckboxOutline,
  IoSquareOutline,
} from "react-icons/io5";
import "./alarmCheck.css";
import { useState } from "react";
import { AlarmType } from "../../../../types/settings.types";
interface AlarmCheckProps {
  title: string;
  detail: string;
  subField: string;
  setAlarms: React.Dispatch<React.SetStateAction<AlarmType>>;
  index: number;
}
const AlarmCheck = ({
  title,
  detail,
  subField,
  setAlarms,
  index,
}: AlarmCheckProps) => {
  const [selected, setSelected] = useState(false);
  const handleChangeCheckbox = () => {
    const newSelect = selected ? false : true;

    setSelected(newSelect);
    setAlarms((prev) => ({
      ...prev,
      [subField]: newSelect,
    }));
  };

  return (
    <div className="alarm-check">
      <div className="alarm-check-info">
        <div className="alarm-check-info-title">{title}</div>
        <div className="alarm-check-info-detail">{detail}</div>
      </div>
      <div
        className={`alarm-check-selection${selected ? " selected" : ""}`}
        onClick={() => handleChangeCheckbox()}
      >
        {selected ? (
          <IoCheckbox
            tabIndex={index}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChangeCheckbox();
              }
            }}
          />
        ) : (
          <IoSquareOutline
            tabIndex={index}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChangeCheckbox();
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AlarmCheck;
