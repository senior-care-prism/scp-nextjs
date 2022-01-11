import { useMemo } from 'react';

export const DOTS = '...';

export const usePagination = ({
  maxPage,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {

    const totalPageNumbers = siblingCount + 5;
    
    const range = (start, end) => {
      let length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };
    if (totalPageNumbers >= maxPage) {
      return range(1, maxPage);
    }
	
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      maxPage
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < maxPage - 2;

    const firstPageIndex = 1;
    const lastPageIndex = maxPage;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, maxPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        maxPage - rightItemCount + 1,
        maxPage
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
     
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [maxPage, siblingCount, currentPage]);

  return paginationRange;
};