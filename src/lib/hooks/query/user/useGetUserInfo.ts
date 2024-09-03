import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/lib/api';
import { AuthContext } from '@/lib/context';
import { QUERY_KEY } from '../config';

interface GetUSerInfoHookParams {
  accessToken: string;
}

export const useGetUserInfo = ({ accessToken }: GetUSerInfoHookParams) => {
  const { logout } = useContext(AuthContext);
  return useQuery({
    queryKey: [QUERY_KEY.userInfo, accessToken],
    queryFn: () =>
      getUserInfo({
        accessToken,
        onError: (error) => {
          switch (error.status) {
            case 401:
              logout();
              /** @Todo 모달로 로그인 만료 나타내기 */
              break;
            case 400:
              /** @Todo 모달로 잘못된 정보 나타내기 */
              break;
            default:
              /** @Todo 모달로 알 수 없는 에러 나타내기  */
              break;
          }
        },
        onSuccess: () => {},
      }),
    retry: false,
  });
};
