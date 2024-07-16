import React from 'react';
import { PaginationProps } from './types';
import './Pagination.css';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  onChangePage,
}) => {
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <a
          key={page}
          className={`button btn ${page === currentPage ? 'active' : ''}`}
          href={`/search/${page}`}
          onClick={(e) => {
            e.preventDefault();
            onChangePage(page);
          }}
        >
          {page}
        </a>
      ))}
    </div>
  );
};

export default Pagination;
