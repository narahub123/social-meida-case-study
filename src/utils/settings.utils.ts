import {
  PreferencesOpenDropdownType,
  PreferencesType,
} from "../types/settings.types";

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
