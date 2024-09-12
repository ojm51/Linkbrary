import { API_PATH, instance } from '../config';
import { FavoriteLinkListResponse } from './types';

export const getFavoriteLinkList = async () => {
  const response = await instance.get<FavoriteLinkListResponse>(
    API_PATH.favorite.default,
  );

  return response.data;
};
