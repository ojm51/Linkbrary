export const getTotalPages = (totalCount?: number, pageSize?: number) => {
  if (!totalCount || !pageSize) {
    return undefined;
  }
  return Math.ceil(totalCount / pageSize);
};
