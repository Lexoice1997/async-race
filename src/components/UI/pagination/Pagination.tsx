import React from 'react';
import {getPagesArr} from "../../../utils/pages";

interface PaginationProps {
  totalPages: number,
  page: number,
  changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({totalPages, page, changePage}) => {
  const pagesArray = getPagesArr(totalPages);

  return (
    <div className="page__wrapper">
      {pagesArray.map(p =>
        <span
          key={p}
          onClick={() => changePage(p)}
          className={page === p ? 'page__count page__current': 'page__count'}>
                {p}
              </span>
      )}
    </div>
  );
};

export default Pagination;
