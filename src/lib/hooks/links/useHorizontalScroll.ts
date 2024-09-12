import { useRef, useEffect, useCallback } from 'react';

export const useHorizontalScroll = () => {
  const listWrapperRef = useRef<HTMLUListElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    const container = listWrapperRef.current;
    if (container) {
      const delta = e.deltaY;
      container.scrollLeft += delta;
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    const container = listWrapperRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel);
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
    return () => {};
  }, [handleWheel]);

  return listWrapperRef;
};
