import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useState, useEffect } from 'react';
import cn from 'classnames';
import useWindowSize from '../hooks/useWindowSize';
import styles from '../styles/NewsFeed.module.scss';

function getColumnCount(viewportWidth) {
  if (viewportWidth < 654) {
    return 1;
  }

  if (viewportWidth < 975) {
    return 2;
  }

  if (viewportWidth < 1311) {
    return 3;
  }

  return 4;
}

// function isLeftEdgeNoMargin(nodeCount, columnCount) {
//   if (columnCount === 1) {
//     return true;
//   }
//   return nodeCount % columnCount === 1;
// }

// function isRightEdgeNoMargin(nodeCount, columnCount) {
//   return nodeCount % columnCount === 0;
// }

const Paginator = ({ pageNum, maxPage }) => {
  const isFirstPage = pageNum === 1;
  const isLastPage = pageNum === maxPage;
  const previousHref = pageNum === 2
    ? '/news'
    : `news?p=${encodeURIComponent(pageNum - 1)}`;
  return (
    <nav>
      <ul className={styles.pagination}>
        <li className={cn(styles['page-item'], { [styles.disabled]: isFirstPage })}>
          { isFirstPage
            ? 'Previous'
            : <Link href={previousHref} scroll={false}>Previous</Link>}
        </li>
        {Array(maxPage).fill().map((_, idx) => (
          <Link href={idx === 0 ? '/news' : `news?p=${idx + 1}`} scroll={false} passHref>
            <a className={cn(styles['page-item'], { [styles.active]: idx + 1 === pageNum })} href="#page">{`${idx + 1}`}</a>
          </Link>
        ))}
        <li className={cn(styles['page-item'], { [styles.disabled]: isLastPage })}>
          { isLastPage
            ? 'Next'
            : <Link href={`news?p=${encodeURIComponent(pageNum + 1)}`} scroll={false}>Next</Link>}
        </li>
      </ul>
    </nav>
  );
};

const Card = ({ entry, idx }) => {
  const { width } = useWindowSize();
  const columnCount = getColumnCount(width);
  const nodeCount = idx + 1;

  console.log('looo', width, columnCount);
  const articleRef = {
    pathname: '/news/[slug]',
    query: { slug: entry.slug },
  };
  return (
    <div
      className={styles['news-card']}
    >
      <div className={styles['card-title']}>
        <h3>
          <Link href={articleRef}>
            {entry.headline}
          </Link>
        </h3>
      </div>
      <div className={styles.content}>
        <p className={styles.excerpt}>{entry.excerpt}</p>
      </div>
      <div className={styles['card-end']}>
        <Link href={articleRef}>
          Read&nbsp;more
        </Link>
        <div className={styles['published-date']}>
          {moment(entry.publishedDate).format('LL')}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    headline: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  }).isRequired,
};

function NewsFeed({ entries, pageNum, maxPage }) {
  return (
    <section id="news-feed" className={styles['news-feed']}>
      <div className={styles.content}>
        <div className={styles['section-heading']}>
          <h2>News Feed</h2>
        </div>
        <div className={styles['card-container']}>
          {entries.map((entry, idx) => (
            <Card entry={entry} key={entry.id} idx={idx} />
          ))}
        </div>
        <Paginator pageNum={pageNum} maxPage={maxPage} />
      </div>
    </section>
  );
}

NewsFeed.propTypes = {
  entries: PropTypes.arrayOf(Card.propTypes.entry).isRequired,
};

export default NewsFeed;
