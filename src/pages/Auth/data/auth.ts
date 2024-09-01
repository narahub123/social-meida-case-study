export const years = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, i) => 1900 + i
).reverse();

export const months = Array.from({ length: 12 }, (_, i) => i + 1);
