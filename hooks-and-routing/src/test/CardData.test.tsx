import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResult from '../components/searchResult/SearchResult';
import { SearchDataType } from '../services/types';

const mockResults: Partial<SearchDataType>[] = [
  { id: 1, name: 'Rick Sanchez', image: 'image1.jpg' },
  { id: 2, name: 'Morty Smith', image: 'image2.jpg' },
  { id: 3, name: 'Summer Smith', image: 'image3.jpg' },
  { id: 4, name: 'Beth Smith', image: 'image4.jpg' },
  { id: 5, name: 'Jerry Smith', image: 'image5.jpg' },
];

describe('Card', () => {
  it('displays correct number of cards and renders their data', () => {
    render(
      <BrowserRouter>
        <SearchResult
          results={mockResults as SearchDataType[]}
          onItemClick={() => {}}
          currentPage={1}
        />
      </BrowserRouter>
    );

    const cards = screen.getAllByTestId('result-item');
    expect(cards.length).toBe(mockResults.length);

    mockResults.forEach((result) => {
      const cardName = screen.getByText(result.name ?? '');
      if (!cardName) {
        throw new Error('No find name');
      }
      const cardImage = screen.getByAltText(result.name ?? '');
      if (!cardImage) {
        throw new Error('No find img');
      }
      if (typeof cardImage !== 'string') {
        expect((cardImage as HTMLImageElement).src).toContain(
          result.image ?? ''
        );
      }
    });
  });
});
