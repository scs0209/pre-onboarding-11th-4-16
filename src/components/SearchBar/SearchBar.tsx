import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';

import { useDataContext } from '@/context/DataContext';
import { useKeyNavigation } from '@/hooks/useKeyNavigation';
import {
  Container,
  SearchButton,
  SearchForm,
  SearchInput,
  SuggestionItem,
  SuggestionList,
} from '@/styles/SearchBar';

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
    <Container>
      <SearchForm onSubmit={onSubmit}>
        <SearchInput
          type="text"
          value={query}
          onChange={onChange}
          onKeyDown={keyDownHandler}
          placeholder="질환명 검색"
        />
        <SearchButton>🔎</SearchButton>
      </SearchForm>
      <SuggestionList ref={suggestionContainerRef}>
        {suggestions.map((suggestion, i) => (
          <SuggestionItem
            key={i}
            ref={(element) => (suggestionItemRefs.current[i] = element)}
            isSelected={i === selectedIndex}
          >
            <svg
              fill="none"
              stroke="gray"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="6%"
              height="6%"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
            <div style={{ marginLeft: '10px' }}>{suggestion}</div>
          </SuggestionItem>
        ))}
      </SuggestionList>
    </Container>
  );
};

export default SearchBar;
