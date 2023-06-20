import { useEffect, useState } from 'react';

type CallbackFunction<T extends any[]> = (...args: T) => void;

interface DebouncedCallbackState<T extends any[]> {
  isLoading: boolean;
  debouncedCallback: CallbackFunction<T>;
}

function useDebouncedCallback<T extends any[]>(
  callback: CallbackFunction<T>,
  delay: number
): DebouncedCallbackState<T> {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function debouncedCallback(...args: T) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    setIsLoading(true);

    const id = setTimeout(() => {
      callback(...args);
      setIsLoading(false);
    }, delay);

    setTimeoutId(id);
  }

  useEffect(() => {
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return { isLoading, debouncedCallback };
}

export default useDebouncedCallback;
