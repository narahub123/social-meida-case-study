import {
  PreferencesOpenDropdownType,
  PreferencesType,
} from "../types/settingsTypes";

export const handleScreenMode = (
  mode: string,
  setPreferences: React.Dispatch<
    React.SetStateAction<PreferencesType | undefined>
  >,
  setPreferencesOpenDropdown: React.Dispatch<
    React.SetStateAction<PreferencesOpenDropdownType>
  >
) => {
  setPreferences((prev) => ({
    ...prev,
    screenMode: mode,
  }));
  setPreferencesOpenDropdown((prev) => ({
    ...prev,
    screenMode: false,
  }));
};
