import axios from 'axios';

type CacheData = {
  expirationTime: number;
  data: string[];
};

// Cache object
const cache: Record<string, CacheData> = {};

// Life time for cache, example: 5 minutes (in milliseconds)
const cacheLifetime = 5 * 60 * 1000;

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

const searchData = async (query: string): Promise<string[]> => {
  console.info('calling api');

  console.log('Cache contents: ', cache);
  // Check cache
  if (query in cache && cache[query].expirationTime > Date.now()) {
    console.info('Returning data from cache');

    return cache[query].data;
  }

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
    cache[query] = {
      expirationTime: Date.now() + cacheLifetime,
      data: suggestions,
    };
  }

  return suggestions;
};

export default searchData;
