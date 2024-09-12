import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import { SocialLoginParams, socialLogin } from '@/lib/api';
import { AuthContext, useModal } from '@/lib/context';
import { Routes } from '@/lib/route';
import { MUTATION_KEY } from '../config';

export const useSNSLogin = ({
  socialProvider,
}: Pick<SocialLoginParams, 'socialProvider'>) => {
  const { updateIsLoggedIn, updateUserInfo } = useContext(AuthContext);
  const router = useRouter();
  const { openModal } = useModal();
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
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          openModal({
            type: 'alert',
            key: 'SNSLoginError400',
            message: '로그인에 실패했습니다. 다시 시도해주세요.',
          });
        } else {
          openModal({
            type: 'alert',
            key: 'SNSLoginUnknownError',
            message: '알 수 없는 에러입니다. 관리자에게 문의해주세요.',
          });
        }
      } else {
        openModal({
          type: 'alert',
          key: 'SNSLoginUnknownError',
          message: '알 수 없는 에러입니다. 관리자에게 문의해주세요.',
        });
      }
    },
  });
};