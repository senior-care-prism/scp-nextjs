import cn from 'classnames';
import { usePagination, DOTS } from '../hooks/usePagination';
import styles from '../styles/Pagination.module.scss';
const Pagination = props => {
  const {
    onPageChange,
    maxPage,
    siblingCount = 1,
    currentPage,
    className
  } = props;

  const paginationRange = usePagination({
    maxPage,
    siblingCount,
    currentPage
  });

  // If there are less than 2 times in pagination range we don't render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={cn(styles['pagination-container'], { [className]: className })} >
       {/* Left navigation */}
      <li >
        <div onClick={onPrevious} className={cn(styles['pagination-item'], styles.prev, { [styles.disabled]: currentPage === 1 })}>Previous</div>
      </li>
      {paginationRange.map( (pageNumber, i)=> {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li key={i} className={cn(styles["pagination-item"], styles.dots)}>&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li key={i} onClick={() => onPageChange(pageNumber)}>
            <div className={cn(styles['pagination-item'], { [styles.selected]: pageNumber === currentPage})}>{pageNumber}</div>
          </li>
        );
      })}

      {/*  Right Navigation */}
      <li>
        <div onClick={onNext} className={cn(styles['pagination-item'], styles.next, { [styles.disabled]: currentPage === lastPage })}>Next</div>
      </li>
    </ul>
  );
};

export default Pagination;