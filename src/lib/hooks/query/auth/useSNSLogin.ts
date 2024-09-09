import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import { SocialLoginParams, socialLogin } from '@/lib/api';
import { AuthContext } from '@/lib/context';
import { Routes } from '@/lib/route';
import { MUTATION_KEY } from '../config';

export const useSNSLogin = ({
  socialProvider,
}: Pick<SocialLoginParams, 'socialProvider'>) => {
  const { updateIsLoggedIn, updateUserInfo } = useContext(AuthContext);
  const router = useRouter();
  return useMutation({
    mutationKey: [
      socialProvider === 'google'
        ? MUTATION_KEY.googleLogin
        : MUTATION_KEY.kakaoLogin,
    ],
    mutationFn: ({ token }: Pick<SocialLoginParams, 'token'>) =>
      socialLogin({ socialProvider, token }),
    onSuccess(res) {
      if (res) {
        const { id, email, name, imageSource, createdAt } = res.data.user;
        const newUserInfo = {
          id,
          email,
          name,
          imageSource,
          createdAt,
          accessToken: res.data.accessToken,
        };

        updateUserInfo(newUserInfo);
        updateIsLoggedIn(true);
        router.push(Routes.HOME);
      }
    },
    onError() {
      /** @Todo 모달창 에러 메세지 처리 */
    },
    gcTime: 0,
  });
};
