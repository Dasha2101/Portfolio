import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from '../pages/Search';

vi.mock('../hooks/useStateApp', () => ({
  __esModule: true,
  default: () => ({
    isLoading: false,
    error: null,
    searchResults: [],
    showResults: false,
    lastSearchQuery: '',
    fetchAllResults: vi.fn(),
    handleSearch: vi.fn(),
    handleResetSearch: vi.fn(),
  }),
}));

vi.mock('../hooks/useRouteParams', () => ({
  __esModule: true,
  default: () => ({
    currentPage: 1,
    selectedId: null,
  }),
}));

describe('Card List component', () => {
  it('displays no results message', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const noResultsMessage = screen.queryByText('Sorry results no found');
    if (!noResultsMessage) {
      throw new Error('No results message not found');
    }
  });
});
