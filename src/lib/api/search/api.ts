import { API_PATH, instance } from '../config';

export const linkSearch = async () => {
  const response = await instance.get(API_PATH.link.default);

  return response;
};
