import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { LoginParams, UserInfoDTO } from '../api';
import { getFromStorage, setToStorage } from '../storage';
import { useGetUserInfo, useLogin } from '../hooks';

interface UserInfo extends UserInfoDTO {
  accessToken: string;
}

export interface AuthContextType {
  userInfo: UserInfo | null;
  isLoggedin: boolean;
  login: (params: LoginParams) => void;
  logout: () => void;
  updateUserInfo: (items: UserInfo) => void;
}

export const useAuthHandler = () => {
  const router = useRouter();
  const loginMutate = useLogin();

  const [accessToken, setAccessToken] = useState<string>(
    getFromStorage<UserInfo>('userInfo')?.accessToken ?? '',
  );
  const { data } = useGetUserInfo({
    accessToken,
  });

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  const login = async ({ email, password }: LoginParams) => {
    await loginMutate.mutateAsync(
      { email, password },
      {
        onSuccess(response) {
          if (response && response.data.accessToken) {
            const { accessToken: newAccessToken } = response.data;
            setAccessToken(newAccessToken);
            router.push('/');
          }
        },
        onError() {
          /** @Todo 에러 메세지 모달 처리 */
        },
      },
    );
  };

  const logout = () => {
    setUserInfo(null);
    setIsLoggedin(false);
    localStorage.removeItem('userInfo');
    router.push('/');
  };

  const updateUserInfo = (newInfo: UserInfo) => {
    setUserInfo(newInfo);
    setToStorage('userInfo', newInfo);
  };

  const authProviderValue = {
    userInfo,
    isLoggedin,
    login,
    logout,
    updateUserInfo,
  };

  useEffect(() => {
    if (data) {
      const newUserInfo = data.data;
      updateUserInfo({ ...newUserInfo, accessToken });
      setIsLoggedin(true);
    }
  }, [data, accessToken]);

  return { authProviderValue };
};
