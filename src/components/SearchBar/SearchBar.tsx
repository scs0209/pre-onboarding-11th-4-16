import { ChangeEvent, FormEvent } from 'react';

import { useDataContext } from '@/context/DataContext';
import { useKeyNavigation } from '@/hooks/useKeyNavigation';
import { Container, SearchButton, SearchForm, SearchInput } from '@/styles/SearchBar';

import SuggestionList from './SuggestinoList';

const SearchBar = () => {
  const { suggestions, query, setQuery } = useDataContext();

  const { selectedIndex, keyDownHandler } = useKeyNavigation(suggestions, query, setQuery);

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
      <SuggestionList suggestions={suggestions} selectedIndex={selectedIndex} />
    </Container>
  );
};

export default SearchBar;
