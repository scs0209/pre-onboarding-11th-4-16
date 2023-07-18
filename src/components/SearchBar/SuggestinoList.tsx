import { useEffect, useRef, VFC } from 'react';

import { SuggestionItem, SuggestionUl } from '@/styles/SearchBar';

interface Props {
  selectedIndex: number;
  suggestions: string[];
}

const SuggestionList: VFC<Props> = ({ selectedIndex, suggestions }) => {
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

  return (
    <SuggestionUl ref={suggestionContainerRef}>
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
    </SuggestionUl>
  );
};

export default SuggestionList;
