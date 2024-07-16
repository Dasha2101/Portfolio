import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../components/serachContainer/SearhContainer';
import useSearchAndFetch from '../hooks/useStateApp';
import Loading from '../components/loading/Loading';
import SearchResult from '../components/searchResult/SearchResult';
import DetailsComponent from '../components/detailsCharachter/DetailsCharachter';
import ErrorBoundary from '../components/bundler/Bundler';
import useRouteParams from '../hooks/useRouteParams';
import './Search.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const { currentPage, selectedId } = useRouteParams();

  const {
    isLoading,
    error,
    searchResults,
    showResults,
    lastSearchQuery,
    fetchAllResults,
    handleSearch,
    handleResetSearch,
  } = useSearchAndFetch();

  const stableHandleSearch = useRef(handleSearch);
  const stableFetchAllResults = useRef(fetchAllResults);

  useEffect(() => {
    stableHandleSearch.current = handleSearch;
    stableFetchAllResults.current = fetchAllResults;

    const lastSearchQuery = localStorage.getItem('lastSearchQuery');
    if (lastSearchQuery) {
      stableHandleSearch.current(lastSearchQuery);
    } else {
      stableFetchAllResults.current();
    }
  }, [handleSearch, fetchAllResults]);

  useEffect(() => {
    if (error && lastSearchQuery) {
      stableHandleSearch.current(lastSearchQuery);
    }
  }, [error, lastSearchQuery]);

  const handleItemClick = (id: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('details', id);
    navigate(`/search/${currentPage}?${searchParams.toString()}`);
  };

  const handleSearchAndUpdatePage = async (query: string) => {
    handleSearch(query);
    navigate('/search');
  };

  return (
    <ErrorBoundary
      hasError={!!error}
      errorMessage={error || ''}
      onReset={handleResetSearch}
    >
      <h1>Rick and Morty</h1>
      <SearchComponent
        onSearch={handleSearchAndUpdatePage}
        resetSearch={handleResetSearch}
      />
      <div className="left-panel">
        <div className="results-section">
          {isLoading && <Loading />}
          {!isLoading && showResults && (
            <SearchResult
              results={searchResults}
              onItemClick={handleItemClick}
              currentPage={currentPage}
            />
          )}
          {!isLoading && !showResults && (
            <div className="empty-results">Sorry results no found</div>
          )}
        </div>
        {selectedId && (
          <div className="right-panel">
            <DetailsComponent
              id={selectedId}
              onClose={() => navigate('/search')}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default SearchPage;
