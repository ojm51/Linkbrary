import { Routes } from '@/lib/route';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSignUpWithKakao = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [kakaoCode, setKakaoCode] = useState('');

  useEffect(() => {
    if (code) {
      router.push(Routes.SET_NAME);
    }
    return () => {
      if (code) {
        setKakaoCode(code);
      }
    };
  }, [code]);

  return { kakaoCode };
};
