import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #1c2331;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: #f5f5f5;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SearchForm = styled.form`
  display: flex;
  width: 20%;
  justify-content: center;
`;

export const SearchButton = styled.button`
  margin-left: -40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

export const SuggestionUl = styled.ul`
  width: 20%;
  background-color: white;
  padding: 10px;
  max-height: 200px;
  overflow-y: scroll;
  font-size: 16px;
  margin-top: 5px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0;
  }
`;

export const ListItem = styled.li`
  list-style-type: none;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const SuggestionItem = styled.li<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  user-select: none;
  list-style: none;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#f0f0f0' : 'white')};
  margin-bottom: 10px;

  &:hover {
    background-color: #e0e0e0;
  }
`;
