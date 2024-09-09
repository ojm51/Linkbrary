import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { LoginParams, UserInfoDTO, getUserInfo } from '../api';
import { getFromStorage, setToStorage } from '../storage';
import { useLogin } from '../hooks';

interface UserInfo extends UserInfoDTO {
  accessToken: string;
}

export interface AuthContextType {
  userInfo: UserInfo | null;
  isLoggedin: boolean;
  login: (params: LoginParams) => void;
  logout: () => void;
  updateUserInfo: (items: UserInfo) => void;
  updateIsLoggedIn: (state: boolean) => void;
}

const localStorageName = 'userInfo';

export const useAuthHandler = () => {
  const loginMutate = useLogin();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  const login = async ({ email, password }: LoginParams) => {
    await loginMutate.mutateAsync(
      { email, password },
      {
        onSuccess: async (res) => {
          if (res?.data.accessToken) {
            const { accessToken } = res.data;
            await getUserInfo({ accessToken })
              .then((response) => {
                if (response.data) {
                  updateUserInfo({
                    ...response.data,
                    accessToken,
                  });
                  updateIsLoggedIn(true);
                }
              })
              .catch((error) => {
                throw new Error(error);
              });
          }
        },
        onError(error) {
          if (error instanceof AxiosError) {
            switch (error.status) {
              case 401:
                /** @Todo 모달로 로그인 만료 나타내기 */
                break;
              case 400:
                /** @Todo 모달로 잘못된 정보 나타내기 */
                break;
              default:
                /** @Todo 모달로 알 수 없는 에러 나타내기  */
                break;
            }
          }
          logout();
        },
      },
    );
  };

  const logout = () => {
    setUserInfo(null);
    setIsLoggedin(false);
    localStorage.removeItem(localStorageName);
  };

  const updateUserInfo = (newInfo: UserInfo) => {
    setUserInfo(newInfo);
    setToStorage(localStorageName, newInfo);
  };

  const updateIsLoggedIn = (newState: boolean) => {
    setIsLoggedin(newState);
  };

  useEffect(() => {
    const savedUserInfo = getFromStorage<UserInfo>(localStorageName);
    if (savedUserInfo) {
      updateUserInfo(savedUserInfo);
      updateIsLoggedIn(true);
    }
  }, []);

  return {
    userInfo,
    isLoggedin,
    login,
    logout,
    updateUserInfo,
    updateIsLoggedIn,
  };
};
