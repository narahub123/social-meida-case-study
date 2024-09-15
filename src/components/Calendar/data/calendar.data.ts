export const daysStartWithSunday = ["일", "월", "화", "수", "목", "금", "토"];
export const daysStartWithMonday = ["월", "화", "수", "목", "금", "토", "일"];
const amPm = ["오전", "오후"];

// 날짜 목록 만들기
// 달의 날짜 배열 만들기
// 오늘 날짜
const today = new Date();

// 아코디언 년 목록 개수
const NUM_OF_ACCORDIAN = 5;

// 이번 달 일 목록
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

// 다음 달 목록
const nextDates = (target: Date) => {
  const date = new Date(target);
  const dates: Date[] = [];
  const day = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  // 다음 달의 첫 주의 일 가져오기
  for (let i = 1; i <= 6 - day; i++) {
    dates.push(new Date(date.getFullYear(), date.getMonth() + 1, i));
  }

  return dates;
};

// 추가될 지난달의 일 배열
const lastMonthDatesArr = (target: Date) => {
  const dates: Date[] = [];
  const date = new Date(target);

  // 이 달 첫날의 요일
  const firstDayOfWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  // 지난달의 마지막 날짜 구하기
  const lastDateOfPrevMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  // 지난달의 마지막 주 가져오기
  for (let i = 0; i < firstDayOfWeek; i++) {
    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      lastDateOfPrevMonth - i
    );
    dates.push(lastDate);
  }

  return dates.reverse(); // 날짜를 순서대로 배열하기 위해 역순 정렬
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

// 년 목록
export const accordianYearArr = () => {
  const year = today.getFullYear();
  return Array.from(
    { length: NUM_OF_ACCORDIAN },
    (_, i) => year - Math.floor(NUM_OF_ACCORDIAN / 2) + i
  );
};

// 포멧 한국 시간
export const convertDateToKoreanZone = (target: Date | undefined) => {
  if (target === undefined) return;

  // 날짜 및 시간 형식화
  const formattedDate = `${target.getFullYear()}년 ${
    target.getMonth() + 1
  }월 ${target.getDate()}일(${daysStartWithSunday[target.getDay()]})`;
  const formattedTime = `${target.getHours() >= 12 ? amPm[1] : amPm[0]} ${
    target.getHours() > 13 ? target.getHours() - 12 : target.getHours()
  }:${target.getMinutes().toString().padStart(2, "0")}`;

  return `${formattedDate} ${formattedTime}`;
};
