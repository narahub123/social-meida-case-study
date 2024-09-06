import { useEffect, useState } from "react";
import "./preferences.css";
import {
  PreferencesOpenDropdownType,
  PreferencesType,
} from "../../../types/settingsTypes";
import { handleScreenMode } from "../../../utils/settings.utils";

const Preferences = () => {
  const [preferences, setPreferences] = useState<PreferencesType | undefined>(
    undefined
  );

  const [preferencesOpenDropdown, setPreferencesOpenDropdown] =
    useState<PreferencesOpenDropdownType>({
      screenMode: false,
    });

  // 처음 페이지 이동시
  useEffect(() => {
    // localStorage에 preferences를 가져옴
    const storedPreferences = localStorage.getItem("preferences");

    // preferences가 존재한다면
    if (storedPreferences) {
      const screenMode = JSON.parse(storedPreferences).screenMode;

      setPreferences((prev) => ({
        ...prev,
        screenMode,
      }));
    }
  }, []);

  // screenMode에 변경이 있는 경우
  useEffect(() => {
    if (!preferences?.screenMode) return;

    if (preferences?.screenMode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem(
        "preferences",
        JSON.stringify({
          ...preferences,
          screenMode: "dark",
        })
      );
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(
        "preferences",
        JSON.stringify({
          ...preferences,
          screenMode: "light",
        })
      );
    }
  }, [preferences?.screenMode]);

  return (
    <div className="preferences">
      {/* 다크모드 */}
      <div className="preferences-item">
        <span className="preferences-item-title">화면 모드</span>
        <span>
          <div className="preferences-item-select">
            <p
              className="preferences-item-select-title"
              onClick={() =>
                setPreferencesOpenDropdown((prev) => ({
                  ...prev,
                  screenMode: !preferencesOpenDropdown.screenMode,
                }))
              }
            >
              {preferences?.screenMode === "dark" ? "어두운 화면" : "밝은 화면"}
            </p>
            <ul
              className={`preferences-item-select-container${
                preferencesOpenDropdown.screenMode ? " open" : ""
              }`}
            >
              <li
                className={`preferences-item-select-item${
                  preferences?.screenMode === "light" ? " selected" : ""
                }`}
                onClick={() =>
                  handleScreenMode(
                    "light",
                    setPreferences,
                    setPreferencesOpenDropdown
                  )
                }
              >
                밝은 화면
              </li>
              <li
                className={`preferences-item-select-item${
                  preferences?.screenMode === "dark" ? " selected" : ""
                }`}
                onClick={() =>
                  handleScreenMode(
                    "dark",
                    setPreferences,
                    setPreferencesOpenDropdown
                  )
                }
              >
                어두운 화면
              </li>
            </ul>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Preferences;
