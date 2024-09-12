export const getPageSize = (width: number) => {
  if (width >= 425 && width < 1024) return 6;
  return 9;
};
