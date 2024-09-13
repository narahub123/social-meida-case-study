export interface VoteType {
  choices: {
    [key: string]: string;
  };
  duration: {
    date: number | undefined;
    hour: number | undefined;
    min: number | undefined;
  };
}

// 이모지 타입
export interface EmojiType {
  codes: string; // 유니코드 코드 포인트
  char: string; // 이모지 문자
  name: string; // 이모지 이름
  category: string; // 이모지 카테고리
  group: string; // 이모지 그룹
  subgroup: string; // 이모지 서브그룹
}
