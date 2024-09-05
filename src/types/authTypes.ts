export interface UserSignupType {
  [key: string]:
    | string
    | number
    | {
        [key: string]: boolean;
      };
}

export interface BirthType {
  month: number;
  date: number;
  year: number;
}

export interface UserSignupValidType {
  [key: string]: boolean;
}
