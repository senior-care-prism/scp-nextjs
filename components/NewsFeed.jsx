import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import PulseLoader from 'react-spinners/PulseLoader';
import ArticleCard from './ArticleCard';
import { cleanupQuery, formatQuerystring } from '../lib/utils';
import { ARTICLE_SHAPE } from '../shared/constants';
import styles from '../styles/NewsFeed.module.scss';

const Paginator = ({ pageNum, maxPage }) => {
  const router = useRouter();
  const { query } = router;
  const isDisabled = maxPage.maxPage === 0;
  const isFirstPage = isDisabled || pageNum === 1;
  const isLastPage = isDisabled || pageNum === maxPage.maxPage;

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
        {Array(maxPage.maxPage).fill().map((_, idx) => (
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
  maxPage: PropTypes.object.isRequired,
};

const Search = ({newsTotal}) => {
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
  const handleReset = (e) => {
    e.preventDefault();
    if (searchQuery !== '') {
      setSearchQuery('');
      handleSearch(e);
    }
  }
  return (
    <>
      <form className={styles['search-form']}>
        <div className={styles.search}>
          <i className="ri-search-line" />
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Keyword"
          />
          <PulseLoader loading={isSearching} size={8} color="#1d5085" />
        </div>
        <div className={styles['total-reset']}>
          <span className={styles.total}>Total: {newsTotal}</span>
          <button className={styles.reset} onClick={handleReset}>reset search</button>
        </div>
      </form>
    </>
  );
};
function NewsFeed({ entries, pageNum, maxPage }) {
  return (
    <section id="news-feed" className={styles['news-feed']}>
      <div className={styles.logo}>
        <img src="images/logo/scp--sacramento.svg" alt="Senior Care Prism logo" />
      </div>
      <div className={styles.content}>
        <div className={styles['section-heading']}>
          <h2>News Feed</h2>
        </div>
        <div className={styles['page-controls']}>
          <Search newsTotal={maxPage.total} />
          <div className={styles['top-paginator']}>
            <Paginator pageNum={pageNum} maxPage={maxPage} />
          </div>
        </div>
        <span className={styles.total}>Total: {maxPage.total}</span>
        { maxPage.maxPage > 0
          ? (
            <>
              <div className={styles['card-container']}>
                {entries.map((newsEntry) => (
                  <ArticleCard key={newsEntry.id} entry={newsEntry} />
                ))}
              </div>
            </>
          )
          : (
            <div className={styles['no-results']}>
              <i className="ri-alert-fill" />
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
  entries: PropTypes.arrayOf(ARTICLE_SHAPE).isRequired,
  pageNum: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
};

export default NewsFeed;
