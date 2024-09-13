// 요일 배열
export const days = ["일", "월", "화", "수", "목", "금", "토"];

export const calculateLastDateOfMonth = (target: Date) => {
  const year = target.getFullYear();
  const month = target.getMonth();

  return new Date(year, month + 1, 0).getDate();
};
