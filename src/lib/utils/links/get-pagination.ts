export const getPagination = (
  page?: number,
  pageSize?: number,
  totalPages?: number,
  width?: number,
) => {
  if (!page || !pageSize || !totalPages || !width) {
    return undefined;
  }
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const isNarrowScreen = width < 1024;
  const isVeryNarrowScreen = width < 425;
  const nearStart = page <= 3;
  const nearEnd = page >= totalPages - 2;
  if (nearStart) {
    return isNarrowScreen
      ? [1, 2, 3, '...', totalPages]
      : [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  if (nearEnd) {
    return isNarrowScreen
      ? [1, '...', totalPages - 2, totalPages - 1, totalPages]
      : [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  return isVeryNarrowScreen
    ? [page - 2, page - 1, page, page + 1, page + 2]
    : [1, '...', page - 1, page, page + 1, '...', totalPages];
};
