import {
  IoCheckbox,
  IoCheckboxOutline,
  IoSquareOutline,
} from "react-icons/io5";
import "./alarmCheck.css";
import { useState } from "react";
interface AlarmCheckProps {
  title: string;
  detail: string;
  subField: string;
  setAlarms: React.Dispatch<
    React.SetStateAction<{
      message: boolean;
      comment: boolean;
      following: boolean;
      newPost: boolean;
    }>
  >;
}
const AlarmCheck = ({
  title,
  detail,
  subField,
  setAlarms,
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
        {selected ? <IoCheckbox /> : <IoSquareOutline />}
      </div>
    </div>
  );
};

export default AlarmCheck;
