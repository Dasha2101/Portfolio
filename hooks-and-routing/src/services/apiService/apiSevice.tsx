import { SearchDataResponse, SearchDataType } from '../types/index';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const RickAndMortyAPI = {
  fetchAllResults: async (page: number = 1): Promise<SearchDataType[]> => {
    const url = `${BASE_URL}?page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = (await response.json()) as SearchDataResponse;
    return data.results;
  },
  fetchSearchResults: async (
    query: string,
    page: number = 1
  ): Promise<SearchDataType[]> => {
    const url = `${BASE_URL}/?name=${query.trim()}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = (await response.json()) as SearchDataResponse;
    return data.results;
  },

  fetchCharacter: async (id: number) => {
    const url = `${BASE_URL}/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch character details');
    }
    const character = await response.json();
    return character;
  },
};
