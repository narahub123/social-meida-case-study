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

// 로그인 정보 타입
export interface LoginInfoType {
  [key: string]: string;
}

export interface SignupInfoType {
  [key: string]:
    | string
    | {
        [key: string]: boolean;
      };
}
