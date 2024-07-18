import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useSearchQuery = (initialQuery: string = 'lastSearchQuery') => {
  const [searchQuery, setSearchQuery] = useLocalStorage(initialQuery);

  useEffect(() => {
    const savedQuery = localStorage.getItem(initialQuery);
    if (savedQuery) {
      setSearchQuery(savedQuery);
    }
  }, [initialQuery, setSearchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    onSearch: (query: string) => void
  ) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const resetSearchQuery = () => {
    setSearchQuery('');
    localStorage.removeItem(initialQuery);
  };

  return {
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    resetSearchQuery,
  };
};

export default useSearchQuery;
