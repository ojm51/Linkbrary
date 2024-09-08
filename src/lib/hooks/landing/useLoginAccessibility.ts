import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/lib/context';

export const useLoginAccessibility = () => {
  const { userInfo } = useContext(AuthContext);
  const [isLoginAccessible, setIsLoginAccessible] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      setIsLoginAccessible(true);
    } else {
      setIsLoginAccessible(false);
    }
  }, [userInfo]);

  return {
    userInfo,
    isLoginAccessible,
  };
};
