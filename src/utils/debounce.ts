export type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): DebouncedFunction<T> => {
  let timeout: NodeJS.Timeout | null = null;

  const debouncedFunction: DebouncedFunction<T> = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };

  return debouncedFunction;
};
