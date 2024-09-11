import { validateEmail } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEY } from '../config';

export const useValidateEmail = () => {
  return useMutation({
    mutationKey: [MUTATION_KEY.validateEmail],
    mutationFn: validateEmail,
  });
};
