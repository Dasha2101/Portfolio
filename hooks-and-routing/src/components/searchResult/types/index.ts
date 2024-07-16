import { SearchDataType } from '../../../services/types';

export interface SearchResultProps {
  results: SearchDataType[];
}

export interface SearchResultProps {
  results: SearchDataType[];
  onItemClick: (id: string, page: number) => void;
  currentPage: number;
}
