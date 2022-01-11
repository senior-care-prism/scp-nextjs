import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { cleanupQuery, formatQuerystring } from '../lib/utils';
import cn from 'classnames';
import { usePagination, DOTS } from '../hooks/usePagination';
import styles from '../styles/Pagination.module.scss';

const Pagination = props => {
  
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(
    () => {
      const { query } = router;
      query.p = currentPage;
      router.push(router.pathname + formatQuerystring(cleanupQuery(query)), undefined, { scroll: false });
    }, [currentPage]
  );

  const {
    maxPage,
    siblingCount = 1,
    className
  } = props;

  const paginationRange = usePagination({
    maxPage,
    siblingCount,
    currentPage
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={cn(styles['pagination-container'], { [className]: className })} >
      <li >
        <div onClick={onPrevious} className={cn(styles['pagination-item'], styles.prev, { [styles.disabled]: currentPage === 1 })}>
          <i className="ri-arrow-left-line"/>
        </div>
      </li>
      {paginationRange.map( (pageNumber, i)=> {
         
        if (pageNumber === DOTS) {
          return <li key={i} className={cn(styles["pagination-item"], styles.dots)}>&#8230;</li>;
        }
		
        return (
          <li key={i} onClick={() => setCurrentPage(pageNumber)}>
            <div className={cn(styles['pagination-item'], { [styles.selected]: pageNumber === currentPage })}>{pageNumber}</div>
          </li>
        );
      })}

      <li>
        <div onClick={onNext} className={cn(styles['pagination-item'], styles.next, { [styles.disabled]: currentPage === lastPage })}>
          <i className="ri-arrow-right-line"/>
        </div>
      </li>
    </ul>
  );
};

export default Pagination;