import { useEffect, useRef } from 'react';

export function useDebounce<T>(
  callback: (value: T) => void, delay: number
): (value: T) => void {
  const timeoutRef = useRef<number | null>(null);

  const debouncedCallback = (value: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(value);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}