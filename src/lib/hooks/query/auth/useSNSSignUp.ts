import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import { SocialSignUpParams, socialSignUp } from '@/lib/api';
import { AuthContext } from '@/lib/context';
import { Routes } from '@/lib/route';
import { MUTATION_KEY } from '../config';

export const useSNSSignUp = ({
  socialProvider,
}: Pick<SocialSignUpParams, 'socialProvider'>) => {
  const { updateIsLoggedIn, updateUserInfo } = useContext(AuthContext);
  const router = useRouter();
  const muatateKey =
    socialProvider === 'google'
      ? MUTATION_KEY.googleSignUp
      : MUTATION_KEY.kakaoSignUp;

  return useMutation({
    mutationKey: [muatateKey],
    mutationFn: ({ name, token }: Omit<SocialSignUpParams, 'socialProvider'>) =>
      socialSignUp({ name, socialProvider, token }),
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
  });
};
