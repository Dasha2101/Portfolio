import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const useRouteParams = () => {
  const location = useLocation();
  const params = useParams<{ page?: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const detailsId = searchParams.get('details');
    if (detailsId) {
      setSelectedId(detailsId);
    } else {
      setSelectedId(null);
    }
  }, [location.search]);

  useEffect(() => {
    if (params.page) {
      setCurrentPage(parseInt(params.page));
    } else {
      setCurrentPage(1);
    }
  }, [params.page]);

  return { currentPage, selectedId };
};

export default useRouteParams;
