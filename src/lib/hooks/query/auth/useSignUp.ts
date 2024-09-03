import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { signUp } from '@/lib/api/';
import { MUTATION_KEY } from '../config';

interface SignUpHookParams {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSignUp = ({
  onSuccess = () => {},
  onError = () => {},
}: SignUpHookParams) => {
  const router = useRouter();
  return useMutation({
    mutationKey: [MUTATION_KEY.signUp],
    mutationFn: signUp,
    onSuccess() {
      /** @Todo default folder 만들기 */

      onSuccess();
      router.push('/login');
    },
    onError(error) {
      /** @Todo modal을 활용한 에러메세지 출력 */
      onError(error);
    },
  });
};
