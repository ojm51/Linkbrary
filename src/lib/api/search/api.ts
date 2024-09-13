import { API_PATH, instance } from '../config';
import { LinkSearchParams, LinkSearchType } from './types';

export const linkSearch = async ({
  page = 0,
  pageSize = 0,
  search = '코',
}: LinkSearchParams) => {
  const response = await instance.get<LinkSearchType>(API_PATH.link.default, {
    params: {
      page,
      pageSize,
      search,
    },
  });

  return response;
};
