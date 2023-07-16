import { ChangeEvent } from 'react';

import { useDataContext } from '@/context/DataContext';

const SearchBar = () => {
  const { suggestions, query, setQuery } = useDataContext();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <input type="text" value={query} onChange={onChange} placeholder="질환명 검색" />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </>
  );
};

export default SearchBar;
