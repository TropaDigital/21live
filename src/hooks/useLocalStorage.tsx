import { useCallback, useState } from 'react';

function useLocalStorage(key: any, initialValue = []) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: any) => {
      try {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log('ErrorStorage =>>', error);
      }
    },
    [key]
  );

  // useEffect(() => {
  //   if(state.length < 1) {
  //     setState([columnDefault])
  //     localStorage.setItem(key, JSON.stringify([columnDefault]));
  //   }
  // }, [])

  return [state, setValue];
}

export default useLocalStorage;
