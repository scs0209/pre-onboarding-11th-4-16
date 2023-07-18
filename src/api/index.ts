import axios from 'axios';

import cache from './cache';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

const searchData = async (query: string): Promise<string[]> => {
  // Check cache
  const cachedData = cache.getFromCache(query);

  if (cachedData) {
    console.info('Returning data from cache');

    return cachedData;
  }

  console.info('calling api');

  const response = await api.get('/sick', {
    params: { q: query },
  });

  let suggestions: string[];

  if (response.data.length > 0) {
    suggestions = response.data.map((item: { sickCd: string; sickNm: string }) => item.sickNm);
  } else {
    suggestions = ['검색어 없음'];
  }

  // Save the suggestions to cache if suggestions have valid data
  if (suggestions.length > 0 && suggestions[0] !== '검색어 없음') {
    cache.saveToCache(query, suggestions);
  }

  return suggestions;
};

export default searchData;
