import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import searchData from '@/api';

interface Props {
  children: ReactNode;
}

interface DataContextProps {
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
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

  useEffect(() => {
    if (query.trim() !== '') {
      (async () => {
        const data = await searchData(query);

        setSuggestions(data);
      })();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <DataContext.Provider value={{ suggestions, setSuggestions }}>{children}</DataContext.Provider>
  );
};
