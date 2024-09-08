export interface PreferencesType {
  [key: string]: string | AlarmType;
}

export interface PreferencesOpenDropdownType {
  [key: string]: boolean;
}

export interface LanguageListType {
  [key: string]: string;
}

export interface AlarmType {
  [key: string]: boolean;
}
