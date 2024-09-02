import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api';
import { MUTATION_KEY } from '../config';

export const useLogin = () => {
  return useMutation({
    mutationKey: [MUTATION_KEY.login],
    mutationFn: login,
  });
};
