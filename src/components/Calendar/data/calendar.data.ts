export const daysStartWithSunday = ["일", "월", "화", "수", "목", "금", "토"];
export const daysStartWithMonday = ["월", "화", "수", "목", "금", "토", "일"];

// 날짜 목록 만들기
// 달의 날짜 배열 만들기
// 오늘 날짜
const today = new Date();

// 아코디언 년 목록 개수
const NUM_OF_ACCORDIAN = 5;

// 이번달 일 목록
const curMonthDates = (target: Date) => {
  const date = new Date(target);
  const dates: Date[] = [];

  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  for (let i = 1; i <= lastDate; i++) {
    const curDate = new Date(date.getFullYear(), date.getMonth(), i);

    dates.push(curDate);
  }

  return dates;
};

// 다음달 목록
const nextDates = (target: Date) => {
  const date = new Date(target);
  const dates: Date[] = [];
  const day = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  for (let i = day; 0 < 6 - i; i++) {
    dates.push(new Date(date.getFullYear(), date.getMonth() + 1, i));
  }

  return dates;
};

// 추가될 지난달의 일 배열
const lastMonthDatesArr = (target: Date) => {
  const dates = [];
  const date = new Date(target);

  // 이 달 첫날의 요일
  const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  for (let i = 0; i < day; i--) {
    const lastDate = new Date(date.getFullYear(), date.getMonth(), -i);

    dates.push(lastDate);
  }

  return dates;
};

export const dates = (target: Date) => {
  const lastMonth = lastMonthDatesArr(target);
  const curMonth = curMonthDates(target);
  const nextMonth = nextDates(target);

  return [...lastMonth, ...curMonth, ...nextMonth];
};

// 포멧
export const convertDateToYYYYMMDD = (target: Date) => {
  const date = new Date(target);

  return `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
};

export const accordianYearArr = () => {
  const year = today.getFullYear();
  return Array.from(
    { length: NUM_OF_ACCORDIAN },
    (_, i) => year - Math.floor(NUM_OF_ACCORDIAN / 2) + i
  );
};
