import { ChangeEvent } from 'react';

import { useDataContext } from '@/context/DataContext';
import { useKeyNavigation } from '@/hooks/useKeyNavigation';
import { Container, SearchButton, SearchForm, SearchInput, Title } from '@/styles/SearchBar';

import SuggestionList from '../components/SearchBar/SuggestinoList';

const SearchBarPage = () => {
  const { suggestions, query, setQuery } = useDataContext();

  const { selectedIndex, keyDownHandler } = useKeyNavigation(suggestions, query, setQuery);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Container>
      <Title>
        국내 모든 임상시험 검색하고 <br />
        온라인으로 참여하기
      </Title>
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
