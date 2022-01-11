import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import PulseLoader from 'react-spinners/PulseLoader';
import ArticleCard from './ArticleCard';
import { cleanupQuery, formatQuerystring } from '../lib/utils';
import { ARTICLE_SHAPE } from '../shared/constants';
import styles from '../styles/NewsFeed.module.scss';
import Pagination from './Pagination';

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
      query.search = encodeURIComponent(searchTerm);
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
        </div>
        <div className={styles['total-reset']}>
          <span className={styles.total}>Total: {newsTotal || 0}</span>
          <button className={styles.reset} onClick={handleReset}>reset search</button>
          <div className={styles.pulseloader}>
            <PulseLoader loading={isSearching} size={4} color="#023534" />
          </div>
        </div>
        <div className={styles['pulseloader-mob']}>
          <PulseLoader loading={isSearching} size={4} color="#023534" />
        </div>
      </form>
    </>
  );
};

function NewsFeed({ entries, maxPage }) {
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
            <Pagination maxPage={maxPage.maxPage || 0} siblingCount={1}/>
          </div>
        </div>
        <span className={styles.total}>Total: {maxPage.total || 0}</span>
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
        <div className={styles['bottom-paginator']}>
          <Pagination maxPage={maxPage.maxPage || 0} siblingCount={1}/>
        </div>
      </div>
    </section>
  );
}

NewsFeed.propTypes = {
  entries: PropTypes.arrayOf(ARTICLE_SHAPE).isRequired,
  pageNum: PropTypes.number.isRequired,
  maxPage: PropTypes.object.isRequired,
};

export default NewsFeed;
