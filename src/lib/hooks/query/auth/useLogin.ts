import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import { login } from '@/lib/api';
import { AuthContext } from '@/lib/context';

import { MUTATION_KEY } from '../config';

export const useLogin = () => {
  const { logout } = useContext(AuthContext);
  return useMutation({
    mutationKey: [MUTATION_KEY.login],
    mutationFn: login,
    onError() {
      logout();
    },
  });
};
