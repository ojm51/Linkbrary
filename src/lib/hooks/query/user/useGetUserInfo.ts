import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/lib/api';
import { QUERY_KEY } from '../config';

interface GetUSerInfoHookParams {
  accessToken: string;
}

export const useGetUserInfo = ({ accessToken }: GetUSerInfoHookParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.userInfo],
    queryFn: () => getUserInfo(accessToken),
    retry: false,
  });
};
