import { useCallback, useEffect, useState } from 'react';

export const useKeyNavigation = (
  suggestions: string[],
  query: string,
  setQuery: (value: string) => void,
) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  const keyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1));
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setQuery(suggestions[selectedIndex] || query);
      }
    },
    [suggestions, selectedIndex, query, setQuery],
  );

  return {
    selectedIndex,
    keyDownHandler,
  };
};
