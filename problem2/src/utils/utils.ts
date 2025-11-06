export const getLocalIconPath = (symbol: string): string => {
  return `/src/assets/${symbol}.svg`;
};

export const format = (n: number, max = 8) => {
  if (!isFinite(n)) return "-";
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: max,
  }).format(n);
};

export const clampNumber = (val: string) => {
  let cleaned = val.replace(/[^0-9.]/g, "");
  const i = cleaned.indexOf(".");
  if (i !== -1)
    cleaned = cleaned.slice(0, i + 1) + cleaned.slice(i + 1).replace(/\./g, "");
  return cleaned;
};
