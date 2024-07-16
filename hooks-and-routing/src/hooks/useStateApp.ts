import { useState, useEffect, useCallback } from 'react';
import { RickAndMortyAPI } from '../services/apiService/apiSevice';
import { SearchDataType } from '../services/types';
import useLocalStorage from './useLocalStorage';

const useSearchAndFetch = () => {
  const [searchResults, setSearchResults] = useState<SearchDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useLocalStorage(
    'lastSearchQuery',
    ''
  );

  const updateSearchResults = (results: SearchDataType[]) => {
    setSearchResults(results);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1000);
  };

  const fetchAllResults = useCallback(async () => {
    setIsLoading(true);
    setShowResults(false);
    try {
      const results = await RickAndMortyAPI.fetchAllResults();
      updateSearchResults(results);
    } catch (error) {
      setError('Error loading data');
      setIsLoading(false);
      setShowResults(false);
    }
  }, []);

  const handleSearch = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setShowResults(false);
      try {
        const results = await RickAndMortyAPI.fetchSearchResults(query);
        updateSearchResults(results);
        setLastSearchQuery(query);
      } catch (error) {
        setError('Error while performing search');
        setIsLoading(false);
        setShowResults(false);
      }
    },
    [setIsLoading, setShowResults, setLastSearchQuery]
  );

  useEffect(() => {
    if (lastSearchQuery) {
      handleSearch(lastSearchQuery);
    } else {
      fetchAllResults();
    }
  }, [handleSearch, fetchAllResults, lastSearchQuery]);

  const handleResetSearch = () => {
    setIsLoading(true);
    setSearchResults([]);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(false);
      setError(null);
    }, 1000);
  };

  return {
    isLoading,
    error,
    searchResults,
    showResults,
    fetchAllResults,
    handleSearch,
    handleResetSearch,
    lastSearchQuery,
  };
};

export default useSearchAndFetch;
