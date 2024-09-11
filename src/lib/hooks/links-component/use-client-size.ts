import { debounce } from '@/lib/react';
import { useEffect, useState } from 'react';

export type TClientSize =
  | undefined
  | {
      width: number;
      height: number;
    };

export const useClientSize = () => {
  const [clientSize, setClientSize] = useState<TClientSize>(undefined);
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setClientSize({ width, height });
  };
  useEffect(() => {
    const debouncedResize = debounce(() => {
      handleResize();
    }, 300);
    handleResize();
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);
  return { data: clientSize };
};
