export interface UserSignupType {
  [key: string]:
    | string
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
