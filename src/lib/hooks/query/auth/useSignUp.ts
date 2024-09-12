import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/lib/api/';
import { useModal } from '@/lib/context';
import { MUTATION_KEY } from '../config';

export const useSignUp = () => {
  const { openModal } = useModal();
  const router = useRouter();

  return useMutation({
    mutationKey: [MUTATION_KEY.signUp],
    mutationFn: signUp,
    onSuccess() {
      /** @Todo default folder 만들기 */
      router.push('/login');
    },
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          openModal({
            type: 'alert',
            key: 'signUpError400',
            message: '회원가입에 실패했습니다. 다시 시도해주세요.',
          });
          return;
        }
      }
      openModal({
        type: 'alert',
        key: 'signUpUnknownError',
        message: '알 수 없는 에러입니다. 계속될 경우 관리자에게 문의해주세요.',
      });
    },
  });
};
