export interface PaginationProps {
  currentPage: number;
  total: number;
  onChangePage: (page: number) => void;
}
