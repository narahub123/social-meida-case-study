export const createArrayFromZero = (num: number) => {
  return Array.from({ length: num }, (_, i) => i);
};
