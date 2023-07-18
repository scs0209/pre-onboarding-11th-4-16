import { ChangeEvent, FormEvent } from 'react';

import { useDataContext } from '@/context/DataContext';
import { useKeyNavigation } from '@/hooks/useKeyNavigation';
import { Container, SearchButton, SearchForm, SearchInput } from '@/styles/SearchBar';

import SuggestionList from '../components/SearchBar/SuggestinoList';

const SearchBarPage = () => {
  const { suggestions, query, setQuery } = useDataContext();

  const { selectedIndex, keyDownHandler } = useKeyNavigation(suggestions, query, setQuery);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Container>
      <SearchForm>
        <SearchInput
          type="text"
          value={query}
          onChange={onChange}
          onKeyDown={keyDownHandler}
          placeholder="질환명을 입력해 주세요."
        />
        <SearchButton>🔎</SearchButton>
      </SearchForm>
      {query.trim() !== '' && (
        <SuggestionList suggestions={suggestions} selectedIndex={selectedIndex} />
      )}
    </Container>
  );
};

export default SearchBarPage;
