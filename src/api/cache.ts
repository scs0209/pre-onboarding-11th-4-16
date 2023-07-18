type CacheData = {
  expirationTime: number;
  data: string[];
};

// Cache object
const cache: Record<string, CacheData> = {};

// Life time for cache, example: 5 minutes (in milliseconds)
const cacheLifetime = 5 * 60 * 1000;

const getFromCache = (query: string): string[] | null => {
  if (query in cache && cache[query].expirationTime > Date.now()) {
    console.log(cache);

    return cache[query].data;
  }

  return null;
};

const saveToCache = (query: string, data: string[]) => {
  cache[query] = {
    expirationTime: Date.now() + cacheLifetime,
    data,
  };
};

export default {
  getFromCache,
  saveToCache,
};
