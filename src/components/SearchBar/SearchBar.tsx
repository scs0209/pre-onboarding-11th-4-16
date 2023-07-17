import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';

import { useDataContext } from '@/context/DataContext';
import { useKeyNavigation } from '@/hooks/useKeyNavigation';

const SearchBar = () => {
  const { suggestions, query, setQuery } = useDataContext();

  const suggestionContainerRef = useRef<HTMLUListElement>(null);
  const suggestionItemRefs = useRef<any>([]);
  const { selectedIndex, keyDownHandler } = useKeyNavigation(suggestions, query, setQuery);

  useEffect(() => {
    if (suggestionContainerRef.current && suggestionItemRefs.current[selectedIndex]) {
      suggestionItemRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [selectedIndex]);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(suggestions[selectedIndex] || query);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={query}
          onChange={onChange}
          onKeyDown={keyDownHandler}
          placeholder="질환명 검색"
        />
        <ul ref={suggestionContainerRef}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              ref={(element) => (suggestionItemRefs.current[index] = element)}
              style={{ backgroundColor: index === selectedIndex ? '#c0c0c0' : 'transparent' }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default SearchBar;
