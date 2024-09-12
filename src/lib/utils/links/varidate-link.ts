const regex = /^https?:\/\/.*/i;
export const validateLink = (url: string) => {
  return regex.test(url);
};
