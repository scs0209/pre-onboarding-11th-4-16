import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

const searchData = async (query: string): Promise<string[]> => {
  console.info('calling api');
  const response = await api.get('/sick', {
    params: { q: query },
  });

  if (response.data.length > 0) {
    return response.data.map((item: { sickCd: string; sickNm: string }) => item.sickNm);
  } else {
    return ['검색어 없음'];
  }
};

export default searchData;
