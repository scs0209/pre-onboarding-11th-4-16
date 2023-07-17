import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { useDataContext } from '@/context/DataContext';

const SearchBar = () => {
  const { suggestions, query, setQuery } = useDataContext();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionContainerRef = useRef<HTMLUListElement>(null);
  const suggestionItemRefs = useRef<any>([]);

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

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1));
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setQuery(suggestions[selectedIndex] || query);
    }
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
