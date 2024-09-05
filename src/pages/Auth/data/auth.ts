// 년
export const years = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, i) => 1900 + i
).reverse();

// 달
export const months = Array.from({ length: 12 }, (_, i) => i + 1);

const lastDate = (month: number, year: number) => {
  const today = new Date();
  const newYear = year || today.getFullYear();
  const lastDateOfMonth = new Date(newYear, month, 0).getDate();
  return lastDateOfMonth;
};

// 일
export const dates = (month: number, year: number) => {
  return Array.from({ length: lastDate(month, year) }, (_, i) => i + 1);
};

// 성별 목록
export const genderList = [
  { name: "남성", value: "m" },
  { name: "여성", value: "f" },
  { name: "양성", value: "b" },
  { name: "숨김", value: "h" },
];
