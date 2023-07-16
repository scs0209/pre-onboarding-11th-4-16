import { createContext, FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';

import searchData from '@/api';
import { debounce } from '@/utils/debounce';

interface Props {
  children: ReactNode;
}

interface DataContextProps {
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  query: string;
  setQuery: (query: string) => void;
}

export const DataContext = createContext<DataContextProps | null>(null);

export const useDataContext = (): DataContextProps => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }

  return context;
};

export const DataProvider: FC<Props> = ({ children }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');

  const debouncedSearchData = useRef(
    debounce(async (query: string) => {
      if (query.trim() !== '') {
        const data = await searchData(query);

        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    }, 300),
  ).current;

  useEffect(() => {
    debouncedSearchData(query);
  }, [query]);

  return (
    <DataContext.Provider value={{ suggestions, setSuggestions, query, setQuery }}>
      {children}
    </DataContext.Provider>
  );
};
