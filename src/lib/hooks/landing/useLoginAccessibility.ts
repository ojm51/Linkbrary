import { useContext } from 'react';
import { AuthContext } from '@/lib/context';

export const useLoginAccessibility = () => {
  const { userInfo, isLoggedin } = useContext(AuthContext);

  return {
    userInfo,
    isLoginAccessible: isLoggedin,
  };
};
