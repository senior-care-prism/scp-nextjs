import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
import PulseLoader from 'react-spinners/PulseLoader';
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

function cleanupQuery(query, newItem) {
  const result = newItem === undefined ? { ...query } : { ...query, ...newItem };
  Object.keys(result).forEach((key) => {
    if (result[key] === '' || (key === 'p' && result[key] === '1')) {
      delete result[key];
    }
  });
  return result;
}

function formatQuerystring(query) {
  return `?${Object.entries(query).map((keyValue) => keyValue.join('=')).join('&')}`;
}

const Paginator = ({ pageNum, maxPage }) => {
  const router = useRouter();
  const { query } = router;
  const isDisabled = maxPage === 0;
  const isFirstPage = isDisabled || pageNum === 1;
  const isLastPage = isDisabled || pageNum === maxPage;

  const getPageHref = (targetPage) => router.pathname + formatQuerystring(
    cleanupQuery(query, { p: encodeURIComponent(targetPage) }),
  );

  return (
    <nav>
      <ul className={styles.pagination}>
        <li className={cn(styles['page-item'], { [styles.disabled]: isFirstPage })}>
          { isFirstPage
            ? 'Previous'
            : <Link href={getPageHref(pageNum - 1)} scroll={false}>Previous</Link>}
        </li>
        {Array(maxPage).fill().map((_, idx) => (
          /* eslint-disable react/no-array-index-key */
          <Link key={idx} href={getPageHref(idx + 1)} scroll={false} passHref>
            <a
              className={cn(styles['page-item'], { [styles.active]: idx + 1 === pageNum })}
              href="#page"
            >
              {`${idx + 1}`}
            </a>
          </Link>
        ))}
        <li className={cn(styles['page-item'], { [styles.disabled]: isLastPage })}>
          { isLastPage
            ? 'Next'
            : <Link href={getPageHref(pageNum + 1)} scroll={false}>Next</Link>}
        </li>
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  pageNum: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
};

const Card = ({ entry, idx }) => {
  const { width } = useWindowSize();
  const columnCount = getColumnCount(width);
  const nodeCount = idx + 1;

  // console.log('looo', width, columnCount);
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

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);
    setIsSearching(true);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(setTimeout(() => {
      const { query } = router;
      query.search = searchTerm;
      query.p = '1';

      router.push(router.pathname + formatQuerystring(cleanupQuery(query)));
      setIsSearching(false);
    }, 700));
  };

  return (
    <>
      <form className={styles['search-form']}>
        <i class="ri-search-line"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="search"
        />
        <PulseLoader loading={isSearching} size={8} color="#1d5085" />
      </form>
    </>
  );
};
function NewsFeed({ entries, pageNum, maxPage }) {
  return (
    <section id="news-feed" className={styles['news-feed']}>
      <div className={styles.content}>
        <div className={styles['section-heading']}>
          <h2>News Feed</h2>
        </div>
        <div className={styles['page-controls']}>
          <Search />
          <Paginator pageNum={pageNum} maxPage={maxPage} />
        </div>
        { maxPage > 0
          ? (
            <>
              <div className={styles['card-container']}>
                {entries.map((entry, idx) => (
                  <Card entry={entry} key={entry.id} idx={idx} />
                ))}
              </div>
            </>
          )
          : (
            <div className={styles['no-results']}>
              <i class="ri-alert-fill" />
              No results
              <p className={styles['help-text']}>Please try a different search.</p>
            </div>
          )}
        <div className={styles['page-controls']}>
          <Paginator pageNum={pageNum} maxPage={maxPage} />
        </div>

      </div>
    </section>
  );
}

NewsFeed.propTypes = {
  entries: PropTypes.arrayOf(Card.propTypes.entry).isRequired,
  pageNum: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
};

export default NewsFeed;
