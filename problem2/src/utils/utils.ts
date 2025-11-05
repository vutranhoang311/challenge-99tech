export const getLocalIconPath = (symbol: string): string => {
  return `/src/assets/${symbol}.svg`;
};

export const format = (n: number, max = 8) => {
  if (!isFinite(n)) return "-";
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: max,
  }).format(n);
};
